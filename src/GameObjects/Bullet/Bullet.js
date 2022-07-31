import * as Phaser from "phaser";

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    
    this.scene = scene; 
    this.key = key;
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setScale(3);
    this.setOrigin(0,0)
    this.scene.add.existing(this);
    
  }

  fire(x,y,velocity){
    this.setPosition(x,y)
    this.body.setVelocityY(velocity)
  }

  
}

export default Bullet