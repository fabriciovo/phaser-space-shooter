import Phaser from "phaser";
import Background from "../GameObjects/Background/Background";
import Bullet from "../GameObjects/Bullet/Bullet";
import Enemy from "../GameObjects/Enemy/Enemy";
import Player from "../GameObjects/Player/Player";
import CloudSpawner from "../GameObjects/Spawner/CloudSpawner";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");

        this.cloudRate = 5000;
        this.nextCloud = 0;

        this.enemyRate = 3000;
        this.nextEnemy = 0;

        this.bg = undefined;
        this.player = undefined;
        this.clouds = undefined;
        this.enemies = undefined;

    }

    preload() {
        this.bg = new Background(this, 0, 0, this.game.config.width, this.game.config.height, "desert-backgorund")
        this.player = new Player(this, 50, 25, "player", 0)
        this.clouds = new CloudSpawner(this);
    }

    create() {
        this.createGroups()
        this.addCollisions()
    }

    createGroups() {
        this.enemies = this.physics.add.group();
        this.enemies.runChildUpdate = true 
    }

    spawnClouds() {
        if (this.time.now > this.nextCloud) {
            this.nextCloud = this.time.now + this.cloudRate;
            const chooseCloud = Phaser.Math.Between(0, 100);
            const velocity = Phaser.Math.Between(150, 450);
            if (chooseCloud >= 50) {
                this.clouds.spawn("clouds-transparent", 0, velocity)
            } else {
                this.clouds.spawn("clouds", 10, velocity)
            }
        }
    }

    spawnEnemies() {
        if (this.time.now > this.nextEnemy) {
            this.nextEnemy = this.time.now + this.enemyRate;
            this.enemies.add(new Enemy(this, Phaser.Math.Between(0, this.game.config.width), -250, "enemy-small", 0))
        }
    }

    update(time, delta) {
        this.player.update()
        this.bg.update(delta)
        this.spawnClouds()
        this.spawnEnemies();

        this.enemies.getChildren().forEach((enemy) => {
            enemy.update()
        })
    }

    destroyPlayer(player, enemy) {
        player.destroy()
        player.body = null

        this.scene.start("GameOver")
    }

    destroyEnemy(bullet, enemy) {
        enemy.destroy()
        enemy.body = null
        bullet.destroy()
        bullet.body = null
    }

    addCollisions() {
        // this.physics.add.overlap(
        //     this.player,
        //     this.enemies,
        //     this.destroyPlayer,
        //     null,
        //     this
        // );

    }
}

export default GameScene;