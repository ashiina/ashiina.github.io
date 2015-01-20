---
title: Lambda - Thoughts on some use-cases
layout: post
date: 2015-01-20 22:43:00
tags: AWS Lambda 
comments: true
---

I was exploring some use-cases of Amazon Lambda. Being able to cut out EC2 from a techonology stack is very potent in cutting down operations cost and reducing complexity. 
Liberating developers from having to manage Linux boxes will be a groundbreaking progress in web application development.  

The thing with Lambda is that it is an event-driven code execution paradigm, so I can **SEND** input data(events) into it to have it perform operations, but I cannot **REQUEST** (fetch) data. And since a typical application required CRUD(Create-Read-Update-Delete), not having the *Read* is not enough.  

... Well, is that so? Yes, it is asynchronous, but what if I can send a custom event of something like:  

```json
{
	action: "get",
	id: 100,
	notify_id: 12345
}
```

Inside the Lambda function, I can fetch some data from some database(RDS or DynamoDB) with the id `100`. Since it is asynchronous I cannot return the request, I can have the client be long-polling on an Amazon SQS queue. 
Then just have the Lambda function publish an event onto the SQS queue, and the client can do whatever it should upon receiving that.  

So there, we can create a request-response flow using Amazon Lambda and SQS.  

Of course the problem here will be that it is not a viable architecture when 100 people are long-polling on the same queue - so it is only realistic for one user.   

Only if there are any other managed services that let's you push messages to the client...  
Well, SNS for mobile.  


But this seems fun, so maybe more on this a little later. I would want to try and implement the request-response example just as a Concept of Proof. 


