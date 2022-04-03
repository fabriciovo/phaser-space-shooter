function Game() {
  //constants
  this.GAME_WIDTH = 192;
  this.GAME_HEIGHT = 82;
  this.start = false;
  this.Score = 0;
  this.minTime = 3;
  this.maxTime = 15;
  this.spawnTime = Math.random() * (+maxTime - +minTime) + +minTime;
  this.spawnTime2 = Math.random() * (+maxTime - +minTime) + +minTime;
  //keep the game going
  this.gameLive = true;

  //Arrays
  this.sprites = {};
  this.enemies = [];

  //Canvas and Context
  this.canvas = document.getElementById("canvasGame");
  this.ctx = canvas.getContext("2d");

  //Load Sprites
  var playerImage = new Image();
  playerImage.src = "Sprites/hero.png";

  var enemyLeftImage = new Image();
  enemyLeftImage.src = "Sprites/enemyLeft.png";

  var enemyRightImage = new Image();
  enemyRightImage.src = "Sprites/enemyRight.png";

  var fireballImage = new Image();
  fireballImage.src = "Sprites/fireball.png";

  //Load Objects
  var keyboard = new Keyboard(document);
  var player = new Player(ctx, playerImage, keyboard, fireballImage);

  //iNPUTS
  keyboard.release(Z, function () {
    if (start) {
      player.power();
    }
  });

  keyboard.release(ENTER, function () {
    start = true;
    document.getElementById("start").innerHTML = "";
  });

  // Shadow

  var loadBackground = function () {
    sprites.background = new Image();
    sprites.background.src = "Sprites/background.png";
  };

  //show the game on the screen
  var draw = function () {
    //clear the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    //draw background
    ctx.drawImage(sprites.background, 0, 0);

    //draw player
    player.draw();

    //draw enemies
    enemies.forEach((element) => {
      element.draw();
    });

    player.fireball.forEach((element) => {
      element.draw();
    });
  };

  //gets executed multiple times per second
  var step = function () {
    update();
    draw();

    if (gameLive) {
      window.requestAnimationFrame(step);
    }
  };

  //check the collision between two rectangles
  var checkCollision = function (rect1, rect2) {
    var closeOnWidth =
      Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
    var closeOnHeight =
      Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
    return closeOnWidth && closeOnHeight;
  };

  //initial kick
  loadBackground();
  step();
}

Game.prototype = {
  init: function () {},
  keyboard: function () {},
  draw: function () {},
  update: function () {
    if (start) {
      spawnTime -= 0.1;
      spawnTime2 -= 0.1;

      if (spawnTime <= 0) {
        enemies.push(new Enemy(ctx, enemyLeftImage, 14, 63));
        enemies.push(new Enemy(ctx, enemyRightImage, 182, 63));
        spawnTime = Math.random() * (+maxTime - +minTime) + +minTime;
      }

      if (spawnTime2 <= 0) {
        spawnTime2 = Math.random() * (+maxTime - +minTime) + +minTime;
        if (spawnTime2 % 2 == 0) {
          enemies.push(new Enemy(ctx, enemyLeftImage, 14, 63));
        } else {
          enemies.push(new Enemy(ctx, enemyRightImage, 182, 63));
        }
      }

      //Player
      player.update();

      //move enemy
      enemies.forEach((element) => {
        element.update();
        if (checkCollision(player, element)) {
          //stop the game
          gameLive = false;

          alert("Game Over!");

          window.location = "";
        }
      });

      //Fireball
      player.fireball.forEach((element) => {
        element.update();
      });

      for (var i = 0; i < player.fireball.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
          if (checkCollision(enemies[j], player.fireball[i])) {
            delete enemies[j];
            enemies.splice(j, 1);
            delete player.fireball[i];
            player.fireball.splice(i, 1);
            document.getElementById("score").innerHTML = "Score: " + ++Score;
            break;
          }
        }
      }
    }
  },
  step: function () {},
  loadBackground: function () {},
  fisics: function () {},
};
