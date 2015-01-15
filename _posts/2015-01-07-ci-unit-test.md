---
title: CLI Unit testing on CodeIgniter
layout: post
date: 2015-01-07 1:30:00
tags: PHP testing
comments: true
---

CodeIgniter (v2.x) has a simple unit testing library, but it's way too simple.  
As a default, all you can do is write simple comparisons of expected values, as such:

```php
<?php
$test = 1 + 1;

$expected_result = 2;

$test_name = 'Adds one plus one';

$this->unit->run($test, $expected_result, $test_name);
```

and the result can either be displayed as an HTML, or can be returned as an array.  

```php
<?php
echo $this->unit->report();
$result = $this->unit->result();
```

That means that there is no CLI solution for unit testing in CodeIgniter.
I'm sure that everybody who is familiar with CodeIgniter knows that it has pretty much no CLI feature whatsoever.  
Of course the **speed = simplicity = lack of features** was always CodeIgniter's trait, and I still respect that.
Still, I want to be able to have a CLI unit testing capability for Continuous Integration and what not.

Here's what I came up with: [cli_unit_test](https://github.com/ashiina/codeigniter-cli_unit_test)

It's an extension to the `Unit_test` library, adding one extra function which is `cli_report()`. This outputs the test results in a CLI friendly manner, with colors and stuff.

Since we can determine whether the request is a HTTP or a CLI request, here's a typical implementation I write:

```php
<?php
/* some test code above... */

if ($this->input->is_cli_request()) {
	$this->unit->cli_report();
} else {
	$this->unit->report();
}
```

And just call your unit test controller as such:

```bash
php /path/to/ci/index.php test_controller index
```

It's a small and simple, but nice solution and works pretty well for me.  
  
  
  
P.S.   
I should start looking into BDD testing frameworks for PHP; Unit testing isn't enough these days. I want something as intuitive and reliable as Rspec. [Behat](http://docs.behat.org/en/v2.5/) would be the best option maybe? 






