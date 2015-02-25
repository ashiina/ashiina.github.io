---
title: Python class variables and instance variables
layout: post
date: 2015-02-25 21:00:00
tags: Python
comments: true
---

I'm still a Python beginner, still getting used to the concepts. It's a relatively simple and clean language to use. I haven't gotten into using frameworks yet, but since the fundamentals of the language are very simple, I'm ready to jump into frameworks (like Django) already.  

Here's a little something I want to keep note of - the scope and accessing of class variables and instance variables.  

### Instance Variables  
Instance variables are declared and accessed with `{instance}.{name}`.  
Within a method of the same class the `{instance}` will translate to `self`. 
Below is an example of two ways of accessing the instance variable `var`.  

```python
class MyClass:
	def myMethod (self):
		self.var = 10

obj = MyClass()
obj.myMethod()
assert obj.var == 10
```


### Class Variables  
Class variables are declared as such:  

```python
class MyClass:
	var = 10

assert MyClass.var == 10
```

The class variable can be accessed by `{ClassName}.{name}`.  
But actually, you can **read** the class variable by `{instance}.{name}`. This takes us to the next question:  


### Instance Variables with the same name as Class Variables  
What if you declare an instance variable, with the same name as a class variable?  
Here is the quick answer via code:  

```python
class MyClass:
	var = 10

c1 = MyClass()

assert hex(id(c1.var)) == hex(id(MyClass.var))

MyClass.var += 1
assert hex(id(c1.var)) == hex(id(MyClass.var))
assert c1.var == MyClass.var

classVarAddr = hex(id(MyClass.var))
c1.var += 1
assert hex(id(c1.var)) != classVarAddr
assert hex(id(MyClass.var)) == classVarAddr
assert c1.var == MyClass.var+1
```

*Note: hex(id({variable})) gives us the memory address of the variable.*   

First, the `c1.var` and `MyClass.var` have the same memory address, when reading the variable.  
Next, `MyClass.var` is incremented. The value and memory address of `c1.var` and `MyClass.var` are still both identical.  
The next step is the interesting part - When `c1.var` is modified, the memory address of `c1.var` and `MyClass.var` differ. 
The address of `MyClass.var` does not change from previously, but `c1.var` is allocated a new address - meaning, it becomes a new variable.  

In the example we are writing into `c1.var` with the `+=` operand, which is in fact `c1.var = c1.var + 1`. So the class variable is read, incremented, then stored into the new memory location.  

---  

This was an interesting behavior of the Python language, and wanted to take note of it. Otherwise the Object-Oriented Programming in Python seems fairly intuitive and straight-forward as I know. 




