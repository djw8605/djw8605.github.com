---
title: "XRootD Client Manager"
date: "2020-10-11 00:00:00 -0500"
tags:
  - osg
  - iris-hep
author: "Derek Weitzel"
---

The validation project for XRootD Monitoring is moving to phase 2, scale
testing.  Phase 1 focused on correctness of single server monitoring.  [The
report](https://doi.org/10.5281/zenodo.3981359) is available.

We are still forming the testing plan for the scale test of XRootD, but a
component of the testing will be multiple clients downloading from multiple
servers.  In addition, we must record exactly how much data each client reads
from each server in order to validate the monitoring with the client's real behavior.

This level of testing will require detailed coordination and recording of client
actions.  I am not aware of a testing framework that can coordinate and record
accesses of multiple clients and servers, therefore I spent the weekend
developing a simple framework for coordinating these tests.

Some requirements for the application are:

- Easy to use interface
- Easy to add clients and servers
- Authenticated access for clients, servers, and interface
- Storage of tests and results

I chose [Heroku](https://heroku.com) for prototyping this application.

## Interface

The web interface is available at https://xrootd-client-manager.herokuapp.com/.
I chose to host it on heroku as it is my go to for pet projects.  I will likely
move this over to OSG's production kubernetes installation soon.  The entire
application is only the web interface and a back-end [Redis](https://redis.io/)
data store.

{% include figure image_path="/images/posts/XRootDClientManager/Interface.png"
alt="Screenshot of web interface" caption="Screenshot of simple web interface"
%}

The web interface shows the connected clients and servers.  The web interface
also connects to the web server with an persistent connection to update the list
of connected clients.

## Client Communication

Client communcation is handled through a Socket.IO connection.  Socket.IO is a
library that will at create a bi-directional event based communcation between
the client and the server.  The communcation is over websockets if possible, but
will fall back to HTTP long polling.  A good discussion of long polling vs.
websockets is available from
[Ably](https://www.ably.io/blog/websockets-vs-long-polling/).  The Socket.IO
connection is established between each worker, server, and web client and the
web server.

The difficult part is authenticating the Socket.IO connections.  We discuss this
in the security session.

## Security
Securing the commands and web interface is required since the web interface is
sending commands to the connected worker nodes and servers.

### Socket.IO Connections

The Socket.IO connection is secured with a shared key.  The communication flow
for a non-web client (worker/server):

1. A JWT is created from the secret key.  The secret key is communicated through
   a separate secure channel.  In most cases, it will be through the command
   line arguments of the client.  The JWT has a limited lifetime and a scope.
2. The client registers with the web server, with an Authentication bearer token
   in the headers.  The registration includes details about the client.  It
   returns a special (secret) `client_id` that will be used to authenticate the
   Socket.IO connection.  The registration is valid for 30
   seconds before the `client_id` is no longer valid.
3. The client creates a Socket.IO connection with the `client_id` in the request
   arguments.

### Web Interface

The web interface is secured with an OAuth login from GitHub.  There is a whitelist
of allowed GitHub users that can access the interface.

The flow for web clients connecting with Socket.IO is much easier since they are already authenticated
with OAuth from GitHub.

1. The user authenticates with GitHub
2. The Socket.IO connection includes cookies such as the session, which is a
   signed by a secret key on the server.  The session's github key is compared to the
   whitelist of allowed users.


## Storage of tests and results

Storage of the tests and results are still being designed.  Most likely, the
tests and results will be stored in a database such as Postgres.

# Conclusions

[Heroku](https://heroku.com) provides a great playing ground to prototype these
web applications. I hope that I can find an alternative eventually that will run on
OSG's production kubernetes installation.

The web application is still be developed, and there is much to be done before
it can be fully utilized for the scale validation.  But, many of the difficult
components are completed, including the communcation and eventing, secure web
interface, and clients.

The GitHub repos are available at:

- [XRootD Client Manager](https://github.com/djw8605/xrootd-client-manager)
- [XRootD Client](https://github.com/djw8605/xrootd-ws-client)
