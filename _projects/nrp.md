---
title: National Research Platform
summary: "Community-owned Kubernetes platform sharing compute, storage, and networking across institutions."
website: https://nrp.ai
logo: /images/projects/nrp-logo.png
logo_alt: National Research Platform logo
technologies:
  - kubernetes
  - helm
  - ceph
  - osdf
  - xrootd
  - opensearch
  - python
order: 4
---

The [National Research Platform (NRP)](https://nrp.ai) is a community-owned platform that connects institutions and researchers to shared computing, storage, and networking resources.

My contribution is platform operations: keeping the multi-tenant Kubernetes environment, its Ceph storage, and its Open Science Data Federation (OSDF) caches dependable for the groups running on them.

Multi-tenancy is the hard part. Dozens of research groups share one cluster, so a single workload that misbehaves is everyone's problem — most of this work is about isolation, observability, and making the platform's limits legible before a researcher hits them.

## Technologies

<div markdown="0">
{% include technology-badges.html technologies=page.technologies label="NRP technologies" %}
</div>

## NSF Awards

- [CNS-1730158](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1730158)
- [ACI-1540112](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1540112)
- [ACI-1541349](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1541349)
- [OAC-1826967](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1826967)
- [OAC-2112167](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2112167)
- [CNS-2100237](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2100237)
- [CNS-2120019](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2120019)
