---
title: "Singularity on the OSG"
date: "2016-01-13 16:08:24 -0600"
author: Derek Weitzel
tags:
  - osg
  - condor
  - htcondor
  - singularity
excerpt_separator: <!--more-->
---

[Singularity](http://singularity.lbl.gov/) is a container platform designed for use on computational resources.
Several sites have deployed Singularity for their users and the OSG.  In this post, I will provided a tutorial on how to use
singularity on the OSG.

<!--more-->

## About Singularity

> Singularity enables users to have full control of their environment. This means that a non-privileged user can “swap out” the operating system on the host for one they control.

- [Singularity](http://singularity.lbl.gov/)

Singularity is able to provide alternative environments for users than what is installed on the system.  For example, if you have 
an application that installs well on Ubuntu but the system you are running on is RHEL6.  In this example, you can create a Singularity
image of Ubuntu, install the application, then start the image on the RHEL6 system.

## Creating your first Singularity (Docker) image

Instead of making a Singualrity image as described [here](http://singularity.lbl.gov/create-image), we will create a docker image, then load use that in Singularity.  We are using the docker image for a few reasons:

- If you already have a docker image, then you can use this same image with Singularity.
- If you are running your job on a docker encapsulated resource, such as Nebraska's Tier 2, then Singularity is unable to use the default images because it is unable to acquire a loop back device inside the container.

Creating a Docker image requires root or sudo access.  It usually performed on your own laptop or a machine that you own and have root access.

Docker has a great page on [creating Docker images](https://docs.docker.com/engine/tutorials/dockerimages/), which I won't repeat.  A simple docker image is easy to create using the very detailed instructions linked above.

Once you have uploaded the docker image to the Docker Hub, be sure to keep track of the name and version you will want to run on the OSG.


## Running Singularity on the OSG

For a singularity job, you have to start the docker image in Singularity.

The submit file:

    universe = vanilla
    executable = run_singularity.sh
    should_transfer_files = IF_NEEDED
    when_to_transfer_output = ON_EXIT
    Requirements = HAS_SINGULARITY == TRUE
    output = out
    error = err
    log = log
    queue

The important aspect is the `HAS_SINGULARITY` in the requirements.  It requires that the remote node has the `singularity` command.

The executable script, `run_singularity.sh`:

    #!/bin/sh -x
    
    # Run the singularity container
    singularity exec --bind `pwd`:/srv  --pwd /srv docker://python:latest python -V

The line `--bind ``pwd``:/srv` binds the current working directory into the singularity container.  While the command `--pwd /srv` changes the working directory to `/srv` directory when the singularity container starts.  The output of the command should be the version of python installed inside the Docker image.  The last arguments is the program that will run inside the docker image, 'python -V'

You can submit this script the normal way:

    $ condor_submit singularity.submit
    
The resulting output should state what version of Python is available in the docker image.

## More complicated example

The example singularity command is very basic.  It only starts the singularity image and runs the python within it.  Another example which runs a python script that is brought along is below.  In this example we transfer an input python script to run inside singularity.  Also, we bring an output file back that was generated inside the singularity image.

    #!/bin/sh -x

    singularity exec --bind `pwd`:/srv  --pwd /srv docker://python:latest /usr/bin/python test.py

The contents of test.py are:

    import sys
    stuff = "Hello World: The Python version is %s.%s.%s\n" % sys.version_info[:3]

    f = open('stuff.blah', 'w')
    f.write("This is a test\n")
    f.write(stuff)
    f.close()
    
Also, it is necessary to modify the submit script to addd a new line before the `queue` statement:

    transfer_input_files = test.py
    
This tells HTCondor to bring the input file test.py.

When the job completes, you should have a new file in the submission directory called stuff.blah.  It will have the contents (in my case):

    This is a test
    Hello World: The Python version is 2.7.9
    

# Conclusion

Singularity is a very useful tool for software environments that are too complicated to bring along for each job.  It provides an isolated environment where the user can control the software, while using the computing resources of the contributing clusters.









