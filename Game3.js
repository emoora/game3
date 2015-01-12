/* This is the practice for the first part of the learning 
*Javascript with games book.
*/
"use strict";

function handleMouseMove(evt){
	Game.mousePosition = { x : evt.pageX, y : evt.pageY };
}

//Global values that create the canvas and context for game 
var Game = {
	canvas : undefined,
	canvasContext : undefined,
	backgroundSprite : undefined,
	cannonBarrelSprite : undefined,
	mousePosition : { x : 0, y : 0 },
	cannonPosition : { x : 72, y : 405 },
	cannonOrigin : { x : 34, y : 34 },
	cannonRotation : 0,
	balloonSprite : undefined,
	balloonPosition : { x : 0, y : 50 },
	balloonPosition1 : { x : 0, y : 50 },
	balloonPosition2 : { x : 200, y : 150 },
	ang : 0,
	backgroundMusic : undefined
};

Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};


//draw the sprite image and use a drawing state to translate image
Game.drawImage = function (sprite, position, rotation, origin) {
	Game.canvasContext.save();
	Game.canvasContext.translate(position.x, position.y);
	Game.canvasContext.rotate(rotation);
	Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
		-origin.x, -origin.y, sprite.width, sprite.height);
	Game.canvasContext.restore();
};


//Start function initiates game loop and calls images after a delay
Game.start = function () {
	Game.canvas = document.getElementById("myCanvas");
	Game.canvasContext = Game.canvas.getContext("2d");

	document.onmousemove = handleMouseMove;

	Game.cannonBarrelSprite = new Image();
	Game.cannonBarrelSprite.src = "spr_cannon_barrel.png"
	Game.backgroundSprite = new Image();
	Game.backgroundSprite.src = "castle.jpg";
	Game.balloonSprite = new Image();
	Game.balloonSprite.src = "Poke_Ball.png";
	Game.backgroundMusic = new Audio();
	Game.backgroundMusic.src = "techno.mp3";
	// Game.backgroundMusic.play();
	Game.backgroundMusic.volume = 0.4;
	window.setTimeout(Game.mainLoop, 500);

};

//be very careful at how you type words with talking marks around them
document.addEventListener('DOMContentLoaded', Game.start);


Game.mainLoop = function () {
	Game.update();
	Game.draw();
	window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
	var opposite = Game.mousePosition.y - Game.cannonPosition.y;
	var adjacent = Game.mousePosition.x - Game.cannonPosition.x;
	Game.cannonRotation = Math.atan2(opposite, adjacent);
};

Game.draw = function () {
	Game.clearCanvas();
	Game.drawImage(Game.backgroundSprite, { x : 0, y : 0 }, 0, { x : 0, y : 0});
	Game.drawImage(Game.cannonBarrelSprite, Game.cannonPosition, Game.cannonRotation, Game.cannonOrigin);
};
