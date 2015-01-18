---
title: Lambda-local - A local executor for Amazon Lambda
layout: post
date: 2015-01-18 17:00:00
tags: AWS Lambda node.js
comments: true
---

Developing Amazon Lambda function scripts on my local machine is a hassle. There are work-arounds, but it required me to write dirty, ad-hoc code. 
So I took some time to develop a node commandline tool called **Lambda-local** , that'll execute your Lambda functions on your local machine, with whatever sample event data you want to feed it.  

[https://github.com/ashiina/lambda-local](https://github.com/ashiina/lambda-local)  

Just install with

```bash
npm install -g lambda-local
```

and use it with

```bash
lambda-local -l index.js -h handler -e event_samples/s3-put.js
```

You can feed any even data (JSON object) into the `-e` option.  
I also added a `-t (--timeout)` option which let's you set your own timeout limit in seconds. 

### Goals

The goal of this script is for devleopers to not have to write even 1 line of extra code in order to run their Lambda functions on their local machine. 
I thought it should all be handled by a simple command.  
My further goal is to emulate whatever environment Amazon has set up on their Lambda console - Which includes:   

 * Feeding sample event data
 * Setting a timeout limit
 * Setting a memory limit

I have two out of three (although the timeout part is still pretty rought). I want to try and implement a memory limit, maybe even just a warning.  

### Things I want to fix

Since the AWS console lets you load the `aws-sdk` module without installation, I wanted to emulate that.  
The only solution I have now is to add Lambda-local's `node_modules` path to the `$NODE_PATH` env variable, as well as your AWS credentials.  
It would be great if I can have the lambda-local handle that automatically, but currently the users have to `export` manually.  
I wish there is a better solution for this. 


--

If AWS comes out with their own Lambda-local tool this will become obsolete, but until then, it's a simple & independent tool that doesn't require any learning curves and any additional code/configuration on your existing Lambda function scripts, so I think it's not too bad for a start. 

Personally I think Amazon Lambda has a great amount of potential, so I believe it's important to have a **dead-easy** development environment for it, rather than having to upload your script/zip everytime. Hell, you don't even have to sign up for Lambda to play with Lambda.

So please try it out, fork it, or give me any feedback!


P.S. This was also my first time to write and publish a `npm` module. It was quite fun, and the publishing process is surprisingly easy. I really like it :)  



