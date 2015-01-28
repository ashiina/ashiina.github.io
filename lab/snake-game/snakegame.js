// game stuff
var game_loop;
var speed;
var DEFAULT_SPEED = 80;
var INIT_SNAKE_LENGTH = 5;
var CW = 10; // cell width
var snake_array;
var food;
var score;
var SCORE_MULTIPLIER = 100;

// canvas stuff
var canvas, ctx;
var CANVAS_W = 300;
var CANVAS_H = 300;

// keyboard stuff
var K_LEFT 	= 37;
var K_UP 	= 38;
var K_RIGHT = 39;
var K_DOWN	= 40;
var d;

$(document).ready(function(){
	SnakeGame.init();
});

// get key direction
$(document).keydown(function(e){
	var key = e.which;
	if (key == K_LEFT 		&& d != K_RIGHT) d = key;
	else if (key == K_UP 	&& d != K_DOWN) d = key;
	else if (key == K_RIGHT && d != K_LEFT) d = key;
	else if (key == K_DOWN 	&& d != K_UP) d = key;
});

var SnakeGame = {
	init: function () {
		if (typeof game_loop != "undefined") clearInterval(game_loop);
		$("#canvas").width(CANVAS_W);
		$("#canvas").height(CANVAS_H);
		canvas = $("#canvas")[0];
		ctx = canvas.getContext("2d");

		// set bg first
		SnakeGame.paintBg();

		// wait 1 sec before starting game
		$('#caption').html('starting snake game...');
		setTimeout(function(){
			SnakeGame.startGame();
		}, 1000);
	},

	startGame: function () {
		$('#caption').html('');
		// default values
		d = K_RIGHT;
		score = 0;
		SnakeGame.paintScore();
		speed = DEFAULT_SPEED;
		// paint 
		SnakeGame.createSnake();
		SnakeGame.createFood();

		game_loop = setInterval(SnakeGame.paint, speed);
	},

	createSnake: function () {
		snake_array = [];
		for (var i=INIT_SNAKE_LENGTH; i>=0; i--) {
			snake_array.push({x: i, y: 0});
		}
	},

	paintBg: function () {
		// draw bg
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, CANVAS_W, CANVAS_H);
	},

	paint: function () {
		SnakeGame.paintBg();

		// snake position
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		if (d == K_RIGHT) nx++;
		else if (d == K_LEFT) nx--;
		else if (d == K_UP) ny--;
		else if (d == K_DOWN) ny++;

		// check game over
		// edge hit
		if (nx == -1 || nx == CANVAS_W/CW || 
			ny == -1 || ny == CANVAS_H/CW || 
			SnakeGame.didCollideToArray(nx, ny, snake_array)) {
			SnakeGame.init();
			return;
		}

		// check food collision, and eat food
		if (nx == food.x && ny == food.y) {
			SnakeGame.eatFood();
			var tail = {x:nx, y:ny};
		} else {
			// move snake position
			var tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
		}
		snake_array.unshift(tail);

		// draw snake
		for (var i=0; i<snake_array.length; i++) {
			var c = snake_array[i];
			SnakeGame.paintCell(c.x, c.y);
		}

		// draw food
		SnakeGame.paintCell(food.x, food.y);
	},

	createFood: function () {
		food = {
			x: Math.round(Math.random() * (CANVAS_W - CW)/CW),
			y: Math.round(Math.random() * (CANVAS_H - CW)/CW),
		};
	},

	paintCell: function (x, y) {
		ctx.fillStyle = "blue";
		ctx.fillRect(x*CW, y*CW, CW, CW);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*CW, y*CW, CW, CW);
	},

	didCollideToArray: function (x, y, array) {
		for (var i=0; i<array.length; i++) {
			if (array[i].x == x && array[i].y == y)
				return true;
		}
	},

	paintScore: function () {
		$("#score_text").html(score * SCORE_MULTIPLIER);
	},

	eatFood: function () {
		score++;
		speed -= 2;
		SnakeGame.paintScore();
		// re-create food
		SnakeGame.createFood();

		if (typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(SnakeGame.paint, speed);
	}

};


