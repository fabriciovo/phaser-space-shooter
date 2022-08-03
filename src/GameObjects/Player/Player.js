import * as Phaser from "phaser";
import Bullet from "../Bullet/Bullet";
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setScale(3);
    this.setOrigin(0,0)
    this.setCollideWorldBounds(true)
    this.setDepth(5)
    this.scene.add.existing(this);
    this.key = key;
    
    this.life = 3
    this.score = 0;
    this.exp = 0;
    this.fireRate = 350;
    this.nextFire = 0;
    this.damage = 1

    this.bullets = undefined;

    this.createInput()
    this.createBullet()
    this.animations()


  }
  update() {
    if (this.body) {
      this.movement();
      this.power();


      this.bullets.getChildren().forEach(bullet => {
          bullet.update()
      });
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
      this.bullets.add(new Bullet(this.scene,this.x,this.y,'laser-bolts',0, -350))
    }
  }

  animations() {
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 7] }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 5] }),
      frameRate: 24,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 5, 9] }),
      frameRate: 8,
      repeat: -1
    });
    this.play('up')
  }

  hit(value){
    const damegeValaue = this.life - value
    if(damegeValaue <= 0){
      this.destroy()
    }
    this.life = damegeValaue
  }

}

export default Player