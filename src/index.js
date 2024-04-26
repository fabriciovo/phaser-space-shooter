import TitleScene from "./Scenes/TitleScene";
import GameScene from "./Scenes/GameScene";
import GameOverScene from "./Scenes/GameOverScene";
import BootScene from "./Scenes/BootScene";
import FlashPlugin from "phaser3-rex-plugins/plugins/flash-plugin.js";

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    global: [
      {
        key: "rexFlash",
        plugin: FlashPlugin,
        start: true,
      },
    ],
  },
};
class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("BootScene", BootScene, false);
    this.scene.add("TitleScene", TitleScene, false);
    this.scene.add("GameScene", GameScene, false);
    this.scene.add("GameOverScene", GameOverScene, false);
    this.scene.start("BootScene");
  }
}

new Game();
