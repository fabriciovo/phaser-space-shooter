class PowerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.key = key;
    this.setScale(2);
    this.setOrigin(0, 0);
    this.setDepth(8);
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.velocity = Phaser.Math.Between(150, 740);

    this.animation();
  }

  animation() {
    this.anims.create({
      key: `${this.key}-anim`,
      frames: this.anims.generateFrameNumbers(this.key, { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1,
    });
    this.play(`${this.key}-anim`);
  }

  update() {
    this.body.setVelocityY(this.velocity);
  }
}

export default PowerUp;
