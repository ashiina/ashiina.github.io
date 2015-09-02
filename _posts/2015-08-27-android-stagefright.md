---
title: Thoughts on the Terrible Android Vulnerability
layout: post
date: 2015-08-27 12:00:00
tags: Android Security
comments: true
---

As many people are already aware from various news outlets, Android has a nasty vulnerability that allows remote code execution by **simply receiving a MMS**.  
The other day, this video has been finally released - it's the Black Hat presentation of the actual guy who discovered the vulnerability. He goes into great detail of how he found the vulnerability and how he discovered various attack vectors by tracking where StageFright is being called.  
It's a very interesting video so please watch (Black Hat videos are always really insightful).

<iframe width="560" height="315" src="https://www.youtube.com/embed/71YP65UANP0" frameborder="0" allowfullscreen></iframe>
<br>

---  

Now, this issue really troubles me. Not the vulnerability itself - of course it's bad, but hey let's face the truth, all OS (all software even) has some sort of vulnerability, and that's why there are updates and patches. Nobody is to blame for the bug itself.  

## What's the Problem?  

The problem is that the patch for this vulnerability has not reached enough people, and will never reach enough people who are affected. 
The reason is simple - It's because there are too many layers in between Google, and the end user.  

This is an article telling us about Verizon pushing the updates out for several Samsung devices.  
http://www.ubergizmo.com/2015/08/galaxy-s4-gets-stagefright-fix-on-verizon/  
http://www.tmonews.com/2015/08/samsung-galaxy-s4-getting-an-update-with-stagefright-patch/  

So there is  
 1. Google (OS developer)  
 2. Samsung (manufacturer)
 3. Verizon (phone carrier)  
 4. End-user  

So first, even if Google fixes its bug and releases a patch, the manufacturer has to incorporate it into their version of the OS. 
Since Android is an open-sourced OS, the manufacturer can fiddle with its code all they want, and therefore these types of fixes have to be done by the manufacturer, not Google.  
And the manufacturers have different flavors of the OS depending on the phone carrier too. Samsung has to release an updated OS for Verizon's Samsung S4, as well as T-Mobile's Samsung S4. And if you know anything about releasing OS, you would know that it's no easy task testing and releasing an update for an OS.  

So this model of distribution is TOO long for a critical security update. As you can see in the articles above, the Verizon Samsung patch took roughly 2 weeks since the discovery of the bug, and the T-mobile Samsung took almost a month. And obviously these are not the only devices existing in the world, so there are A LOT more devices affected, where either the manufacturer or the phone carrier has not done its job and release the patch yet.  
As of today, in Japan, I am not able to find even one phone carrier that has released a patch for this. It is terribly unfortunate, and it's a pretty good deal for any malicious hackers who want to take `root` of your phone.  

## What Can They Do?  

Frankly, I don't know. I understand Google's philosophy of open-sourcing Android, and I'm sure there has been a lot of benefits to that decision (especially in competing with iOS). But there has to be a realization that this model is fundamentally broken, and it will be detrimental to all stakeholders in that chain. There will be more vulnerabilities like this in the future, and that's a fact as long as Android keeps on evolving. And when this kind of negligence against security is left, it will cost Android(Google) their brand image and customer loyalty.  

I like the Windows model where they don't let manufacturers touch the OS itself, and only allow applications to sit on top of it just like any other third party. I was entertaining myself with the idea of Android not open-sourcing their AOSP, and distributing their OS as a freeware instead of an open-source, but I'm sure that's not the best idea.  

I just believe that the first step is acknowledging that this is a broken model, and SOMETHING has to be done.  



