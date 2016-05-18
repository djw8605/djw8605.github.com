---
title: "Building CentOS packages on Travis-CI"
date: "2016-05-03 14:14:15 -0500"
author: Derek Weitzel
tags:
  - osg
header:
  teaser: /posts/CentOS-TravisCI/passing.svg
excerpt_separator: <!--more-->
---

[![Build Status](https://travis-ci.org/opensciencegrid/htcondor-ce.svg?branch=master)](https://travis-ci.org/opensciencegrid/htcondor-ce)

The [Travis-CI](https://travis-ci.org/) Continuous Integration service is great for building and testing software for each commit.  But, it is limited to only supporting builds and tests on the Ubuntu OS.  The [OSG](https://www.opensciencegrid.org/), on the other hand, only supports the EL6 and EL7 family of OS's (such as CentOS, Scientific Linux, and RHEL).  With the recent move of all OSG internal software projects to [Github](https://github.com/opensciencegrid), we have the opportunity to utilize Travis-CI infrastructure to build and test each change to our software.
<!--more-->

In this post, I hope to describe how we used Docker on Travis-CI to create a CentOS 6 and 7 environment to build and test OSG software.

## Creating the `.travis.yml`

Any Travis-CI build requires a `.travis.yml` file in the top level directory of your Github repoistory.  It is used to describe how to build and test your software.  We adapted a `.travis.yml` from Ansible testing.

```
sudo: required
env:
  matrix:
  - OS_TYPE=centos OS_VERSION=6
  - OS_TYPE=centos OS_VERSION=7
  
services:
  - docker
  
before_install:
  - sudo apt-get update
  - echo 'DOCKER_OPTS="-H tcp://127.0.0.1:2375 -H unix:///var/run/docker.sock -s devicemapper"' | sudo tee /etc/default/docker > /dev/null
  - sudo service docker restart
  - sleep 5
  - sudo docker pull centos:centos${OS_VERSION}

  
script:
 # Run tests in Container
- tests/setup_tests.sh ${OS_VERSION}
```

In the `.travis.yml` file above, first we require sudo access so that we can start a Docker image.  We want to build and test the packages on both CentOS 6 and 7, so we create a matrix so that Travis-CI will create 2 builds for each change in the repo, one for CentOS 6, and the other CentOS 7.  Next, we require the docker service to be available so that we can start our image.

In the `before_install`, we set some docker options (which may not be necessary) and download the CentOS docker image from [Docker Hub](https://hub.docker.com/).  Finally, in the `script` section, we run another script that will start the docker images.


## Setting up the Tests

CentOS 6 and 7 are significantly different and require different docker startup procedures to get a usable system for testing OSG software.  This includes starting `systemd` in CentOS 7, which is necessary to test services.

```bash
#!/bin/sh -xe

# This script starts docker and systemd (if el7)

# Version of CentOS/RHEL
el_version=$1

 # Run tests in Container
if [ "$el_version" = "6" ]; then

sudo docker run --rm=true -v `pwd`:/htcondor-ce:rw centos:centos${OS_VERSION} /bin/bash -c "bash -xe /htcondor-ce/tests/test_inside_docker.sh ${OS_VERSION}"

elif [ "$el_version" = "7" ]; then

docker run --privileged -d -ti -e "container=docker"  -v /sys/fs/cgroup:/sys/fs/cgroup -v `pwd`:/htcondor-ce:rw  centos:centos${OS_VERSION}   /usr/sbin/init
DOCKER_CONTAINER_ID=$(docker ps | grep centos | awk '{print $1}')
docker logs $DOCKER_CONTAINER_ID
docker exec -ti $DOCKER_CONTAINER_ID /bin/bash -xec "bash -xe /htcondor-ce/tests/test_inside_docker.sh ${OS_VERSION};
  echo -ne \"------\nEND HTCONDOR-CE TESTS\n\";"
docker ps -a
docker stop $DOCKER_CONTAINER_ID
docker rm -v $DOCKER_CONTAINER_ID

fi
```

In the `setup_tests.sh` file above, we have two different startups for CentOS 6 and 7.  For both startups we mount the repo, in this case the [HTCondor-CE](https://github.com/opensciencegrid/htcondor-ce), so that the docker image has access to the repo files when it builds and tests the software.

For CentOS 6, the startup is simple.  The docker image is run, and the only command is to run the `test_inside_docker.sh` script, which we will describe in the next section.

For CentOS 7, we must first start docker in privileged mode so that `systemd` may see and use the cgroup device.  Our initial `docker run` command only starts `/usr/sbin/init`, which is `systemd`.  Next, it starts our `test_inside_docker.sh` script, which will start `systemd` services.  When the tests have completed, it will stop and remove the docker image.

## Running the Tests

Finally, running tests on the software repository is completely dependent on the software being tested.

A full test file can be found in the [HTCondor-CE Repo](https://github.com/opensciencegrid/htcondor-ce/blob/48d01a0a3225f3b6d4c202743a5e48257ffb9103/tests/test_inside_docker.sh).

1. Clean the yum cache.
2. Install the EPEL and OSG repositories
3. Install RPMs required for building the software.
4. Build and package the software in RPMs
5. Install the newly package RPMs
6. Run the `osg-test` integration tests against the new packages.

It should be noted that all of the above scripts run bash with the arguments `-xe`.  The `x` means to print each line before executing it, useful for debugging.  The `e` means to exit the bash script immediately if any command returns a non-zero exit status.  Since these scripts are designed to test software, we want to capture any faults in the tests or testing infrastructure.

## Conclusions

By moving to Github for OSG's software repositories, we have made it easy to build and test each change to repos.  Additionally, we can fun full integration tests on each package for each change.  This has the potential to catch many errors.

Here is a list of OSG builds using the above configuration:

* [HTCondor-CE](https://travis-ci.org/opensciencegrid/htcondor-ce) [![Build Status](https://travis-ci.org/opensciencegrid/htcondor-ce.svg?branch=master)](https://travis-ci.org/opensciencegrid/htcondor-ce)
* [OSG Tarball Client](https://travis-ci.org/opensciencegrid/tarball-client) [![Build Status](https://travis-ci.org/opensciencegrid/tarball-client.svg?branch=master)](https://travis-ci.org/opensciencegrid/tarball-client)
* [OSG Configure](https://travis-ci.org/opensciencegrid/osg-configure) [![Build Status](https://travis-ci.org/opensciencegrid/osg-configure.svg?branch=master)](https://travis-ci.org/opensciencegrid/osg-configure)

