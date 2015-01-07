---
title: Amazon VPC or EC2 Classics?
layout: post
date: 2015-01-08 1:20:00
---

I Originally started working with EC2 Classic (as most would), and started to fine-tune the Security Group settings in order to construct a robust network security, and now am working with VPCs.  
I think VPCs are naturally a better choice due to the ease of configuration (being able to modify Security Groups on instances anytime) and the ability to be able to set private IPs in however fashion you want to.

I want to go over private and public subnets of VPCs, and what to think of them, compared to EC2 Classics.

---

### VPC with private subnets

Private subnets are good; They are secure. They hide your internal instances from the rest of the world, in your own little network.  

But most practical use-cases of a server requires some sort of outbound internet connection - whether it be rubygems or yum updates. 
This means that your VPC has to be equipped with a [ NAT instance ](http://docs.aws.amazon.com/en_us/AmazonVPC/latest/UserGuide/VPC_NAT_Instance.html) that'll handle the outbound traffic of your private subnet instances.

Frankly I think NAT instances are bad. It's a SPoF, because once it goes down your application can't perform outbound connections. It's also a potential bottleneck for traffic, since all of your internet traffic goes through that one small instance that just sits there doing nothing. Having an extra EC2 instance to take care of which is a potential SPoF and a bottleneck is VERY stressful.

So, unless your application does not have ANY critical outbound traffic like third-party APIs or github repositories, NAT instances will always be a source of your worries. You can find several solutions to constructing a high-availability NAT instance architecture, like [here](https://cloudkinetics.wordpress.com/2014/04/05/high-availability-for-aws-vpc-nat-instances/) or [here](http://www.raghuramanb.com/2013/03/aws-vpc-nat-instance-failover-high-availability.html), and even Amazon themselves came out with a pattern [here](https://aws.amazon.com/articles/2781451301784570), but for me, implementing these patterns is a hastle in itself unless you really, really want to hide your instances.

--

Luckily Amazon has been providing support for allocating public IPs on instances on public subnets, recently with [Elastic Beanstalk](https://aws.amazon.com/jp/about-aws/whats-new/2014/04/09/aws-elastic-beanstalk-announces-vpc-public-ip-support/) too. So how about that?

---

### VPC with public subnets

Since instances in public subnets can have public IPs, they are capable of outbound internect connection from the start.  
It is a pretty convenient solution.  

But that means that you have an instance which: 

* Has a public IP (= can be discovered from the internet)
* Has all internet traffic going in&out with no filter, through a Internet Gateway

In my opinion, that sounds pretty similar to just having an EC2 Classic instance just sitting on the internet.

---

### EC2 Classic

EC2 Classic instances have public IPs attached to them from when they are launched, and they just communicate with the internet on their own.  
The Security Group configurations allow them to become a secure, closed node, or a node with all ports wide open.  

I'll go over a secure and clean configuration of EC2 Classics in another post.


---  

So basically it becomes a trade-off of either
1. Closing off your instances in a private subnet, and trying to maintian a high-availability NAT instance
2. Using public subnets + public IPs, which are pretty much the same as EC2 Classics in terms of network security

You should think about this trade-off before naively choosing one or the other, or choosing to use EC2 Classics.  
But if public subnets + public IP instances are similar to EC2 Classics, why not just go with the VPC?  

I think that would be my position. 


