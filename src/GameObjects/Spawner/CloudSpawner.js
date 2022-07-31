import Phaser from "phaser";

export default class CloudSpawner {
    constructor(scene) {
        this.scene = scene;
    }

    spawn(key, depth, velocity) {
        const cloud = this.scene.add.sprite(0, -400, key)
        this.scene.physics.world.enable(cloud);
        cloud.setOrigin(0, 0);
        cloud.setScale(4, 4)
        cloud.setDepth(depth)
        cloud.body.setVelocityY(velocity)

        this.scene.time.addEvent({
            delay: 10000,
            callback: ()=> cloud.destroy(),
            args: [],
            loop: false,
            repeat: 0,
            startAt: 0,
            timeScale: 1,
            paused: false
        });

    }


}