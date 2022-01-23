---
title: "Improving Data Federation's GeoIP"
date: "2022-01-22 00:00:00 -0500"
tags:
  - osg
author: "Derek Weitzel"
---

Optimizing data transfers requires tuning many parameters.  High latency between the client and a server can decrease data transfer throughput. The Open Science Data Federation (OSDF) attempts to optimize the latency between a client and cache by using GeoIP to locate the nearest cache to the client.  But, using GeoIP alone has many flaws.  In this post, we utilize [Cloudflare Workers](https://workers.cloudflare.com/) to provide GeoIP information.  During the evaluation, we found that location accuracy grew from **86%** accurate with the original GeoIP service to **95%** accurate with Cloudflare Workers.

{% include figure image_path="/images/posts/CloudflareWorkers/CacheMap.png"
alt="Map of U.S. OSDF" caption="Map of OSDF locations"
%}

GeoIP has many flaws, first, the nearest physical cache may not be the nearest in the network topology.  Determining the nearest cache in the network would require probing the network topology between the client and every cache, a intensive task to perform for each client startup, and may be impossible with some network configurations, such as blocked network protocols.

Second, the GeoIP database is not perfect.  It does not have every IP address, and the addresses may not have accurate location information.  When GeoIP is unable to determine a location, it will default to "guessing" the location is a lake in Kansas ([a well known issue](https://arstechnica.com/tech-policy/2016/08/kansas-couple-sues-ip-mapping-firm-for-turning-their-life-into-a-digital-hell/)).

Following a review of the Open Science Data Federation (OSDF), we found that we could improve effeciency by improving the geo locating of clients.  In the review, several sites where detected to not be using the nearest cache.

Implementation
--------------

StashCP queries the [CVMFS](https://cernvm.cern.ch/fs/) geo location service which relies on the [MaxMind GeoIP database](https://www.maxmind.com/en/home).

[Cloudflare Workers](https://workers.cloudflare.com/) are designed to run at Cloudflare's many colocation facilities near the client.  Cloudflare directs a client's request to a nearby data center using DNS.  Each request is annotaed with an approximate location of the client, as well as the colocation center that received the request.  Cloudflare uses a GeoIP database much like MaxMind, but it also falls back to the colocation site that the request was serviced.

I wrote a Cloudflare worker, [`stash-location`](https://github.com/djw8605/cache-locator), which calculates the nearest cache to the client.  It uses the GeoIP location of the client to calculate the ordered list of nearest caches.  If the GeoIP fails for a location, the incoming request to the worker will not be annotated with the location but will include the `AITA` airport code of the colocation center that received the client request.  We then return the ordered list of nearest caches to the airport.

We imported a [database of airport codes](https://www.partow.net/miscellaneous/airportdatabase/) to locations that is pubically available.  The database is stored in the [Cloudflare Key-Value](https://developers.cloudflare.com/workers/learning/how-kv-works), keyed by the `AITA` code of the airport.

Evaluation
----------

To evaluate the location, I submitted test jobs to each site available in the OSG OSPool, 43 different sites at the time of evaluation.  The test jobs:

1. Run the existing `stashcp` to retrieve the closest cache.

        stashcp --closest

2. Run a custom [closest script](https://github.com/djw8605/closest-cache-cloudflare) that will query the Cloudflare worker for the nearest caches and print out the cache.

After the jobs completed, I compiled the caches decisions to a [spreadsheet](https://docs.google.com/spreadsheets/d/1mo1FHYW2vpCyhSeCCd_bwP21rFFzqedv0dZ0z8EY4gg/edit?usp=sharing) and manually evaluated each cache selection decision.  The site names in the spreadsheet are the somewhat arbitrary internal names given to sites.

In the spreadsheet, you can see that the correct cache was choosen **86%** of the time with the old GeoIP service, and **95%** of the time with Cloudflare workers.

### Notes during the Evaluation

Cloudflare was determined to be incorrect at two sites, the first being `UColorado_HEP` (University of Colorado in Boulder).  In this case, the Colorado clients failed the primary GeoIP lookup and the cloudflare workers fell back to using the `AITA` code from the request.  The requests from Colorado all where recieved by the Cloudflare Dallas colocation site, which is nearest the Houston cache.  The original GeoIP service choose the Kansas City cache, which is the correct decision.  It is unknown if the orignal GeoIP service choose KC cache because it knew the GeoIP location of the clients, or it defaulted to the Kansas default.

The second site where the Cloudflare worker implementation was incorrect was `SIUE-CC-production` (Southern Illinois University Edwardsville).  In this case, the original GeoIP service choose Chicago, while the new service choose Kansas.  Edwardsville is almost equal distance from both the KC cache and Chicago.  The difference in the distance to the caches is ~0.6 KM, with Chicago being closer.

<!-- TODO: Find out why KC cache was choosen SIUE -->

During the evaluation, I originally used the Cloudflare worker development DNS address, [stash-location.djw8605.workers.dev](https://stash-location.djw8605.workers.dev).  Purdue University and the American Museum of Natural History sites both blocked the development DNS address.  The block was from an OpenDNS service which reported the domain had been linked to malware and phishing.  Since the DNS hostname was hours old, it's likely that most `*workers.dev` domains were blocked.


Conclusion
----------

Improving the cache selection can improve the download effeciency.  It is left as future work to measure if the nearest geographical cache is the best choice.  While the OSDF is using GeoIP service for cache selection, it is important to select the correct cache.  Using the new Cloudflare service results in **95%** correct cache decision vs. **86%** with the original service.




