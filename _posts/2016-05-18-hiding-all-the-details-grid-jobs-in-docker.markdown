---
title: "Hiding all the details: Grid jobs in Docker"
date: "2016-05-18 09:57:15 -0500"
author: Derek Weitzel
tags:
  - osg
  - condor
  - htcondor
  - docker
header:
  teaser: /posts/DockerGrid/DockerLogo.png
excerpt_separator: <!--more-->
---

For a long time, HTCondor has strived to have the job runtime environment be run and defined by the submit host.  But, that is surprisingly difficult to do.  There are many reasons why the environment should be controlled by the submit host, for example:
<!--more-->

1. Enable OS updates independent of the job environment.  The sysadmins may want to run newer operating systems.
2. Allow users to define their own execution environment.  Many applications require many dependencies that can be packaged together.

Previously we would have considered virtual machines.  But... virtual machines are difficult to author and maintain.  Virtual machines tend to be large (in GBs).  And they can have potentially large overheads, especially for IO.


<a href="https://research.cs.wisc.edu/htcondor/HTCondorWeek2013/presentations/ThainG_BoxingUsers.pdf"><img align="right" src="/images/posts/DockerGrid/GregSlide.png"></a>


In 2013, Greg Thain presented putting users in a box for job isolation.  It used three technologies in order to enable the isolation:

1. **PID Namespaces** - Isolation of the job processes from other jobs.  Also, job processes cannot view system processes.
2. **`CHROOT`s** - Create an isolated filesystem to protect the system from modifications.
3. **CGroups** - Control Groups to isolate resource usage between jobs and the system.

We used these chroot in Nebraska's transition from RHEL5 to RHEL6.  But the `chroot` capability has degraded over time since it is difficult to author and maintain raw `chroot`s.  

## A New Approach

<a href="https://www.docker.com/"><img align="right" src="/images/posts/DockerGrid/DockerLogo.png"></a>

`chroot`, namespaces, and cgroups are all part of [Docker](https://www.docker.com/)'s containerization solution.  Docker provides a very approachable way to compose and publish images.  Further, we don't need to maintain a RHEL6 image, only our local customizations on top.

We decided to use HTCondor's **new** Docker universe.  We want to trnasform incomping grid jobs into Docker universe jobs.


### Why Docker 

We chose Docker over Virtual Machines due to potential IO bottlenecks that have been identified in recent publications.

![Docker Vs VM IO performance](/images/posts/DockerGrid/DockerVsVMs.png)

### Environment

Our host environment consists of:

* CentOS 7.2: This is our admin’s preferred OS.
* Docker v1.9.1: Default version of Docker for RHEL7.
* HTCondor 8.5.4: Contains a few useful bug fixes and new features over the current stable series.

The default container is based off of CentOS 6.  It includes the OSG WN packages, gcc, glibc-headers... for various system depenedencies for the CMS project.  Here is the [Docker Hub](https://hub.docker.com/r/unlhcc/osg-wn-el6/).

The full DockerFile is on [Github](https://github.com/unlhcc/docker-osg-wn-el6) and below.

```
FROM centos:centos6

RUN yum -y install http://repo.grid.iu.edu/osg/3.3/osg-3.3-el6-release-latest.rpm && \
    yum -y install epel-release && \
    yum -y install osg-wn-client osg-wn-client-glexec cvmfs && \
    yum -y install glibc-headers && \
    yum -y install gcc && \
    yum -y install redhat-lsb-core sssd-client && \
    yum clean all && \
    yum -y update

# Create condor user and group
RUN groupadd -r condor && \
    useradd -r -g condor -d /var/lib/condor -s /sbin/nologin condor

# Add lcmaps.db
COPY lcmaps.db /etc/lcmaps.db

RUN yum -y install openssh-clients && yum clean all
```

That's it, that's all of the DockerFile.

There are a few important directories from the host that need to be available to the container - for example, the HDFS-based storage system. Docker refers to these as volume mounts. Currently, we bring in a total of 6 different directories.  Most volumes are marked read only - no need for the jobs to write to these. Exception is SSSD: need to write to a Unix socket to lookup usernames.

```
DOCKER_VOLUME_DIR_CVMFS         = /cvmfs:/cvmfs:ro
DOCKER_VOLUME_DIR_ETC_CVMFS     = /etc/cvmfs:/etc/cvmfs:ro
DOCKER_VOLUME_DIR_HDFS          = /mnt/hadoop:/mnt/hadoop:ro
DOCKER_VOLUME_DIR_GRID_SECURITY = /etc/grid-security:/etc/grid-security:ro
DOCKER_VOLUME_DIR_SSSD          = /var/lib/sss/pipes/nss
DOCKER_VOLUME_DIR_NSSWITCH      = /etc/nsswitch.conf:/etc/nsswitch.conf:ro
DOCKER_MOUNT_VOLUMES = CVMFS, ETC_CVMFS, HDFS, GRID_SECURITY, SSSD, NSSWITCH
```

### OSG Flow

The [HTCondor-CE](https://twiki.grid.iu.edu/bin/view/Documentation/Release3/HTCondorCEOverview) accepts jobs into the cluster from external submitters.

<img align="right" src="/images/posts/DockerGrid/HTCondor-CE-Docker-highlight.png">

1. GlideinWMS factories submit to the HTCondor-CE
2. The Job Router component transforms the CE job to use Docker universe.
   * Surprisingly, no new `JobUniverse`.
   * Sets `DockerImage`.
   * Changes the `Cmd` string.
   
Snippets from the `condor_job_router` transform language

* Cmd needs to be prepended with `./`:

      copy_Cmd = "orig_Cmd"
      eval_set_Cmd = ifThenElse(regexp("^/", orig_Cmd), orig_Cmd, strcat("./",orig_Cmd))
      
* `DockerImage` needs to be set:

      copy_DockerImage = "orig_DockerImage"
      eval_set_DockerImage = ifThenElse(isUndefined(orig_DockerImage),
                            “unlhcc/osg-wn-el6",
                            orig_DockerImage)

### Current Status
Running Production CMS and OSG jobs on Nebraska's CMS Tier 2.  Currently ~10% of the Nebraska Tier 2 is Docker-enabled.  Will be expanding to the entire cluster in the coming weeks: goal is to be done by the end-of-summer.  Next step is to further explore how to (safely) expose this capability to OSG VOs and users.
    
## Future Directions

HTCondor treats all Docker images the same.  We want to differentiate the images that come from the “good guys” (us) versus the “bad guys” (users).  Still uncomfortable with the idea of allowing users to request arbitrary images. RHEL7.2 includes various sandboxing mechanisms: there’s no (publicly) known ways to break out, but the track record is relatively poor.

### Wishlist
Things that would simplify our setup:

1. Pass resource accounting (CPU, memory usage) from Docker to HTCondor.  Scheduled for 8.5.5.
2. Avoid prepending ./ to the Cmd.
3. Make volume mounts conditional: we only want to expose HDFS and SSSD to CMS jobs.
4. Ability to whitelist particular images - evaluated on worker node!
5. Ability to mark jobs in “untrusted images” with the Linux “NO_NEW_PRIVS” flag (prevents setuid).

## References

* [HTCondor Week 2016 talk](https://research.cs.wisc.edu/htcondor//HTCondorWeek2016/presentations/WedWeitzel_DockerGridJobs.pdf)

