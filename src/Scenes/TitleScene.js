import Phaser from "phaser";
import Background from "../GameObjects/Background/Background";

class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");

    this.startgame = undefined;
    this.title = undefined;
    this.phaserLogo = undefined;
    this.bg = undefined;
  }

  preload() {}

  create() {
    this.bg = new Background(
      this,
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      "desert-backgorund",
      0,
      50
    );
    this.title = this.add.bitmapText(
      40,
      this.game.config.height / 2 - 300,
      "vermin",
      "Space \n Shooter",
      128,
      0
    );

    this.startgame = this.add.bitmapText(
      40,
      this.game.config.height / 2 + 200,
      "vermin",
      "Press Enter to Start",
      68,
      0
    );

    this.startgame.setDropShadow(4, 4, 0x000000);
    this.title.setDropShadow(4, 4, 0x000000);

    this.enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }
  actionOnClick() {
    this.cameras.main.flash().on;
    this.scene.start("GameScene");
  }

  update(time, delta) {
    this.bg.update(delta);

    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.actionOnClick();
    }
  }
}

export default TitleScene;
