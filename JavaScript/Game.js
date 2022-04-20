function Game() {
  //constants
  this.GAME_WIDTH = 192;
  this.GAME_HEIGHT = 82;
  this.start = false;
  this.Score = 0;
  this.minTime = 3;
  this.maxTime = 15;
  this.spawnTime =
    Math.random() * (+this.maxTime - +this.minTime) + +this.minTime;
  this.spawnTime2 =
    Math.random() * (+this.maxTime - +this.minTime) + +this.minTime;
  //keep the game going
  this.gameLive = true;

  //Arrays
  this.sprites = {};
  this.entities = [];

  //Canvas and Context
  this.canvas = document.getElementById("canvasGame");
  this.ctx = this.canvas.getContext("2d");
  this.keyboard = new Keyboard(document);

  this.entities.push(
    new Player(
      this.ctx,
      "Sprites/spritesheets/ship.png",
      this.keyboard,
      undefined
    )
  );
  //initial kick
  this.loadSprites();
  this.loadEntities();

  //loop
  this.draw();
  this.update();
}

Game.prototype = {
  init: function () {},
  draw: function () {
    //clear the canvas
    this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);

    //draw background
    this.ctx.drawImage(this.sprites.background, 0, 0);

    //draw entities
    this.entities.forEach((element) => {
      element.draw();
    });

    if (this.gameLive) {
      window.requestAnimationFrame(this.draw.bind(this));
    }
  },
  update: function () {

      this.entities.forEach((element) => {
        element.update();
      });

    if (this.gameLive) {
      window.requestAnimationFrame(this.update.bind(this));
    }
  },
  loadSprites: function () {
    this.sprites.background = new Image(600, 600);
    this.sprites.background.src = "Sprites/backgrounds/desert-backgorund.png";
    //Load Sprites
    // this.sprites.playerImage = new Image();
    // this.sprites.playerImage.src = "Sprites/spritesheets/ship.png";
    // var enemyLeftImage = new Image();
    // enemyLeftImage.src = "Sprites/enemyLeft.png";

    // var enemyRightImage = new Image();
    // enemyRightImage.src = "Sprites/enemyRight.png";

    // var fireballImage = new Image();
    // fireballImage.src = "Sprites/fireball.png";
  },
  loadEntities: function () {
    Object.entries(this.entities).forEach((element) => {
      // console.log(element.create());
    });
    console.log(this.sprites.playerImage);
  },
  fisics: function () {},
  inputs: function () {
    //Load Objects
    //iNPUTS
    // this.keyboard.release(Z, function () {
    //   if (start) {
    //     player.power();
    //   }
    // });
    // keyboard.release(ENTER, function () {
    //   start = true;
    //   document.getElementById("start").innerHTML = "";
    // });
  },
  checkCollision: function (rect1, rect2) {
    var closeOnWidth =
      Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
    var closeOnHeight =
      Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
    return closeOnWidth && closeOnHeight;
  },
};
