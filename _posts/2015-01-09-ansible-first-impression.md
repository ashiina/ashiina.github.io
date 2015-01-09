---
title: Ansible - First Impressions
layout: post
date: 2015-01-09 00:15:00
tags: DevOps Ansible
comments: true
---

I took some time to try out a few provisioning tools - **Ansible**, **Chef**, and **Puppet** in particular - and I like Ansible a lot, I like it most.  


The main reason I'd go with Ansible is its simplicity.  
Install is dead simple, just  

```bash
yum install --enablerepo epel ansible
```

and you are done. Without any extra configuration, you can go ahead and test reachability to the node you want to provision by a ping.  
Say the IP of the node you want to provision is `192.168.10.10`.

```bash
ansible 192.168.10.10 -m ping 
```

The only requirement Ansible needs to provision with the node is:
* Be able to SSH with the target user
* The target user has the correct permission to perform commands in the node

If you need to specify a private key,

```bash
ansible 192.168.10.10 --private-key /path/to/private-key -m ping 
```

There.  
It's the type fo simplicity that I love. I don't want to have to think about "What do I have to install in the node?" "Is the agent installed in the node running correctly/with the correct version?" . Especially when I am having some sort of trouble setting up a server, that is the last thing I want to think about.  

 **"Can I perform these commands in the server? Can I SSH to that server?" is all I want to ask myself.**

--

Playbooks are also simple; You just write YAMLs in a certain structure. 

```yaml
# webservers.yml
---
- hosts: webservers
  sudo: yes
  tasks:
    - name: Install apache
      yum: name=httpd state=installed

    - name: Ensure apache is started
      service: name=httpd state=started
```

Define your hosts group like this, inside `/etc/ansible/hosts`

```
# /etc/ansible/hosts
[webservers]
192.168.10.10
192.168.10.11
```

And just run

```bash
ansible-playbook webservers.yml
```

Just like that, and you got yourself an Ansible setup that'll install Apache and ensure that it's running. 
As you can see, you don't need any extra effort to learn languages. (Of course you need to learn the specific parameters within writing a playbook, but that goes for any provisioning middleware, and pretty much any middleware with configurations).  

--

I'm still playing around with this and haven't introduced it into my production environment, but I would eventually want to write up some script that'll take my existing EC2 instances and create a ansible hosts file based on their tags. I see there are a lot more I can do with Ansible.





