import * as Phaser from "phaser";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    this.scene = scene; 
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setScale(3);
    this.scene.add.existing(this);
    this.key = key;
    this.life = 3
    this.velocity = Phaser.Math.Between(250, 450)
  }

  update(){
    this.body.setVelocityY(this.velocity)
  }

}

export default Enemy