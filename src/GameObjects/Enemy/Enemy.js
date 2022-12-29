import * as Phaser from "phaser";
import Bullet from "../Bullet/Bullet";
import Explosion from "../Explosion/Explosion";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame, damage, life, velocity) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.setOrigin(0, 0)
    this.setScale(3);
    this.setDepth(3)
    this.scene.add.existing(this);
    this.key = key;

    this.life = life
    this.damage = damage;
    this.velocity = velocity
    this.dead = false
    this.bullets = undefined;
    this.animation()

    this.scene.time.addEvent({
      delay: 5000,
      callback: () => { 
        this.body = null
        this.destroy() },
      args: [],
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false
    });
    this.flash = this.scene.plugins.get('rexFlash').add(this, {
        duration: 50,
        repeat: 5
    });
    
  }

  update() {
    if (!this.body) return
    this.body.setVelocityY(this.velocity)
  }

  animation() {
    this.anims.create({
      key: `${this.key}-anim`,
      frames: this.anims.generateFrameNumbers(this.key, { frames: [0, 1] }),
      frameRate: 8,
      repeat: -1
    });
    this.play(`${this.key}-anim`)
  }

  hit(value) {
    const damegeValaue = this.life - value;
    this._flash()
    if (damegeValaue <= 0) {
      this._destroy()
    } else {
      this.setTint(0xffffff)
      this.life = damegeValaue
    }


  }

  _destroy() {
    const createExplosion = new Explosion(this.scene, this.x, this.y, 'explosion', 0)
    this.dead = true;
    this.destroy()
  }

  _flash() {
    this.flash.flash();
    // this.flash = true;
    // const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
    // const endColor = Phaser.Display.Color.ValueToColor(0xff00000)
    // this.scene.tweens.add({
    //   targets: this,
    //   from: 0,
    //   to: 100,
    //   duration: 40,
    //   yoyo: true,
    //   loop:true,
    //   ease: Phaser.Math.Easing.Sine.InOut,
    //   onUpdate: tween => {
    //     const value = tween.getValue();
    //     const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
    //       startColor,
    //       endColor,
    //       100,
    //       value
    //     )
    //     const color = Phaser.Display.Color.GetColor(
    //       colorObject.r,
    //       colorObject.g,
    //       colorObject.b,
    //     )
    //     this.setTint(color)
    //   }
    // })

  }


}

export default Enemy