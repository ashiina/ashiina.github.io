---
title: Don't experiment in a live environment
layout: post
date: 2015-02-18 23:00:00
tags: General
comments: true
---

This is a motto I carry when architecting/coding for my business.  

**Don't experiment on a live environment .**  
**Production is not a sandbox.**  

It may sound obvious when writing it out in words like this, but I come across many cases, and I myself am guilty of this too.  
People many times try new things - whether it is using a new library/middleware, trying a new design pattern, or even trying a new way of structuring your classes - on the production environment, before being confident enough with the code.  
This kind of behavior is especially prevalent when jumping on a bandwagon of a new, hip software (back in the early days of node.js, for example). 

I don't mean people write code INSIDE the production environment.  
I mean, for whatever service or application you are providing to your users, you shouldn't try anything new on those users, in terms of engineering.  
It's a great idea to experiment a lot on your users, in terms of business and UI. But for engineering, I don't believe that that's the case.  

Engineering is a tool to achieve some sort of goal; Most times a business goal towards your users. As engineers, we have to be perfectly confident with the type of technology we use in order to achieve these goals.  
**Experimenting** with new technologies and new engineering methods in a situation where we are supposed to be confident with our technology, is NOT a good idea.  

--  

Two big reasons will be:  

### 1. Maintainability  
  Obviously. If you aren't confident with your code (or middleware/library you use), chances are you will run into problems in the future. And chances are, you won't be able to deal with those problems. Or you may want to run away to an alternative, but the switching cose may be too high.  

A code-base is not a "write once and it's over" type of game. We live with our code.  
  **We have to treat code like an asset, not a submission.**

### 2. Opportunity Cost
  Most engineering problems have more than one answer. If you aren't confident with the option you are choosing, there is a high possibility that you are missing out on a far more effective alternative solution to the problem.  
  Analyzing each and every solution to a problem thoroughly not only prevents this kind of opportunity cost, but it also allows you to understand the problem itself deeper.  

---    

###*"Well then how do we innovate on engineering?"*  
Conduct experiments in a sandbox. Try things, throw away things, measure performances - do all those things BEFORE you decide to marry yourself to a particular solution.  
That's all. That's what sandboxes and devleopment environments are for. That's why the industry is coming up with efficient scrap-and-build environments like Docker and Vagrant.  

--  





