// JavaScript source code
var LEFT = 1;
var RIGHT = 2;

function Player(context, ImageSrc, keyboard, project) {
  this.context = context;
  this.image = new Image();
  this.image.src = ImageSrc;
  this.keyboard = new Keyboard(document);
  this.x = 96;
  this.y = 61;
  this.w = 8;
  this.h = 12;
  this.speedX = 1;
  this.dir = RIGHT;
  this.fireball = new Array();
  this.project = project;
  this.input();
}

Player.prototype = {
  update: function () {
    // if (this.keyboard.press(KEY_LEFT) && this.x > 14) {
    //   console.log("KEY_LEFT");
    //   this.dir = LEFT;
    //   this.speedX = -1;
    //   this.x += this.speedX;
    // } else if (
    //   this.keyboard.press(KEY_RIGHT) &&
    //   this.x < this.context.canvas.width - 20
    // ) {
    //   console.log("KEY_RIGHT");
    //   this.dir = RIGHT;
    //   this.speedX = 1;
    //   this.x += this.speedX;
    // }
    if (this.keyboard.press(KEY_LEFT)) {
      this.dir = LEFT;
      this.speedX = -1;
      this.x += this.speedX;
    }
    if (this.keyboard.press(KEY_RIGHT)) {
      this.dir = RIGHT;
      this.speedX = 1;
      this.x += this.speedX;
    }
  },
  draw: function () {
    this.context.drawImage(this.image, this.x, this.y);
  },
  power: function () {
    this.fireball.push(
      new Fireball(
        this.context,
        this.fireballImage,
        this.x,
        this.y + 5,
        this.speedX * 3
      )
    );
  },
  input: function () {
    this.keyboard.release(Z, function () {
      console.log("POFDKPOASDK");
    });

    if (this.keyboard.press(KEY_LEFT)) {
      console.log("KEY_LEFT");
    }
    if (this.keyboard.press(KEY_RIGHT)) {
      console.log("KEY_RIGHT");
    }
  },
};
