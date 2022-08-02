
export default class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, w, h, key, frame, speed) {
        super(scene, x, y, w, h, key, frame);
        this.scene = scene;
        this.key = key;
        this.setOrigin(0, 0);
        this.setScale(4, 4)
        this.scene.add.existing(this);
        this.speed = speed;
    }

    update(delta){
        this.tilePositionY -= Phaser.Math.GetSpeed(this.speed, 3) * delta
    }
}