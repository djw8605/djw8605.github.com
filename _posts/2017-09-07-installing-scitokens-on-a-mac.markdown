---
title: "Installing SciTokens on a Mac"
date: "2017-09-07 13:20:04 -0500"
author: Derek Weitzel
tags:
  - scitokens
  - data
---

In case I ever have to install [SciTokens](https://scitokens.org/) again, the steps I took to make it work on my mac.  The most difficult part of this is installing openssl headers for the jwt python library.  I followed the advice on this [blog post](https://solitum.net/openssl-os-x-el-capitan-and-brew/).

1. Install [Homebrew](https://brew.sh/)
2. Install openssl:

        brew install openssl

3. Download the SciTokens library:

        git clone https://github.com/scitokens/scitokens.git
        cd scitokens
        
4. Create the virtualenv to install the [jwt](https://jwt.io/) library

        virtualenv jwt
        . jwt/bin/activate
        
5. Install jwt pointing to the Homebrew installed openssl headers:

        env LDFLAGS="-L$(brew --prefix openssl)/lib" CFLAGS="-I$(brew --prefix openssl)/include" pip install cryptography PyJWT
        

