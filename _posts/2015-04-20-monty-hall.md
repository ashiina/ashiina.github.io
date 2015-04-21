---
title: Monty Hall Simulation
layout: post
date: 2015-04-20 23:00:00
tags: Python Statistics
comments: true
---

I never could understand the reasoning behind the [Monty Hall Problem](http://en.wikipedia.org/wiki/Monty_Hall_problem). Well, I could understand the reasoning, but I couldn't grasp the notion of how this can be true in real life.  

There is a famous argument to this problem where it says "What if, right after the host opens one door, an alien appears from no where who has no prior information. Wouldn't the probability for choosing either door be 50/50 for it?". And I thought that was a very sound argument.  

I decided to test it in real life with some python. Coincidentally this is *Monty Python* :)  
So here's my code:  

[https://github.com/ashiina/montyhall](https://github.com/ashiina/montyhall)  

Yep, and as expected, the simulation always gives me an result of a 66.6% chance of success - Not 50%.  

```
$ python run_montyhall.py y 100
{'Wrong': 35, 'Correct': 65}
```  

So it seems like I will have to just go with the reasoning here.  
Interesting.  



