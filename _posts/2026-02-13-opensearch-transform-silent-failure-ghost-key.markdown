---
title: "OpenSearch Transform Job: The Case of the Silent Failure and the Ghost Key"
date: "2026-02-13 00:00:00 -0500"
tags:
  - osg
  - opensearch
author: "Derek Weitzel"
toc: true
toc_label: "On This Page"
toc_sticky: true
layout: single
header:
  og_image: /images/posts/opensearch-transform/ai-opensearch-debugging.png
  teaser: /images/posts/opensearch-transform/ai-opensearch-debugging.png
---

Debugging OpenSearch Transform jobs can feel like searching for a needle in a haystack, especially when the error messages are generic. This post chronicles a recent debugging journey, highlighting common pitfalls and the ultimate solution to a persistently failing transform job.

## The Problem: Summarizing XRootD Stash Data

{% include figure image_path="/images/posts/opensearch-transform/ai-opensearch-debugging.png" alt="OpenSearch transform debugging illustration" caption="Debugging an OpenSearch transform job that failed with 'Failed to index the documents'" class="post-figure--float-right" %}

Our goal was straightforward: aggregate XRootD stash access logs (`xrd-stash*`) into a daily summary index (`osdf-summary-{year}`). This involved grouping by several file path components, server details, and user domains, then calculating sums, averages, and counts of metrics like `filesize`, `read`, and `write`.

<div class="post-figure-clear" aria-hidden="true"></div>

Here is a snippet of the initial (problematic) transform configuration:

```json
{
  "transform": {
    "transform_id": "osdf-summary-2022",
    "description": "OSDF summary transform for year 2022",
    "source_index": "xrd-stash*",
    "target_index": "osdf-summary-2022",
    "page_size": 1000,
    "groups": [
      {
        "date_histogram": {
          "source_field": "@timestamp",
          "target_field": "@timestamp",
          "calendar_interval": "1d"
        }
      },
      {
        "terms": {
          "source_field": "dirname1.keyword",
          "target_field": "dirname1"
        }
      }
    ],
    "aggregations": {
      "filesize_sum": { "sum": { "field": "filesize" } },
      "filesize_avg": { "avg": { "field": "filesize" } }
    }
  }
}
```

## The Symptoms: Generic Errors and Timeouts

The transform job kept failing with a rather unhelpful message in its metadata:

```json
{
  "status": "failed",
  "failure_reason": "Failed to index the documents",
  "stats": {
    "pages_processed": 96,
    "documents_processed": 89737708,
    "documents_indexed": 96000,
    "index_time_in_millis": 44733,
    "search_time_in_millis": 1715612
  }
}
```

Notice the high `search_time_in_millis` compared to `index_time_in_millis`. This was a critical clue that the aggregation phase was struggling.

Further attempts to debug with `_explain` or custom composite aggregation queries often resulted in:

- `502 Bad Gateway / timed_out`: The query was too resource-intensive for the cluster to handle.
- `illegal_argument_exception: Missing value for [after.date_histogram]`: A mismatch in how the `after_key` was structured versus the `sources` in the composite aggregation.
- `illegal_argument_exception: Invalid value for [after.site], expected comparable, got [null]`: The transform was getting stuck on `null` values within its grouping keys.

## The Debugging Journey and Discoveries

Through a series of focused queries and iterative refinements, we uncovered several interconnected issues.

### 1. Composite Aggregation Challenges and the "Ghost Key"

Our composite aggregation debugging queries kept failing. This was traced to:

- Syntax mismatches: names in the `after` key must exactly match the names defined in `sources` (for example, `@timestamp` must match `@timestamp`).
- `null` values in `after_key`: terms aggregations can fail when `after_key` includes `null`, unless handled explicitly.

Then came the key finding: a direct search for documents matching the transform's `after_key` yielded zero results. The transform was trying to resume from a state that no longer existed in source data.

### 2. The Real Culprit: Unparsed "Garbage" Data

An inverse query (documents missing expected fields) revealed records like:

```json
{
  "_index": "xrd-stash-ilm-000037.reindexed",
  "_id": "cAqUoH4BOTrVvgqCSyKq",
  "_source": {
    "message": "GET / HTTP/1.1\n",
    "@timestamp": "2022-01-28T12:06:20.222Z",
    "host": "ec2-3-110-169-111.ap-south-1.compute.amazonaws.amazonaws.com",
    "tags": ["_grokparsefailure"]
  }
}
```

These were logs that failed parsing and were actually web traffic hitting the server, not XRootD stash operations. They lacked key transform fields like `logical_dirname`, `filesize`, and `server`.

When the transform encountered enough of these records, grouping keys became `null`. Combined with malformed or very long field values, the composite aggregation became unstable and hit timeouts.

### 3. Precision for PetaByte-Scale Data

Not a crash cause, but still important: `float` is not precise enough for large sums at petabyte scale.

Solution: use `double` for sums/averages and `long` for counts.

## The Ultimate Solution: Resilience and Precision

The final, robust fix used multiple changes together.

### 1. Stop and Delete Stale State

Stop the transform and delete the target index to clear bad transform/index state.

```json
POST _plugins/_transform/osdf-summary-2022/_stop
DELETE osdf-summary-2022
```

### 2. Recreate Index with Explicit High-Precision Mappings

```json
PUT osdf-summary-2022
{
  "mappings": {
    "properties": {
      "@timestamp": { "type": "date" },
      "dirname1": { "type": "keyword" },
      "logical_dirname": { "type": "keyword" },
      "filesize_sum": { "type": "double" },
      "filesize_avg": { "type": "double" },
      "filesize_count": { "type": "long" },
      "doc_count": { "type": "long" }
    }
  }
}
```

### 3. Add Intelligent Filtering in `data_selection_query`

- Exclude `_grokparsefailure` events.
- Require existence of critical grouping fields.
- Add script guards against empty or oversized keyword values.

```python
"data_selection_query": {
  "bool": {
    "must": [
      {
        "range": {
          "@timestamp": {
            "gte": f"{year}-01-01T00:00:00Z",
            "lt": f"{year + 1}-01-01T00:00:00Z"
          }
        }
      }
    ],
    "must_not": [
      { "term": { "tags": "_grokparsefailure" } }
    ],
    "filter": [
      { "exists": { "field": "logical_dirname.keyword" } },
      {
        "script": {
          "script": "doc['logical_dirname.keyword'].size() > 0 && doc['logical_dirname.keyword'].value.length() < 1000"
        }
      }
    ]
  }
}
```

### 4. Reduce `page_size`

Lowering `page_size` from `1000` to `50` significantly reduced memory pressure per composite aggregation page and helped avoid `502 Bad Gateway` failures.

### 5. Restart the Transform

After recreating the index and updating the transform definition, restart the job.

## Conclusion

By combining explicit mappings, stronger filtering, smaller pagination, and a reset of stale transform state, the transform ran reliably and produced accurate summaries without repeated failure loops.

This debugging story reinforced a key lesson: robust pipelines are not just about handling valid data, but actively excluding invalid or malformed records before they poison downstream aggregation logic.
