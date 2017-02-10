---
title: "Deploying Docs on Github with Travis-CI"
date: "2017-02-08 09:44:19 -0600"
author: Derek Weitzel
tags:
  - osg
  - github
  - travis-ci
---

It is very common to deploy docs from a [Github](https://github.com/) repo 
to a [Github Pages](https://pages.github.com/) site.  In the past few days, I have setup
several repos that will push to Github Pages using the [Travis-CI](https://travis-ci.org/) continuous integration, 
and I wanted to document how easy it is here.

## Create Deploy Key

After the repo is created, the first step is to create a [deploy key](https://developer.github.com/guides/managing-deploy-keys/).

    ssh-keygen -t rsa -b 4096 -C "djw8605@gmail.com" -f deploy-key

Add the `deploy-key.pub` contents to to your repo's settings under Settings -> Deploy Keys.  Be sure to check the "Allow write access".  The deploy key will be used to authenticate the travis-ci build in order to push the website.

We will next have to encrypt the `deploy-key` so we can commit it to our repository safely.

## Encrypt Deploy-key

First, you will need to install the travis command line tools, which is a Ruby Gem.  After installing ruby, you can run the command:

    gem install travis
    
Next, you will need to enable the repo to be build on Travis-CI.  Log into [Travis-CI](https://travis-ci.org/) and go to "Account".  Within this menu, search for the name of your repo, and click to enable it.

![Enable Travis-CI Repo](/images/posts/DocsTravisCI/EnableRepoTravis.png)

Inside the repository's git repo on your own computer, run the command:

    travis encrypt-file deploy-key
    ...    
    openssl aes-256-cbc -K $encrypted_1d262b48bc9b_key -iv $encrypted_1d262b48bc9b_iv -in deploy-key.enc -out deploy-key -d


This will encrypt the `deploy-key` with the Travis-CI public key, therefore it can only be accessed on the Travis-CI infrastructure.  
The above line is very important to remember, you will copy / paste it into the `.travis.yml`.

## Configure Travis-CI

For most of my Travis-CI configurations, I copy from my previous configurations.  Travis-CI is configured in a specially named file in your
repo named `.travis.yml`.  Here is an example configuration that builds [MkDocs](http://www.mkdocs.org/) documentation.

    env:
      global:
      - GIT_NAME: "'Markdown autodeploy'"
      - GIT_EMAIL: djw8605@gmail.com
      - GH_REF: git@github.com:opensciencegrid/security.git
    language: python
    before_script:
    - pip install mkdocs
    - pip install MarkdownHighlight
    script:
    - openssl aes-256-cbc -K $encrypted_1d262b48bc9b_key -iv $encrypted_1d262b48bc9b_iv -in deploy-key.enc -out deploy-key -d
    - chmod 600 deploy-key
    - eval `ssh-agent -s`
    - ssh-add deploy-key
    - git config user.name "Automatic Publish"
    - git config user.email "djw8605@gmail.com"
    - git remote add gh-token "${GH_REF}";
    - git fetch gh-token && git fetch gh-token gh-pages:gh-pages;
    - if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then echo "Pushing to github"; PYTHONPATH=src/ mkdocs gh-deploy -v --clean --remote-name gh-token; git push gh-token gh-pages; fi;

You can see that the `openssl` command that was printed while encrypting is in the `script` section.  Be sure to copy / paste it completely
into your `.travis.yml` file.

This file instructs Travis-CI to:

1. Install mkdocs
2. Decrypt the `deploy-key`
3. Builds the mkdocs documentation.
4. Push the docs to the `gh-pages` branch of the repo.
 


## Commit and be prosperous 

Commit the `travis.yml`, the `deploy-key.enc`.  Be sure not to commit the `deploy-key`.  And everything should be good to go!

The above examples where from the [OSG Security docs](https://opensciencegrid.github.io/security/) [repo](https://github.com/opensciencegrid/security).

[![Build Status](https://travis-ci.org/opensciencegrid/security.svg?branch=master)](https://travis-ci.org/opensciencegrid/security)

