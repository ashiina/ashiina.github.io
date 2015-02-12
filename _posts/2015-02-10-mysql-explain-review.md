---
title: MySQL EXPLAIN Review
layout: post
date: 2015-02-10 16:00:00
tags: MySQL RDS
comments: true
---

I've been tuning our production MySQL server (RDS), and I had to refresh some of my memory about how to analyze the `EXPLAIN`. Reading and understanding this correctly can really help improve your MySQL performance.  

Here's a sample output:  

```mysql
mysql> explain select * from tablea where id = 10;
+----+-------------+--------+-------+---------------+---------+---------+------+------+-------------+
| id | select_type | table  | type  | possible_keys | key     | key_len | ref  | rows | Extra       |
+----+-------------+--------+-------+---------------+---------+---------+------+------+-------------+
|  1 | SIMPLE      | tablea | const | PRIMARY       | PRIMARY | 4       | NULL | 1    | Using where |
+----+-------------+--------+-------+---------------+---------+---------+------+------+-------------+
```

### select_type
In our case, we hardly use subqueries or `join`s on our production application, so out `select_type` will most likely be `SIMPLE`. Other select_types can be found [here](http://dev.mysql.com/doc/refman/5.0/en/explain-output.html#explain_select_type).  


### type
The `type` tells us how the rows are being fetched. `const` is one of the best cases, where only one row is found. In our case we are using `where id = 10`, where the `id` is our primary key. Selecting for an exact comparison on primary keys usually get you a `const` type.  


### possible_keys 
This lists all the possible indexes which the engine can use. We shouldn't care for this too much, because what matters is what ACTUALLY is used.  


### key
The actual key used. This will be only one of the `possible_keys`, or even not included in them. What key is used can change according to the size of the data, so don't count on the result of this being idempotent just because you have the same table schema. 


### ref 
I don't worry about this too much when I am not joining or doing anything fancy. 


### rows
This lets us know how many rows are estimated to be examined. This is a really important number; A large number of rows can mean trouble. 

---  

So, what I would do is, I would look at the `type`. If that's an `index` or an `ALL`, it's usually not good. 
I then look at the `key` to see that an appropriate index is being used.  
Lastly I look at `rows` to see the number of rows being examined.  

We want to fiddle with different indexes, and different query patterns, in order to see what query would have the best `EXPLAIN`. Many times it can mean adding an extra `where` clause to narrow down the condition or to nudge the engine to use a particular index.  
Other times, you will need to design and add an index. (doing `ALTER TABLE` to add index can be extremely expensive, so be very careful with doing this on a live database). 

--  

This can be a quick reminder for how to deal with query optimizations. 





