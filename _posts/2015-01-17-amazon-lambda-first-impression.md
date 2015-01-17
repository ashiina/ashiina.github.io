---
title: Amazon Lambda - S3 to RDS 
layout: post
date: 2015-01-17 23:45:00
tags: AWS Lambda S3 RDS MySQL
comments: true
---

I had an opportunity to try out Amazon Lambda at a Hackathon today. It was pretty fun, but unfortunately couldn't finish it in time.  

I like the concept of Lambda a lot - A relatively simple manipulation of streaming data shouldn't require you to set up an EC2 instance and write your own script. There's unnecessary overhead (actually setting up the instance; Installing required packages and stuff), and it's just not scalable.  

Lambda gives you a place to just "write and run code on the cloud". It's a big, bold leap from the world where business logic had to be implemented on EC2.  

**Input data from S3, send to RDS**  
What we've done is that we had data files being uploaded into an S3 bucket, and we wanted to process that data and store it into RDS(MySQL). Using Lambda, that was a relatively easy task to implement. I couldn't get it right due to some permission problems of the Lambda execute and invoke, but once I tried again after I got home, I was able to easily make it work.  

I've put the source here:  
https://github.com/ashiina/aws-lambda-rds-sample

It's basically using the usual MySQL module for node.js, and processing/inserting the data coming from S3. I'll go over some important parts in writing this.  

First is handling the content of the S3 data. Be be sure to cast the body of the data with `String()` for most usual file types.  

```js
...
	s3.getObject({Bucket:bucket, Key:key}, function(err,data) {
		if (err) {
			console.log('error getting object ' + key + ' from bucket ' + bucket + ' ::: '+err);
		}
		else {
			var rawData = parseInt(String(data.Body).trim());
...
```
Once you get that, just insert like any other node.js script:  

```js
...
	Processor.connection.query("INSERT INTO `processed` SET val=?, created_at=?",
		[ data.val, data.created_at],
		function(err, info){
			console.log("insert: "+info.msg+" /err: "+err);
		}
	);
...
```

I think Lambda still has a lot of potential in what we can do. Writing whole applications with Lambda isn't even a far-fetched idea.  

The only problem using Lambda is the inefficiency of debugging code - I have to run it through the server to actually get sample data into `event.handler()`. I want to write a module that can invoke `event.handler()` on your local node.js, along with a sample event and context data. Maybe I'll find some time to write it myself...  



