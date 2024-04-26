import Bullet from "../Bullet/Bullet";
import Enemy from "./Enemy";

class EnemyMedium extends Enemy {
  constructor(scene, x, y, key, frame, damage, life, velocity, fireRate) {
    super(scene, x, y, key, frame, damage, life, fireRate, velocity);
    this.bullets = undefined;
    this.fireRate = fireRate;
    this.nextFire = 0;
    this.velocityX = Phaser.Math.Between(-450, 450);
    this.createBullet();
  }

  createBullet() {
    this.bullets = this.scene.physics.add.group();
    this.bullets.runChildUpdate = true;
  }

  update() {
    super.update();
    this.body.setVelocityX(this.velocityX);
    this.power();
    this.bullets.getChildren().forEach((bullet) => {
      bullet.update();
    });
  }

  power() {
    if (this.scene.time.now > this.nextFire) {
      this.nextFire = this.scene.time.now + this.fireRate;
      this.bullets.add(
        new Bullet(this.scene, this.x + 20, this.y, "laser-bolts", 0, 550)
      );
    }
  }

  animation() {
    super.animation();
  }

  hit(value) {
    super.hit(value);
  }

  _destroy() {
    super._destroy();
  }
}

export default EnemyMedium;
