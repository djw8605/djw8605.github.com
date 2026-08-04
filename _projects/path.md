---
title: PATh
summary: "CHTC and OSG partnership expanding access to distributed high-throughput computing and the OSDF."
website: https://path-cc.io
logo: /images/projects/path-logo.png
logo_alt: PATh logo
technologies:
  - htcondor
  - osdf
  - xrootd
  - cvmfs
  - scitokens
  - python
order: 3
---

[PATh](https://path-cc.io) (Partnership to Advance Throughput Computing) connects the Center for High Throughput Computing and the Open Science Grid to broaden access to distributed high-throughput computing for research communities.

My contribution is on the data side: operating the Open Science Data Federation (OSDF) caches and origins that PATh workloads read from, and the monitoring that shows whether that data movement is healthy.

The recurring problem is not peak throughput but predictability — a cache that quietly stops serving, or a dataset that is slow from one site and fast from another, costs researchers more time than raw bandwidth ever wins back.

## Technologies

<div markdown="0">
{% include technology-badges.html technologies=page.technologies label="PATh technologies" %}
</div>

## NSF Awards

- [OAC-2030508](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2030508)
