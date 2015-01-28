---
title: A Simple Snake Game
layout: post
date: 2015-01-26 22:00:00
tags: Game Javascript
comments: true
---

I talk to some people about the fact that "I've never written a game", meaning that I've never written code with a `main()` loop that draws some sort of graphic and interacts with user inputs. I've decided it's time to say goodbye to those days, so I pulled out a easy tutorial and wrote a [Snake Game](http://en.wikipedia.org/wiki/Snake_%28video_game%29) using HTML5 canvas and Javascript.  

It was a lot easier than I thought; got it done in about an hour, with less than 200 lines of code.  
It's pretty fun to write your own game, and see it in action :)  

Here I do have some inefficiencies that I may want to avoid when developing a higher performing game.  

 * **Frame rendering**: I am drawing the entire background and re-drawing the objects on every frame. I believe there is a more efficient way of drawing the graphics on the canvas - for example only drawing the delta.
 * **Snake collision detection**: In every frame I am comparing every cell of the snake with the position of its head in order to check for collision. I'm doing this through a simple `for` loop. This can get pretty expensive when the snake becomes very long. Maybe I should have a more efficient way of searching through the array, for example setting the x and y dimensions as a key, and searching for the key.  I'm sure key searching is a lot faster.  

You can play it here:  
[http://ashiina.github.io/lab/snake-game/snakegame.html](http://ashiina.github.io/lab/snake-game/snakegame.html)  



Here's the code:  
[https://github.com/ashiina/snake-game-demo](https://github.com/ashiina/snake-game-demo)




