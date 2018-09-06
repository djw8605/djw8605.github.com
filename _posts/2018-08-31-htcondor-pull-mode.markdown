---
title: "HTCondor Pull Mode"
date: "2018-08-31 12:28:42 -0500"
author: "Derek Weitzel"
tags:
  - osg
  - htcondor
---

For a recent project to utilize HPC clusters for HTC workflows, I had to add the ability to transfer the input and output sandboxes to and from HTCondor.  HTCondor already has the ability to spool input files to a SchedD, and pull the output sandbox. These functions are intended to stage jobs to an HTCondor pool.  But, HTCondor did not have the ability to pull jobs from an HTCondor pool.

The anticipated steps for a job pulled from an HTCondor pool:

1. Download the **input** sandbox
2. Submit the job to the local scheduler
3. Watch the job status of the job
4. Once completed, transfer the **output** sandbox to the origin SchedD

The sandboxes are:

- **Input**:
    - Input files
    - Executable
    - Credentials
- **Output**: 
    - Stdout / Stderr from job
    - Output files or any files that may have changed while the job ran

## API Additions

In order to transfer the input sandbox and output sandbox, 2 new commands where added to the SchedD, as well as a new client function and python bindings to use them.

The function for transferring input files is:

    transferInputSandbox(constraint, destination)

`jobs` is a HTCondor constraint selecting the jobs whose input files should be transferred.  `destination` is a directory to put the sandboxes.  The sandboxes will be placed in directories named `destination/<ClusterId>/<ProcId>/`.

For transferring output files, the function is:

    transferOutputSandbox( jobs )

Where `jobs` is a list of tuples.  The structure of the tuple is `( classad, sandboxdir )`.  `classad` is the full classad of the original job, and `sandboxdir` is the location of the output sandbox to send.

## Current Status

I have created a [repo](https://github.com/djw8605/htcondor-pull) for an example that uses these functions in order to pull a job from a remote SchedD.

Also, my changes to [HTCondor](https://github.com/djw8605/htcondor/tree/add_sandbox_transfers) are in my repo, and I have begun the discussion about merging in my changes.

