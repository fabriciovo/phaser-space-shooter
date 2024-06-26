import Phaser from "phaser";
import Background from "../GameObjects/Background/Background";
import EnemyMedium from "../GameObjects/Enemy/EnemyMedium";
import EnemySmall from "../GameObjects/Enemy/EnemySmall";
import Explosion from "../GameObjects/Explosion/Explosion";
import Player from "../GameObjects/Player/Player";
import PowerUp from "../GameObjects/PowerUp/Powerup";
import CloudSpawner from "../GameObjects/Spawner/CloudSpawner";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

    this.cloudRate = 5000;
    this.nextCloud = 0;

    this.enemyMediumRate = 5000;
    this.nextEnemyMedium = 0;
    this.enemySmallRate = 2000;
    this.nextEnemySmall = 0;
    this.nextPowerUp = 3000;
    this.nextWave = 10000;
    this.waveRate = 10000;
    this.bg = undefined;
    this.player = undefined;
    this.clouds = undefined;
    this.enemies = undefined;

    this.score = undefined;
    this.playerExp = undefined;
    this.playerLife = undefined;

    this.enemyBullets = undefined;

    this.powerUps = undefined;

    this.wave = 1;
  }

  preload() {
    this.bg = new Background(
      this,
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      "desert-backgorund",
      0,
      200
    );
    this.player = new Player(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2,
      "player",
      0
    );
    this.clouds = new CloudSpawner(this);

    //Text
    this.playerLife = this.add
      .bitmapText(0, 0, "vermin", "Life: " + this.player.life, 48, 0)
      .setDepth(20);
    this.score = this.add
      .bitmapText(0, 50, "vermin", "Score: " + this.player.score, 48, 0)
      .setDepth(20);
    this.wave = 1;
  }

  create() {
    this.createGroups();
    this.addCollisions();
  }

  createGroups() {
    this.enemies = this.physics.add.group();
    this.enemies.runChildUpdate = true;

    this.powerUps = this.physics.add.group();
    this.powerUps.runChildUpdate = true;
  }

  updateWave() {
    if (this.time.now > this.nextWave && this.wave < 4) {
      this.nextWave = this.time.now + this.waveRate;
      this.wave++;
    }
  }

  spawnClouds() {
    if (this.time.now > this.nextCloud) {
      this.nextCloud = this.time.now + this.cloudRate;
      const chooseCloud = Phaser.Math.Between(0, 100);
      const velocity = Phaser.Math.Between(150, 450);
      if (chooseCloud >= 50) {
        this.clouds.spawn("clouds-transparent", 0, velocity);
      } else {
        this.clouds.spawn("clouds", 10, velocity);
      }
    }
  }

  spawnPowerUps() {
    if (this.time.now > this.nextPowerUp) {
      this.nextPowerUp =
        this.time.now + Phaser.Math.Between(3000 / this.wave, 5000 / this.wave);
      this.powerUps.add(
        new PowerUp(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          -250,
          "power-up",
          0
        )
      );
    }
  }

  spawnEnemyMedium() {
    if (this.time.now > this.nextEnemyMedium) {
      this.nextEnemyMedium =
        this.wave >= 3
          ? this.time.now + 1000
          : this.time.now + this.enemyMediumRate;

      for (var i = 0; i < this.wave; i++) {
        const life = Phaser.Math.Between(1, this.wave + 4);
        const damage = Phaser.Math.Between(1, this.wave + 2);
        const enemyMedium = new EnemyMedium(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          -250,
          "enemy-medium",
          0,
          damage,
          life,
          Phaser.Math.Between(250, 450),
          350
        );

        this.enemies.add(enemyMedium);

        this.physics.add.overlap(
          this.player,
          enemyMedium.bullets,
          this.playerBulletCollision,
          null,
          this
        );
      }
    }
  }
  spawnEnemySmall() {
    if (this.time.now > this.nextEnemySmall) {
      this.nextEnemySmall = this.time.now + this.enemySmallRate;
      for (var i = 0; i < this.wave; i++) {
        const life = Phaser.Math.Between(1, this.wave + 1);
        const damage = Phaser.Math.Between(1, this.wave + 1);
        this.enemies.add(
          new EnemySmall(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            -250,
            "enemy-small",
            0,
            damage,
            life,
            Phaser.Math.Between(250 * this.wave, 450 * this.wave)
          )
        );
      }
    }
  }

  update(time, delta) {
    this.player.update();
    this.bg.update(delta);
    this.spawnClouds();
    this.spawnPowerUps();
    this.spawnEnemySmall();
    this.spawnEnemyMedium();
    this.updateTexts();
    this.updateWave();
    this.enemies.getChildren().forEach((enemy) => {
      enemy.update();
    });

    this.powerUps.getChildren().forEach((powerup) => {
      powerup.update();
    });

    if (this.player.dead) {
      this.gameOver();
    }
  }

  updateTexts() {
    this.playerLife.text = "Life: " + this.player.life;
    this.score.text = "Score: " + this.player.score;
  }

  playerCollision(player, enemy) {
    this.cameras.main.shake(200);
    player.hit(enemy.damage);
    enemy._destroy();
  }

  playerBulletCollision(player, enemyBullet) {
    this.cameras.main.shake(200);
    player.hit(1);

    enemyBullet.destroy();
  }

  enemyCollision(bullet, enemy) {
    enemy.hit(this.player.damage);
    bullet.destroy();
    if (enemy.dead) {
      this.player.score += 1;
    }
  }

  playerPowerUp(player, powerUp) {
    player.updateLevel(1);
    powerUp.destroy();
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

    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.playerPowerUp,
      null,
      this
    );
  }
}

export default GameScene;
