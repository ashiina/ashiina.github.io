---
title: Amazon EC2 Classic - Security Group best practice
layout: post
date: 2015-01-08 1:40:00
tags: AWS Security
comments: true
---

Here is an example for a descent Security Group set up, for those of you who use EC2 Classics.  
It will provide you with a certain amount of security, but be aware of the risks.  
And as I wrote in the [previous port](http:..ashiina.github.io/2015/01/aws-vpc-or-ec2-classic/), since VPC public subnet+publicIP instances give you more freedom for configuration and are pretty much similar in terms of security, you can go ahead and choose VPC.  

This example also can be used in that VPC setting too, so should be useful either way.  
  

 *Disclaimer: This may still have some security holes. Please leave comments if you have anything to say about them.*

---  

#### Setting up a descent Security Group with EC2 Classic instances

Let's say you are building a regular web application which gets accessed from HTTP(80) and HTTPS(443).  
It'll have multiple application instances behind a Load Balancer (ELB), and also a RDS database (MySQL) also.

First you want to setup your **Gateway instance** - the instance that'll be able to SSH to the actual application instances.  
It should only allow access from your IP, whether it is your Office network IP or your mobile Wifi. It's also a good idea to modify the SSH port of this instance to something other than the default 22. 
So it can have a Security Group as such:

| Port Range | Source    |
|------------|-----------|
| 62222      | (Your IP) |

--  

(Remember to modify your sshd configuration so that it accepts 62222 as the SSH port)  
We'll call this `sg-gw` .  

Next, configure your application instances' Security Group. Your application instances should allow SSH from your Gateway instance, and allow HTTP/HTTPS access from your ELB. Nothing else.  
Assume that your ELB has a Security Group called `sg-elb` (You can easily check your ELB's Security Group by going to your management console and viewing the description of the Load Balancer).  

| Port Range | Source    |
|------------|-----------|
| 80         | elb-sg    |
| 443        | elb-sg    |
| 22         | sg-gw     |

--  

Notice that you can set the Source as a particular Security Group. This way, you can guarantee that ONLY instances with that Security Group is allowed to access that port. Pretty useful and easy, right?  
This Security Group will be called `sg-app` .

The final piece is your Security Group for your RDS MySQL. It should only allow access from your application instances, so:

| Port Range | Source    |
|------------|-----------|
| 3306       | sg-app    |

-- 

That's all you need.

--

Now finally write whatever app it is,  have it connect to your RDS, and attach however many application instances you want with `sg-app`.

--  

--  

**So what have we got.**  
We've got ourselves a production-ready application, with very tightly closed ports.  
That's not too bad for just setting some easy Security Groups, is it?  

Some potential security risks of this architecture may be:

* Exposing a public IP (All EC2 Classics automatically have a public IP) so can be discovered by anybody on the internet
* All HTTP/HTTPS traffic comes in from the ELB, and can include malicious packets that take advantage of software vulnurabilities
* The Gateway instance can be compromised

The attacker will be able to access any of your nodes once they get into the Gateway instance, so be careful there.  
I would say that you should be ready to destroy & re-launch your Gateway instance at anytime, since it isn't directly critical to your application.  
If your Gateway instance seems to be compromised, immediately shut it down, and launch it again with a new SSH key.  

I hope I'm not missing any important points. I'm not an expert on network security, and I'm not fully aware of, say, what you can do just by knowing the IP even if ports are closed. 



