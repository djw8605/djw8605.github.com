---
title: GP-STOR
summary: "Tiered object storage for research data, distributed across Great Plains institutions."
website: https://gp-stor.org
logo: /images/projects/gp-stor-logo.png
logo_alt: GP-STOR logo
technologies:
  - ceph
  - kubernetes
  - helm
  - osdf
  - xrootd
  - linux
order: 7
---

[GP-STOR](https://gp-stor.org) — the Great Plains Scalable Tiered Object Repository — is a distributed storage initiative for the region, built around resilient, tiered object storage for research workloads.

My focus is the service architecture: Ceph object storage spread across institutions, fronted by data access that research computing environments already speak, so a dataset is reachable from a job without a bespoke transfer step.

Multi-site durability is the requirement that shapes everything else. Storage that survives a site outage but that researchers find awkward to read from will not be used, so the access path gets as much attention as the replication does.

I am the PI for GP-STOR.

## Technologies

<div markdown="0">
{% include technology-badges.html technologies=page.technologies label="GP-STOR technologies" %}
</div>

## NSF Awards

- [OAC-2502799](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2502799)
