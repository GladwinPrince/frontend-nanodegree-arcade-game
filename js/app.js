"use strict";
// Enemies our player must avoid
var Member = function(positionX, positionY, image){
    //Initializing X-axis and Y-axis position of the Member
    this.posX = positionX;
    this.posY = positionY;
    //Initializing position of Member image
    this.sprite = image;
};

var Enemy = function(positionX, positionY, movementSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //Constructing Member Object
    Member.call(this, positionX, positionY, "images/enemy-bug.png");
    //Initializing movement speed of enemy
    this.moveSpeed = movementSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.posX += this.moveSpeed * dt;
    //Looping enemy movement in a lane
    this.posX %= 505;
    //Checking whether the player is in range of enemy
    this.collisionDetection();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

Enemy.prototype.collisionDetection = function() {
    //Checking if the player is in range of the enemy and resetting the player
    if (Math.abs(player.posY - this.posY) <= 25 && Math.abs(player.posX - this.posX) <= 74) {
        player.posX = randomPlayerPosX();
        player.posY = randomPlayerPosY();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(positionX, positionY, movementX, movementY) {
    //Constructing Member Object
    Member.call(this, positionX, positionY, "images/char-boy.png");
    //Initializing X-axis and Y-axis movement distance of player
    this.moveX = movementX;
    this.moveY = movementY;
    //Initializing Score and Level of the user
    this.score = 0;
    this.level = 1;
    //Generating enemies based on player level
    this.randomizeEnemies();
};

Player.prototype.update = function(dt) {
    //Checking if the player has reached the destination
    if (this.posY === -25) {
        this.posX = randomPlayerPosX();
        this.posY = randomPlayerPosY();
        console.log("Win!!");
        //updating score based on victory
        this.score++;
        if (this.score === 5) {
            this.score = 0;
            this.level++;
            this.randomizeEnemies();
        }
    }
    //Displaying Score
    displayScore();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

Player.prototype.handleInput = function(loggedKey) {
    //Finding and executing input command
    switch (loggedKey) {
        case "left":
            if (this.posX !== 0) {
                this.posX -= this.moveX;
            }
            break;
        case "up":
            if (this.posY !== -25) {
                this.posY -= this.moveY;
            }
            break;
        case "right":
            if ((this.posX + this.moveX) < (5 * 101)) {
                this.posX += this.moveX;
            }
            break;
        case "down":
            if ((this.posY + this.moveY) < (5 * 83)) {
                this.posY += this.moveY;
            }
            break;
    }
    //Refilling unpainted area in the canvas to remove residue to previous instance.
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 606);

};

var randomPlayerPosX = function() {
    //Algorithm to generate random X-axis position for player
    return ((Math.floor(Math.random() * 5)) * 101);
};

var randomPlayerPosY = function() {
    //Algorithm to generate random Y-axis position for player
    return (((4 + Math.round(Math.random())) * 83) - 25);
};

var randomEnemyPos = function() {
    //Algorithm to generate random Y-axis position for enemy
    return (((1 + Math.floor(Math.random() * 3)) * 83) - 20);
};

Player.prototype.randomizeEnemies = function() {
    //Generating random enemies based on level
    allEnemies = [];
    for (var i = 0, len=this.level; i < len; i++) {
        allEnemies.push(new Enemy(0, randomEnemyPos(), (35 + Math.random() * 50)));
    }
};

var displayScore = function() {
    //Function to update score
    document.getElementById("score").innerHTML = player.score;
    document.getElementById("level").innerHTML = player.level;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//Creating New Player in a random location in the grass area
var player = new Player(randomPlayerPosX(), randomPlayerPosY(), 101, 83);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
