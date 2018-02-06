---
title: Golang interface tips
layout: post
date: 2018-02-06 20:00:00
tags: Golang
comments: true
---

Trying to get a better grasp of intefaces in Go. The talk below has been a great resource for having a deep understanding of dealing with interfaces in the language.  

<iframe width="560" height="315" src="https://www.youtube.com/embed/F4wUrj6pmSI" frameborder="0" allowfullscreen></iframe>
<br>

<script async class="speakerdeck-embed" data-id="72338d4499864bf18ee566fab22e01ec" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## Smaller is Better

```golang
// this is better
func Write(w *Writer)

// this is too big
func Write(rw *ReadWriter)
```

As Rob Pike says in Go Proverbs, "The bigger the interface, the weaker the abstraction". If a function just requires a type that can `Write`, a `Writer` is enough, and a `ReadWriter` is not needed.  
This sort of thinking should permeate through all areas of your interface design.  


## Return concrete types

```golang
func New() *os.File
```

When returning, you should return conrete types instead of interfaces. Returning interfaces will lead to confusion on the part of the user of the function. The user of a function should feel comfortable and clear to use whatever type of value that has been returned to him/her.  


## It is okay to write interfaces in many places

This is one point which I initially had trouble getting used to. 
For example, if there is a struct 

```golang
type Storage struct

func (s *Storage) Store(f *os.File)
```

and let's say there are three different packages that just want to take advantage of the `Store()` function. Should you create one package that contains the interface,

```
type Storer interface {
  Store(f *os.File)
}
```

and think about the placement of that package and manage it as another dependency for the package? The answer is no. It is okay to go ahead and write the interface definition in all three packages. It may seem like redudndant code is bad, but in fact this is not redundant code.  
In reality, each of the three packages are deducing the interface from the concrete definition.  

In the same way, you can always create interfaces of existing third-party libraries. For example, 
if you have a SFTP reader using the [`sftp` package](https://godoc.org/github.com/pkg/sftp) (crude example):  

```golang

func ReadFile (c sftp.Client) {
  f, err := c.Open("/somefile")
  defer c.Close()
  ...
}
```

If you want to mock out the `Client` for easier testing, what should you do? The `sftp` package doesn't provide a nice interface for you to use.  
The answer is, just deduce the interface from the methods you are using. In this case:

```golang
type sftpIface interface {
  Open(path string) (*File, error)
  Close() error
}

func ReadFile (c sftpIface) {
   f, err := c.Open("/somefile")
  defer c.Close()
  ...
}
```

Now you can inject a mock type in your test, instead of having to use the `sftp` library.   
This kind of thinking should be applied not only to third-party packages, but to your own packages too. This will allow for much cleaner and smarter decoupling of your packages, even within one large application.  




