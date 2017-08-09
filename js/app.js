// Enemies our player must avoid
var Enemy = function(positionX, positionY, movementSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Initializing X-axis and Y-axis position of the enemy
    this.posX = positionX;
    this.posY = positionY;
    //Initializing movement speed of enemy
    this.moveSpeed = movementSpeed;

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.posX += this.moveSpeed * dt;
    //Looping enemy movement in a lane
    this.posX%=505;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(positionX, positionY, movementX, movementY) {
    //Initializing X-axis and Y-axis position of the player
    this.posX = positionX;
    this.posY = positionY;
    //Initializing X-axis and Y-axis movement distance of player
    this.moveX = movementX;
    this.moveY = movementY;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //Player object doesn't need constant updation of properties. Hence, This function is empty
    //This function is declared to workaround the JS error for missing update function.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

Player.prototype.handleInput = function(loggedKey) {
    switch (loggedKey) {
        case "left":
            if(player.posX!==0){
                player.posX-=player.moveX;
            }
            break;
        case "up":
            if(player.posY!==-25){
                player.posY-=player.moveY;
            }
            break;
        case "right":
            if((player.posX+player.moveX)<(5*101)){
                player.posX+=player.moveX;
            }
            break;
        case "down":
            if((player.posY+player.moveY)<(5*83)){
                player.posY+=player.moveY;
            }
            break;
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 606);

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//Creating New Player in a random location in the grass area
player = new Player((Math.floor(Math.random()*5))*101,((4+Math.round(Math.random()))*83)-25,101,83);
allEnemies.push(new Enemy(0,((1+Math.floor(Math.random()*3))*83)-20,50));
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
