import * as Phaser from "phaser";
import Bullet from "../Bullet/Bullet";
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    //this.scene.add.existing(this);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.key = key;
    this.frame = frame;
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);

    this.setScale(3);
    this.setImmovable(true);
    this.setDepth(5)
    
    
    this.fireRate = 350;
    this.nextFire = 0;
    this.damage = 1
    
    this.bullets = undefined;
    
    this.createInput()
    this.createBullet()
    
  }
  update() {
    if (this.body) {
      this.movement();
      this.power();
    }
  }

  createInput() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  movement() {
    this.body.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(250);
    }
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-250);
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(250);
    }
  }

  createBullet() {
    this.bullets = this.scene.physics.add.group();
   this.bullets.runChildUpdate = true 
  }

  power() {
    if (this.scene.time.now > this.nextFire) {

      this.nextFire = this.scene.time.now + this.fireRate;
      //this.bullets.add(new Bullet(this.scene,this.x,this.y,'laser-bolts',0, -350))
    }
  }

}

export default Player