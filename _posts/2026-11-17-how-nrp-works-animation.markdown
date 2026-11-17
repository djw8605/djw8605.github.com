---
title: "How the National Research Platform Works, in About a Minute"
date: "2026-11-17 00:00:00 -0600"
tags:
  - nrp
  - kubernetes
  - dataviz
author: "Derek Weitzel"
layout: single
header:
  og_image: /images/posts/nrp-how-it-works/nrp-workloads.png
  teaser: /images/posts/nrp-how-it-works/nrp-workloads.png
---

When I explain the National Research Platform (NRP), the same three questions come up: how do I get in, where does my job actually run, and what is everyone else running on it? I wanted one thing I could point people to that answers all three, so I built a short animation that follows a job from sign-in to results.

{% include animation.html src="/assets/animations/nrp-how-it-works.html" title="How the National Research Platform works" caption="Use Back and Next, the step bar, or the arrow keys to move through it." %}

## The steps, in words

1. **Sign in with your institution.** There is no separate NRP password. You log in with the account you already have at your university or college, and a group admin adds you to your lab's namespace, which holds your jobs, storage, and quotas.
2. **Pick a way in.** Batch work goes in as a Kubernetes job, a YAML file that names a container and the GPUs, CPUs, and memory it needs. JupyterHub gives you a notebook server on a shared GPU without touching Kubernetes. Hosted open-weight language models are available in a browser chat or through an OpenAI-compatible API.
3. **Jupyter.** Sign in, pick a profile, and you have a notebook with a GPU attached. Courses and labs that need more control can run their own hub on the same hardware.
4. **Language models.** Chat with the hosted models in Open WebUI, or point a coding CLI or your own code at the same endpoint. There is nothing to deploy.
5. **Scheduling.** NRP is one Kubernetes cluster built from hardware at many campuses. The scheduler places each pod on a node that has the resources it asked for, wherever that node is.
6. **Running.** The node pulls your container image, assigns a GPU, and mounts storage, including Ceph for S3 buckets and shared filesystems and OSDF caches for large shared datasets.
7. **Workloads.** AI training, LLM inference, LHC physics, genomics, and classroom notebooks share the same machines, so an idle GPU at one campus becomes capacity for a researcher at another.
8. **Results and accounting.** Output comes back to you, and each namespace's GPU and CPU time is recorded so contributing institutions can see what their hardware supported.

## Why this model works

The hardware never leaves the campus that bought it. A contributing institution keeps its nodes in its own machine room, and the NRP team operates them remotely as part of the shared cluster. The contributor gets priority on its own nodes whenever it needs them, and when it does not, those nodes run work for everyone else.

The other half is that most users never see Kubernetes. JupyterHub and the LLM API cover a large share of what researchers and instructors need, and people who do want full control can still submit their own jobs and services.

## How I built it

The animation is a single self-contained HTML file: inline SVG and a small JavaScript timeline, with no animation library. I built it with Claude (Opus). We storyboarded the scenes in text first, then revised one scene at a time, which worked much better than asking for the whole thing at once. The same file is easy to reuse. It runs standalone, embeds in a page like this one, and can open in a dialog on another site.

## Try the NRP

If you are at a U.S. nonprofit research or education institution, NRP is free to use. The [getting started guide](https://nrp.ai/documentation/userdocs/start/getting-started/) walks through your first namespace and job, the [model catalog](https://nrp.ai/llms) lists the hosted LLMs, and the [NRP site](https://nrp.ai) has the schedule for bi-weekly office hours.
