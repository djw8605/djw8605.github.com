---
title: FabAID
summary: "National fabric of open data services for data-intensive and AI-driven research."
website: https://fabaid.io
logo: /images/projects/fabaid-logo.svg
logo_alt: FabAID logo
technologies:
  - osdf
  - xrootd
  - ceph
  - kubernetes
  - scitokens
  - jsonwebtokens
  - go
  - python
order: 2
---

[FabAID](https://fabaid.io) is an NSF-funded project building a fabric of services to accelerate data-intensive and AI-driven science — federating storage, caching, discovery, and workflows into an open service layer.

My work focuses on cybersecurity and operations for the FabAID service fabric: token-based authorization between services, and the operational practices that keep federated data delivery reliable.

A fabric that spans institutions cannot rely on a shared perimeter, so authorization has to travel with the request. That is the same capability-based model as [SciTokens]({{ '/projects/scitokens/' | relative_url }}), applied to a data layer that is still being built.

## Technologies

<div markdown="0">
{% include technology-badges.html technologies=page.technologies label="FabAID technologies" %}
</div>

## NSF Awards

- [OAC-2609485](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2609485)
