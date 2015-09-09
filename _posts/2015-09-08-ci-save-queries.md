---
title: Disable CodeIgniter save_queries. It takes up memory
layout: post
date: 2015-09-08 23:00:00
tags: CodeIgniter PHP
comments: true
---

The CodeIgniter database module automatically saves all queries you ran in the request, apparently for profiling. You can see the code here:  

[https://github.com/bcit-ci/CodeIgniter/blob/3.0-stable/system/database/DB_driver.php#L633](https://github.com/bcit-ci/CodeIgniter/blob/3.0-stable/system/database/DB_driver.php#L633)  

This can really eat into your memory, especially if you are running a large script via CodeIgniter CLI, processing a large amount of data.  

Thankfully this is faily easy to stop. Just set the flag below to `FALSE`. It's in the `DB_driver.php` file, same as above.  

```php
	/**
	 * Save queries flag
	 *
	 * Whether to keep an in-memory history of queries for debugging purposes.
	 *
	 * @var	bool
	 */
	public $save_queries		= TRUE;
	
```

I haven't found a way to dynamically turn this on/off (at least through officially supported means), but ideally I think this should be able to be set on/off depending on your environment. In a production environment where you rarely would be using the CodeIgniter profiler, this will just be a waste of memory, and can be very harmful to your application.  
Until that dynamic configuration is possible, I suggest just turning it off everywhere, and turning it on only when you need it.  

I wish this becomes configurable...  



