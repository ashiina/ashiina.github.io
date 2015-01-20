---
title: Lambda - Thoughts on some use-cases
layout: post
date: 2015-01-20 22:43:00
tags: AWS Lambda 
comments: true
---

I was exploring some use-cases of Amazon Lambda. Being able to cut out EC2 from a techonology stack is very potent in cutting down operations cost and reducing complexity. 
Liberating developers from having to manage Linux boxes will be a groundbreaking progress in web application development.  

The thing with Lambda is that it is an event-driven code execution paradigm, so I can **SEND** input data(events) into it to have it perform operations, but I cannot **GET** (fetch) data. And since a typical application required CRUD(Create-Read-Update-Delete), not having the *Read* is not enough.  

... Well, is that so? Yes, it is asynchronous, but what if I can send a custom event of something like:  

```json
{
	"action": "get",
	"id": "100",
	"notify_id": "12345"
}
```

Inside the Lambda function, I can fetch some data from some database(RDS or DynamoDB) with the id `100`. Since it is asynchronous I cannot return the request, I can have the client be long-polling on an Amazon SQS queue. 
Then just have the Lambda function publish an event onto the SQS queue, and the client can do whatever it should upon receiving that.  

So there, we can create a request-response flow using Amazon Lambda and SQS.  

The issue then would be that each user will have to have their own SQS Queue, so you will be managing many, many queues. But as for now [I believe there are no limits to the number of queues you can create on SQS](http://aws.amazon.com/sqs/faqs/#How_big_can_Amazon_SQS_queues_be), so it shouldn't be that much of a problem.

This seems fun, so maybe more on this a little later. I would want to try and implement the request-response example just as a Concept of Proof. 


