---
layout: post
title: "LetsEncrypt for Multiple Hosts"
date: "2019-10-11 14:38:14 -0500"
tags:
  - osg
author: "Derek Weitzel"
---

Using [LetsEncrypt](https://letsencrypt.org/) for certificate creation and management has made secure communications much easier.  Instead of contacting the IT department of your university to request a certificate, you can skip the middle man and generate your own certificate which it trusted around the world.

A common use case of certificates is to secure data transfers.  Data transfers that use the GridFTP, XRootD, or HTTPS transfer protocols can load balance between multiple servers to increase throughput.  [keepalived](https://www.keepalived.org/) is used to load balance between multiple transfer servers.  The certificate provided to the clients need to have the virtual host address of the load balancer, as well as the hostname of each of the worker nodes.


1. Create a shared directory between the data transfer nodes
2. Install httpd on each of the data transfer nodes
3. Configure httpd to use the shared directory as the “webroot”
4. Configure `keepalived` to use virtualize port 80 to at least 1 of your data transfer nodes.
5. Run certbot with the webroot option, as well as the multiple hostnames of the data transfer nodes.

Create a NFS share that each of the data transfer nodes can read.  The steps in creating a NFS shared directory is outside the scope of this guide.  In this guide, the shared directory will be referred as `/mnt/nfsshare` . Next, install httpd on each of the data transfer nodes:

    root@host $ yum install httpd

Create a webroot directory within the shared directory on one of the nodes:

    root@host $ mkdir /mnt/nfsshare/webroot

Configure httpd to export the same webroot on each of the data transfer nodes:

    <VirtualHost *:80>
        DocumentRoot "/mnt/nfsshare/webroot"
        <Directory "/mnt/nfsshare/webroot">
            Require all granted
        </Directory>
    </VirtualHost>

Configure `keepalived` to virtualize port 80 to at least one of your data transfer nodes.
Add to your configuration:

    virtual_server <VIRTUAL-IP-ADDRESS> 80 {
        delay_loop 10
        lb_algo wlc
        lb_kind DR
        protocol tcp
    
        real_server <GRIDFTP-SERVER-#1-IP ADDRESS> {
            TCP_CHECK {
                connect_timeout 3
                connect_port 80
            }
        }
    }

Run `certbot` with the webroot options on only 1 of the data nodes.  The first domain in the command line should be the virtual hostname:

    root@host $ certbot certonly -w /mnt/nfsshare/webroot -d <VIRTUAL_HOSTNAME> -d <DATANODE_1> -d <DATANODE_N>...


