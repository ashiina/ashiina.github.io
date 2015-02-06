---
title: Updating & Rebooting Production Server Securities Efficiently
layout: post
date: 2015-02-03 22:30:00
tags: AWS Security Linux EC2
comments: true
---

The [GHOST vulnerability last week](http://ashiina.github.io/2015/01/ghost-vulnerability/) required me, as well as many other developers to update and reboot our servers. For services that have like 50 application servers behind a load balancer, this can be pretty tiresome.  

As an AWS user, I haven't cracked the answer to fully automating this task, but I have made it somewhat easy using some AWS CLIs.  

I put together a rather crude script:

[https://github.com/ashiina/aws-ec2-instance-maintainer](https://github.com/ashiina/aws-ec2-instance-maintainer)  

It helps you easily perform the following tasks:  
1. Detach an instance from the ELB
2. Remotely xecute a command on the instance
3. Reboot the instance
4. Attach the instance to the ELB

It takes the `instance_id` and a `step` number as an argument. So a typical use-case would be like this:  

```bash
$ ./instance-maintainer.sh i-1234abcd 1 #detach from ELB
$ ./instance-maintainer.sh i-1234abcd 2 "yum --security -y update" #perform yum update
$ ./instance-maintainer.sh i-1234abcd 3 #reboot
$ ./instance-maintainer.sh i-1234abcd 4 #attach to ELB
```

Since this is still a very crude and immature script, the developer must manually execute each step of the script. I wish I can automate all of this, but there are a few bumps to clear.  

-- 

1. When you run the `deregister-instance-from-load-balancer`, it takes a little while until there are no more requests coming in. I need to be able to be sure with that timing, otherwise I may be performing commands on step 2 that will affect incoming requests.  
   Maybe I can just have the script `sleep` for a certain time between step 1 and 2, but the sleep time would be completely arbitrary and wouldn't provide a 100% confidence.  

2. After rebooting the instance, there isn't a way to know when an instance successfully rebooted. I will need to insert some script *inside* the instance to notify me when the reboot procedure is complete; Yeah that's okay if you don't mind embedding that kind of scripts into all of your instances, but for me, I want this script to be able to work without fiddling inside the target instances.  
   Alternatively, I can execute 
```
$ ./instance-maintainer.sh i-1234abcd 2 "ps ax | grep httpd" 
```
or something of that sort in a certain interval, in a sense "polling" for the correct process to be up and running. It's kind of dirty, but can be a workaround. 

-- 

So this script will be a very elementary building block for automating instance maintainance - Most likely it'd be better to write a script that performs the 1 ~ 4 of the script in whatever combination you want it to, while having various code to let the script know when to proceed to the next step.  





