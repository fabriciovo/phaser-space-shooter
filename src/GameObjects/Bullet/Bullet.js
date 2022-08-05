import * as Phaser from "phaser";

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame, velocity, damage = 3) {
    super(scene, x, y, key, frame);

    this.scene = scene;
    this.key = key;
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setScale(3);
    this.setOrigin(0, 0)
    this.scene.add.existing(this);
    this.setDepth(2)
    this.setSize(2, 2, true);

    this.velocity = velocity;
    this.damage = damage;
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => this.destroy(),
      args: [],
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
  }

  update() {
    this.body.setVelocityY(this.velocity)
  }



}

export default Bullet