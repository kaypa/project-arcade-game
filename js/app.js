// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  //Sets location
  this.x = x;
  this.y = y;
  //Sets speed
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Ensures the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // Updates Enemy location
  if (this.x > 510) {
    this.x = -50;
    this.speed = 100 + Math.floor(Math.random() * 200);
  }

  // Checks for collision with Player
  if ((player.x < this.x + 80) && (player.x + 80 > this.x) && (player.y < this.y + 60) && (player.y + 60 > this.y)) {
    player.x = 202;
    player.y = 405;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
  //Sets location
  this.x = x;
  this.y = y;
  //Loads image
  this.sprite = 'images/char-horn-girl.png';
};

// Draws the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function(allowedKeys) {
  if (allowedKeys == 'left' && this.x > 0) {
    this.x -= 101;
  } else if (allowedKeys == 'right' && this.x < 505) {
    this.x += 101;
  } else if (allowedKeys == 'up' && this.y > 0) {
    this.y -= 83;
  } else if (allowedKeys == 'down' && this.y < 405) {
    this.y += 83;
  }

  if (this.y < 0) {
    setTimeout(function() {
      player.x = 202;
      player.y = 405;
    }, 700);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyLocation = [63, 147, 230];

// Create new enemy objects and place them in allEnemies array
for (var ycord of enemyLocation) {
  enemy = new Enemy(0, ycord, 200);
  allEnemies.push(enemy);
}

var player = new Player(202, 405);


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
