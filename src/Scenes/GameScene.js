import Phaser from "phaser";
import Background from "../GameObjects/Background/Background";
import Bullet from "../GameObjects/Bullet/Bullet";
import EnemyMedium from "../GameObjects/Enemy/EnemyMedium";
import EnemySmall from "../GameObjects/Enemy/EnemySmall";
import Enemy from "../GameObjects/Enemy/EnemySmall";
import Explosion from "../GameObjects/Explosion/Explosion";
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

        this.score = undefined
        this.playerExp = undefined
        this.playerLife = undefined

        this.enemyBullets = undefined
    }

    preload() {
        this.bg = new Background(this, 0, 0, this.game.config.width, this.game.config.height, "desert-backgorund", 0, 200)
        this.player = new Player(this, 50, 25, "player", 0)
        this.clouds = new CloudSpawner(this);
        this.explosion = new Explosion(this, 50, 40, "explosion", 0)

        //Text
        this.playerLife = this.add.bitmapText(0, 0, 'vermin', 'Life: ' + this.player.life, 48, 0).setDepth(20);
        this.playerExp = this.add.bitmapText(0, 60, 'vermin', 'Exp:' + this.player.exp + " / " + "100", 48, 0).setDepth(20);
        this.score = this.add.bitmapText(this.game.config.width - 220, 0, 'vermin', 'Score: ' + this.player.score, 48, 0).setDepth(20);



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
            this.enemies.add(new EnemySmall(this, Phaser.Math.Between(0, this.game.config.width), -250, "enemy-small", 0, 1, 3, Phaser.Math.Between(250, 450)))

            const enemyMedium = new EnemyMedium(this, Phaser.Math.Between(0, this.game.config.width), -250, "enemy-small", 0, 1, 3, Phaser.Math.Between(250, 450), 350)
            this.enemies.add(enemyMedium)

            this.physics.add.overlap(
                this.player,
                enemyMedium.bullets,
                this.playerBulletCollision,
                null,
                this
            );
        }
    }

    update(time, delta) {
        this.player.update()
        this.bg.update(delta)
        this.spawnClouds()
        this.spawnEnemies();

        this.updateTexts()
        this.enemies.getChildren().forEach((enemy) => {
            enemy.update()
        })
    }

    updateTexts() {
        this.playerLife.text = 'Life: ' + this.player.life
        this.playerExp.text = 'Exp: ' + this.player.exp + " / " + "100";
        this.score.text = 'Score: ' + this.player.score;
    }

    playerCollision(player, enemy) {
        this.cameras.main.shake(200);
        player.hit(enemy.damage)
        enemy._destroy()
    }

    playerBulletCollision(player, enemyBullet) {
        this.cameras.main.shake(200);
        player.hit(1)
        enemyBullet.destroy()
    }

    enemyCollision(bullet, enemy) {
        enemy.hit(this.player.damage)
        bullet.destroy()
    }

    addCollisions() {
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.playerCollision,
            null,
            this
        );



        this.physics.add.overlap(
            this.player.bullets,
            this.enemies,
            this.enemyCollision,
            null,
            this
        );

    }
}

export default GameScene;