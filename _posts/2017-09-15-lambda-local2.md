---
title: Where lambda-local is going
layout: post
date: 2017-10-10 22:00:00
tags: Lambda AWS
comments: true
---

The word **Serverless** has been gaining more and more traction over the years since the introduction of Amazon Lambda, and many similar products like Google's Firebase Cloud Functions are also getting a lot more attention.  
I think that is why my library, `lambda-local`, is getting more
attention lately too.  

[https://github.com/ashiina/lambda-local](https://github.com/ashiina/lambda-local)  

## In Numbers

 * 6,630 downloads (only within September 2017)
 * 316 stars
 * 16 contributors
 * 47 merged Pull requests

I've been very busy the past year or so with my startup growing in size, and haven't been able to put enough effort into nurturing this library. I've been receiving pull requests, issues, and emails, trying to do my best to respond to them. Thank you everybody for making `lambda-local` better.  

## Features

A lot of features have been added by many people, since I first started coding for this library. We tried to pursue the evolution of Amazon Lambda itself.

 * Usage as an importable node.js module
 * AWS region configuration
 * Support for environment variables


## Going from Here

So where do I want to take `lambda-local` ? My Simple answer - **I want to keep it as simple as possible** .
Over the years, there are feature-rich serverless frameworks such as [Serverless](https://serverless.com/), [Apex](http://apex.run/), etc.
There also is a lighter library  [node-lambda](https://github.com/motdotla/node-lambda) too.
All of these take care of local execution, packaging, and deployment of the code.

These are all great libraries with great features, and there is no reason for `lambda-local` to mimic their paths.  
I want `lambda-local` to stay as a super simple tool where you can simulate the node execution of a lambda function in an instant.  
I want these two lines to be all anyone needs to do when they first think "I wish there is a tool to execute Lambda functions locally" :

```bash
$ npm install -g lambda-local
$ lambda-local -l index.js -e event.js
```

Being able to programatically execute lambda locally is also a big plus. Lambda functions become testable modules now.

```javascript
lambdaLocal.execute({
    event: jsonPayload,
    lambdaPath: 'index.js'
})
```

This simplicity and modularity should continue to be at the core of `lambda-local`, and that will be the value it provides in a world of awesome serverless frameworks.
