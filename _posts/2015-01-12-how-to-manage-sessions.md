---
title: How to manage sessions
layout: post
date: 2015-01-12 23:30:00
tags: Security 
comments: true
---

Most web application frameworks have some session management system, where session data is stored somewhere - either directly on disk, some in-memory storage (memcached), or some RDB (MySQL).  
Unfortunately I cannot seem to be satisfied with any of them. They all have some aspect which prevent me from being 100% comfortable in using them. 

1. **Disk**  
 This is the most obvious one. You can't save on disk, because it won't scale. Simple as that. That is a deal braker.

2. **In-memory storage (memcached)**  
 This seems to be used quite often. I do not like this, because storing all users' session datas on memcached means that once memcached loses its data, say, by even a simple restart - every single user with their data stored on that node will be considered "Not logged in", and will be bounced back to their login screen.  
And memcached is not designed to guarantee no data loss, so this is bound to happen throughout the history of any application.   
I am not aware of any way to avoid this issue as of now. I mean, if session data can be regenerated purely with client-side data, then what is the meaning of saving it on the server-side, right?  

3. **RDB (MySQL)**
 RDBs are better than in-memory storages because they are not bound to lose data (at least for most of the time). Storing and querying session data on a RDB doesn't sound so bad, since that's what RDBs are designed for - to insert and pull data.  
But the problem is that RDBs can face scalability issues.  
When you have 10 million requests every day, with a query to the sessions table for every single request, that can pile up to become a bottleneck, preventing other operations on the database to slow down.  
So at least a traditional RDB wouldn't work. Maybe if you have a dedicated databse purely for session data that would be okay, but I wish I can avoid adding an extra database to manage into my system. 

---  

So what would be the best way?  
One option may be to use something like Redis, which is an in-memory storage with disk persistence with it. This way I can decrease the impact of the in-memory storage losing data a little. 

But I still am yet to arrive at an answer. 



