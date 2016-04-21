---
title: A New Blogging Platform
header:
  teaser: /posts/jekyll-logo.png
author: Derek Weitzel
tags:
  - osg
excerpt_separator: <!--more-->
---

{% include base_path %}

![Jekyll]({{ base_path }}/images/posts/jekyll-logo.png){: .align-right}

I have decided to move my Blog from Blogspot to Github Pages, and Jekyll publisher.  I made this move for many reasons, but my [latest blog post]({% post_url 2016-04-20-querying-elasticsearch-cluster-for %}) showed how difficult it can be to create technical posts in Blogger.  For example, syntax highlighting is very difficult.  Something as easy as below was nearly impossible to look right.  And I resorted to using gists.
<!--more-->

```python
def GetCountRecords(client, from_date, to_date, query = None):
    """
    Get the number of records (documents) from a date range
    """
    s = Search(using=client, index='gracc-osg-*') \
        .filter('range', **{'@timestamp': {'from': from_date, 'to': to_date}}) \
        .params(search_type="count")

    response = s.execute()
    return response.hits.total
```

Now, I can include the code directly into the post.  Further, it was difficult to preview and correct for any formatting issues I may have.

There are some downsides to using jekyll though.  For example, image formatting is going to be more difficult.  In blogger, it is just a simple button to push that makes images larger or smaller.  Now, I have to resize them much more manually.

But, overall, I think I will be very happy with this new blogging platorm.  Hopefully, I will be able to post more often.


