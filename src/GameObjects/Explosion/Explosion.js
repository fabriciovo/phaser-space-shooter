
class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame,) {
      super(scene, x, y, key, frame);
      this.scene = scene;
      this.setScale(4);
      this.setOrigin(0,0)
      this.setDepth(8)
      this.scene.add.existing(this);


      this.animation()
    }

    animation() {
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNames('explosion', { start: 0, end: 4 }),
            frameRate: 8
        })
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.destroy();
        }, this);
        this.play('explosion')

      }
    
}

export default Explosion