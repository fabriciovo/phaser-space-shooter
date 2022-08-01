import * as Phaser from "phaser";
import Bullet from "../Bullet/Bullet";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setOrigin(0,0)
    this.setScale(3);
    this.scene.add.existing(this);
    this.key = key;

    this.life = 3
    this.fireRate = 350;
    this.nextFire = 0;
    this.velocity = Phaser.Math.Between(250, 450)

    this.bullets = undefined;
    this.animation()
    this.createBullet()
  }

  createBullet(){
    this.bullets = this.scene.physics.add.group();
    this.bullets.runChildUpdate = true 
  }

  update() {
    if(!this.body) return
    this.body.setVelocityY(this.velocity)
    this.power()
    this.bullets.getChildren().forEach(bullet => {
      bullet.update()
  });
  }

  power() {
    if (this.scene.time.now > this.nextFire) {
      this.nextFire = this.scene.time.now + this.fireRate;
      this.bullets.add(new Bullet(this.scene,this.x,this.y,'laser-bolts',0, 550))
    }
  }

  animation() {
    this.anims.create({
      key: 'enemy-small-anim',
      frames: this.anims.generateFrameNumbers('enemy-small', { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1
    });
    this.play('enemy-small-anim')
  }

  damage(value){
    const damegeValaue = this.life - value;
    if(damegeValaue <= 0){
      this.destroy()
    }else{
      this.life = damegeValaue
    }
  }


}

export default Enemy