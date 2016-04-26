---
title: "HTCondor-CE-Bosco Upcoming Release"
date: "2016-04-25 15:42:18 -0500"
author: Derek Weitzel
tags:
  - osg
  - bosco
header:
  - teaser: /images/posts/htcondor-ce-bosco/HTCondorCEBosco.png
---

The HTCondor-CE-Bosco is one of the largest changes for the OSG 3.3.12 release.  The HTCondor-CE-Bosco is a special configuration of the [HTCondor-CE](https://twiki.grid.iu.edu/bin/view/Documentation/Release3/InstallHTCondorCE).  The HTCondor-CE-Bosco does not submit directly to a local scheduler such as [Slurm](http://slurm.schedmd.com/) or [PBS](http://www.adaptivecomputing.com/products/open-source/torque/), instead, it will submit to a remote cluster over SSH with Condor.

The HTCondor-CE-Bosco is designed to make it easier to contribute opportunistic resources to the OSG.  Instead of allocating a special node or VM that can run services as root, and submit to the local cluster to run an OSG CE, an organization can setup a separate node with only SSH access to the cluster.  In addition, the OSG can host and manage the CE for an opportunistic resource, reducing the load on the admins completely.

![HTCondor-CE-Bosco](/images/posts/htcondor-ce-bosco/HTCondorCEBosco.png)

The HTCondor-CE portion acts just like any other CE.  It can authenticate with GUMS, or use simple grid-mapfile.  It runs the normal HTCondor-CE daemons such as the Collector and Schedd.  But, there is a special route that instructs the HTCondor-CE to submit to a remote resource rather than a local scheduler.

```
JOB_ROUTER_ENTRIES = \
   [ \
     GridResource = "batch condor bosco@10.71.101.178"; \
     TargetUniverse = 9; \
     name = "Local_BOSCO"; \
   ]
```

This route tells the HTCondor-CE to transform the incoming job into a Bosco job to be submitted to a local cluster.  The above code snippet is from my development testbed.

The configuration of a HTCondor-CE-Bosco is minimal beyond a normal HTCondor-CE.  All that is required is:

  * Have an ssh key to the remote cluster for password-less ssh.
  * What kind of Batch system is installed on the remote cluster, for example, Slurm, PBS, LSF...

Full installation instructions are [OSG's Twiki](https://twiki.grid.iu.edu/bin/view/Documentation/Release3/InstallHTCondorBoscoDraft).  Configuration of the HTCondor-CE-Bosco is managed by the [osg-configure](https://github.com/opensciencegrid/osg-configure) tool and an ini file in `/etc/osg/config.d/20-bosco.ini`.
