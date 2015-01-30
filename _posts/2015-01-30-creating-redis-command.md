---
title: Creating my own Redis command - ZGTSCORE
layout: post
date: 2015-01-30 23:45:00
tags: Redis
comments: true
---

## Intro
As a part of my effort of trying to gain more knowledge in C-written middlewares, I have been looking into Redis for the past few days. I've heard that it's relatively neatly written and easy to read, so I was giving it a try.  
The core modules like networking and event-looping are still too complex for me to wrap my head around, but the implementation of commands are pretty straightforward and extremely easy to comprehend. I was surprised with how easy I was able to read and write through it, even though I suck at C.  

So I've went into the source code and added a command, after reading through a nice tutorial [here](http://www.starkiller.net/2013/05/02/hacking-redis-adding-a-command/).

## What I've Made - ZGTSCORE

I made a simple command named `ZGTSCORE`. It's a command for sorted sets.  
By with the command `ZGTSCORE <key> <score>`, you can get values of the `<key>` sorted set which is specifically *greater than or equal to* the `<score>`. This command will be useful when you are using a sorted set as a chronological list, with the score being the timestamp, in a use-case where you want to get data newer than a certain timestamp (checking for updates).  

So here's my work, with my branch. 

[https://github.com/ashiina/redis/tree/ashiina/zgtscore](https://github.com/ashiina/redis/tree/ashiina/zgtscore)


## Implementation 

### 1. Add command to `redisCommandTable`  
  This is the first step. Redis has all its commands neatly organized in the `redisCommandTable` inside `src/redis.c`, with flags and parameters. I added my command:

```c
{"zgtscore",zgtscoreCommand,3,"r",0,NULL,1,1,1,0,0}
```

### 2. Function Declaration

Declare your function with the name you speficied above, in `redis.h`. All redis command functions only take one argument, `redisClient *c`. As you will see later, the command arguments and everything are all stored in there. 

```c
void zgtscoreCommand(redisClient *c);
```

### 3. Write `zgtscoreCommand()`

I start writing `zgtscoreCommand()` in `src/t_zset.c`, since it's a sorted set command.  
Here, rather than directly implementing this function, I'm going to call another function inside: `zcompscoreGenericCommand(redisClient *c, int reverse)`.  

This is a design pattern I was seeing in `src/t_zset.c` with some of the other methods - They wrap a generic function which gets data in a certain manner, and just flips the direction with the `reverse` argument. I might want to implement a `ZLTSCORE` (get data with values less than score), so I decide to copy how they do it.  

```c
void zcompscoreGenericCommand(redisClient *c, int reverse) {
/* will implement code ... */
}

void zgtscoreCommand(redisClient *c) {
    zcompscoreGenericCommand(c, 0);
} 
```

### 4. Implement `zcompscoreGenericCommand()`

Now I start writing the actual data retreival. 
There's quite a few interesting things going on, but I won't talk about all of them. One part I had to think a little bit was how to return the reply. If you know how many lines your return data is going to be, you use `addReplyMultiBulkLen(c, length)` .  If you don't know beforehand, you folow this pattern:  


```c
	int rangelen, replylen;

    /* We don't know in advance how many matching elements there are in the
     * list, so we push this object that will represent the multi-bulk
     * length in the output buffer, and will "fix" it later */
    replylen = addDeferredMultiBulkLength(c);

	...

	// add a line of reply, and increment the count
	addReplyBulkCBuffer(c,vstr,vlen);
	rangelen++;

	...

	// set the length
    setDeferredMultiBulkLength(c, replylen, rangelen);
```

The other interesting point was how I deal with two different data structures to store sorted sets - *ziplist* and *skiplist*. I haven't looked into the internals of each of these implementations, but apparently ziplist is more memory efficient but cannot deal with large data, and skiplist is the opposite of that.  
To deal with these two implementations, I had to write two implementations of the same algorithm, one for zip list and one for skip list.  
They both have slightly different ways of retreiving data and manipulating the pointer, so it took me a while before I got comfortable with both ways. You can go to [my actual code](https://github.com/ashiina/redis/blob/ashiina/zgtscore/src/t_zset.c#L2184), but here is how the condition looks. 

```c
    if (zobj->encoding == REDIS_ENCODING_ZIPLIST) {
	/* write ziplist data code */
    } else if (zobj->encoding == REDIS_ENCODING_SKIPLIST) {
	/* write skiplist data code */
    } else {
        redisPanic("Unknown sorted set encoding");
    }
```

Even when I read the code for `ZSCORE` or `ZRANK` or other commands they seem to be redundantly writing the same thing for both ziplist and skiplist. I wonder if there wasn't a cleaner way to write this, or if it just wasn't worth the effort.  

### 4. Write tests

After I'm done with the implementation, I should add tests. Tests in Redis are written in a language called *Tcl* (which I haven't heard til this day); it's a fairly simple language and tests are written in a very easy to read way. Here's my test code, in `tests/unit/type/zset.tcl`:

```tcl

        test "ZGTSCORE basics" {
            r del ztmp
            r zadd ztmp 1 a
            r zadd ztmp 2 b
            r zadd ztmp 3 c
            r zadd ztmp 4 d

            assert_equal {c d} [r zgtscore ztmp 3]
            assert_equal {d} [r zgtscore ztmp 4]
            assert_equal {} [r zgtscore ztmp 5]
        }

```

The `r` seems to represent a redis-client. Again I have not looked deeply into the inner workings of how this Tcl test suite is structured, but it sure is clean and easy to add tests. 

### 5. make and test

After everything is done, build and test Redis with `make && make test` to make sure everything is working. 

### DONE!

I was able to easily add a command - the whole thing took me less than 2 hours from seeing the code for the first time to having a successful `make test`. Given that I'm not at all an experienced C programmer, I was able to feel first-hand how organized the Redis source code is. 

I'd love to be able to contribute to the Redis code base someday. 



