---
title: SciTokens
summary: "Federated, capability-based authorization for distributed scientific computing."
websites:
  - https://scitokens.org
  - https://sciauth.org
logo: /images/projects/scitokens-logo.png
logo_alt: SciTokens logo
technologies:
  - scitokens
  - jsonwebtokens
  - htcondor
  - xrootd
  - python
order: 8
---

[SciTokens](https://scitokens.org) provides a federated authorization model for distributed scientific computing: instead of identifying who you are at every resource, a job carries a token that states what it is allowed to do.

The companion [SciAuth](https://sciauth.org) effort focused on adoption — getting these patterns into the software that resource providers actually run, so least-privilege sharing across collaborations becomes the default rather than a project-specific integration.

My contribution is that integration and deployment work: making token-based authorization function in the systems researchers already use — HTCondor job submission and XRootD data access — and helping resource providers turn it on without breaking the workflows already running through them.

Capability-based access is straightforward to specify and unforgiving to retrofit. The engineering is mostly in migration: honoring existing credentials while the token path is proven, then removing the old one.

## Technologies

<div markdown="0">
{% include technology-badges.html technologies=page.technologies label="SciTokens technologies" %}
</div>

## NSF Awards

- [OAC-2114989](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2114989)
