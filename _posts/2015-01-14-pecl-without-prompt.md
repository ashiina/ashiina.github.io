---
title: Installing PECL without prompt
layout: post
date: 2015-01-14 23:45:00
tags: PHP Linux PECL DevOps Ansible
comments: true
---

Okay on my [last post](http://ashiina.github.io/2015/01/ansible-commands/) I wrote that the `expect` command to handle PECL install prompt is difficult to put into an Ansible playbook.  
I just figured out a much easier solution.  

```bash
printf "\n" | sudo pecl install zmq channel://pecl.php.net/zmq-1.1.2
```

This will act like an `expect` and automatically send "\n" to any prompt. It cannot send different messages conditionally like `expect`, but if you just want to throw in some Enter-keys, this'll do the job.  

So that's an easy one-liner to include in my Ansible cookbook! 


