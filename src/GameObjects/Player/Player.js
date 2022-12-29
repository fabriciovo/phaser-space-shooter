import * as Phaser from "phaser";
import Bullet from "../Bullet/Bullet";
import Explosion from "../Explosion/Explosion";
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setScale(3);
    this.setOrigin(0, 0)
    this.setCollideWorldBounds(true)
    this.setDepth(5)
    this.scene.add.existing(this);
    this.key = key;

    this.life = 10
    this.score = 0;
    this.level = 1;
    this.maxExp = 100
    this.fireRate = 350;
    this.fireRateOriginal = 350;
    this.nextFire = 0;
    this.damage = 1
    this.speed = 250
    this.doubleBullets = false
    this.bullets = undefined;
    this.bulletSpeed = -450;
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

      this.body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    }
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {

      this.body.setVelocityY(this.speed);
    }


  }

  createBullet() {
    this.bullets = this.scene.physics.add.group();
    this.bullets.runChildUpdate = true
  }

  power() {
    if (this.scene.time.now > this.nextFire) {

      this.nextFire = this.scene.time.now + this.fireRate;


      if (!this.doubleBullets) {
        this.bullets.add(new Bullet(this.scene, this.x, this.y, 'laser-bolts', 2, this.bulletSpeed))
      } else {
        this.bullets.add(new Bullet(this.scene, this.x - 13, this.y, 'laser-bolts', 2, this.bulletSpeed))
        this.bullets.add(new Bullet(this.scene, this.x + 13, this.y, 'laser-bolts', 2, this.bulletSpeed))
      }
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
      frames: this.anims.generateFrameNumbers('player', { frames: [5, 9] }),
      frameRate: 8,
      repeat: -1
    });
    this.play('up')
  }

  hit(value) {
    const damegeValaue = this.life - value
    if (this.level > 1) {
      this.updateLevel(-1)
    }
    if (damegeValaue <= 0) {
      const createExplosion = new Explosion(this.scene, this.x, this.y, 'explosion', 0)
      this.scene.scene.launch("GameOverScene")
      this.destroy()

    }
    this.life = damegeValaue
  }
  updateLevel(level) {
    this.level += level;
    if (this.level === 2) {
      this.doubleBullets = true
      this.fireRate = 350
      this.bulletSpeed = -450
    }
    if (this.level === 3) {
      this.fireRate = 150
      this.speed = 350;
      this.bulletSpeed = -640
    } else if (this.level === 3) {
      this.speed = 200;
      this.damage = 1;
    } else if (this.level === 4) {
      this.damage = 2;
    } else if (this.level === 5) {
      this.damage = 3;
    }
    else if (this.level >= 6) {
      this.life+=5;
    }

  }


}

export default Player