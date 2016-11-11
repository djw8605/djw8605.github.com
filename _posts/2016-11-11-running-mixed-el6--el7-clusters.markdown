---
title: "Running Mixed EL6 & EL7 Clusters"
date: "2016-11-11 13:41:11 -0700"
author: Derek Weitzel
tags:
  - osg
  - condor
  - htcondor
excerpt_separator: <!--more-->
---

We are entering a new era of transition from Enterprise Linux (EL) 6 to EL7.  During this transition, we have to support submitting jobs to clusters that are running one or both of these OS's.  In this post, I will describe how we have accomplished this at a few sites.

<!--more-->

When GlideinWMS factories submit jobs to a CE, they are configured to run on only a single operating system.  Therefore, you must route jobs to their designated OS through the HTCondor-CE Routes.  

### HTCondor-CE Configuration
A HTCondor-CE must be configured to submit to multiple clusters or separate sections of the same cluster.  In the examples below, I will show how a HTCondor-CE-Bosco CE can be configured to submit to multiple clusters, each running a different OS.  But, the examples could be adapted to work for a HTCondor or a Slurm cluster.

Changes for HTCondor or Slurm cluster:
* **HTCondor**: remote_requirements would have to be set so that the jobs only run on Startd's that advertise the correct OS version.
* **Slurm**: Usually different OS nodes will be in different partitions.  If this is true, then the `default_queue` argument can be used in the route to send the job to the correct partition.

Here is an example route from an HTCondor-CE-Bosco:

```
JOB_ROUTER_ENTRIES = \
     [ \
     GridResource = "batch pbs griduser@el7.example.edu"; \
     TargetUniverse = 9; \
     name = "Local_BOSCO_el7"; \
     requirements = TARGET.distro=?=“RHEL7”;\
     ]\
     [ \
     GridResource = "batch pbs griduser@el6.example.edu"; \
     TargetUniverse = 9; \
     name = "Local_BOSCO_el6"; \
     requirements = TARGET.distro=?=“RHEL6”;\
     ]
```

In this configuration, any job that includes the argument `+distro="RHEL7"` or `"RHEL6"` will go to the correct EL7 or EL6 cluster.  This can be used by the GlideinWMS factory to route jobs to the correct nodes.

### Factory Configuration

The GlideinWMS factory must also be configured to submit to each of the different OS types.  The factory creates two entry points, one for each of the different OS's.  One entry point will have `+distro="RHEL7"`, the other `+distro="RHEL6"`.  They will have all other attributes the same, including the CE hostname and contact information.

## Conclusions

With clusters upgrading to EL7 at a rapid pace, the OSG must support mixed OS clusters.  Hopefully this post will help with recipes for HTCondor-CE's that are used to access mixed OS clusters.

In the next post, I hope to discuss how [Singularity](http://singularity.lbl.gov/) can be used to hide the local OS.  It can also allow for users to create and distribute complicated environments without the need of downloading and configuring software on each worker node.


