---
author: "Derek Weitzel"
tags:
  - osg
title: "StashCache By The Numbers"
date: "2018-09-26 00:00:00 -0500"

gallery:
  - url: /posts/StashCache-By-Numbers/StashCache-CVMFS.png
    image_path: /posts/StashCache-By-Numbers/StashCache-CVMFS.png
    alt: "Client Usage By Tool"
    title: "Client Usage By Tool"
  - url: /posts/StashCache-By-Numbers/StashCP-Usage.png
    image_path: /posts/StashCache-By-Numbers/StashCP-Usage.png
    alt: "StashCP Usage"
    title: "StashCP Usage"

---

The StashCache federation is comprised of 3 components: Origins, Caches, and Clients.  There are additional components that help the federation in usability which I will also mention.

{% include figure image_path="/images/posts/StashCache-By-Numbers/StashCache-Cumulative.png" alt="Cumulative Usage of StashCache" caption="Cumulative Usage of StashCache over the last 90 days" %}

Origins
-------

A StashCache Origin is the authoritative source of data.  The origin receives data location requests from the central redirectors.  These requests take the form of "Do you have the file X", to which the origin will respond "Yes" or "No".  The redirector then returns origins that claim to have the requested file.

| Origin         | Base Directory | Data Read |
|----------------|----------------|-----------|
| LIGO Open Data | /gwdata        | 926TB |
| OSG Connect    | /user          | 246TB |
| FNAL           | /pnfs          | 166TB |
| OSG Connect    | /project       | 63TB  |

A list of Origins and their base directories.


Clients
-------

The clients interact with the StashCache federation on the user's behalf.  They are responsible for choosing the "best" cache.  The available clients are [CVMFS](https://cernvm.cern.ch/portal/filesystem) and [StashCP](https://github.com/opensciencegrid/StashCache).

{% include gallery caption="StashCache Client Usage" %}

In the pictures above, you can see that most users of StashCache use CVMFS to access the federation.  GeoIP is used by all clients in determining the "best" cache.  GeoIP location services are provided by the CVMFS infrastructure in the U.S.  The geographically nearest cache is used.

The GeoIP service runs on multiple CVMFS Stratum 1s and other servers.  The request to the GeoIP service includes all of the cache hostnames.  The GeoIP service takes the requesting IP address and attempts to locate the requester.  After determining the location of all of the caches, the service returns an ordered list of nearest caches.

The GeoIP service uses the [MaxMind database](https://www.maxmind.com/) to determine locations by IP address.


### CVMFS

Most (if not all) origins on are indexed in an `*.osgstorage.org` repo.  For example, the OSG Connect origin is indexed in the `stash.osgstorage.org` repo.  It uses a special feature of CVMFS where the namespace and data are separated.  The file metadata such as file permissions, directory structure, and checksums are stored within CVMFS.  The file contents are not within CVMFS.

When accessing a file, CVMFS will use the directory structure to form an HTTP request to an external data server.  CVMFS uses GeoIP to determine the nearest cache.

The indexer may also configure a repo to be "authenticated".  A whitelist of certificate DN's is stored within the repo metadata and distributed to each client.  The CVMFS client will pull the certificate from the user's environment.  If the certificate DN matches a DN in the whitelist, it uses the certificate to authenticate with an authenticated cache.

### StashCP

StashCP works in the order:

1. Check if the requested file is available from CVMFS.  If it is, copy the file from CVMFS.
2. Determine the nearest cache by sending cache hostnames to the GeoIP service.
3. After determining the nearest cache, run the `xrdcp` command to copy the data from the nearest cache.

Caches
------

{% include figure image_path="/images/posts/StashCache-By-Numbers/CacheLocations.png" alt="Cache Locations" caption="Cache Locations in the U.S." %}

The cache is half XRootD cache and half XRootd client.  When a cache receives a data request from a client, it searches it's own cache directory for the files.  If the file is not in the cache, it uses the built-in client to retrieve the file from one of the origins.  The cache will request the data location from the central redirector which in turn, asks the origins for the file location.

The cache listens on port 1094 to regular XRootD protocol, and port 8000 for HTTP.

### Authenticated Caches

Authenticated caches use GSI certificates to authenticate access to files within the cache.  The client will authenticate with the cache using the client's certificate.  If the file is not in the cache, the cache will use it's own certificate to authenticate with the origin to download the file.

Authenticated caches use port 8443 for HTTPS.


