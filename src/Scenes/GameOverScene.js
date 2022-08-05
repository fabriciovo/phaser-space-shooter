import Phaser from "phaser";
class GameOverScene extends Phaser.Scene {
	constructor() {
		super("GameOverScene");

		this.gameoverText = undefined
	}

	create() {
		this.gameoverText = this.add.bitmapText(this.game.config.width / 2 - 400, this.game.config.height / 2 - 200, 'vermin', 'Game Over\nPress Enter to Restart', 68, 0);
		this.gameoverText.setOrigin(0)
		this.gameoverText.setDepth(11)
		var rect = this.add.rectangle(0,  0,this.game.config.width * 2, this.game.config.height * 2, 0x000000);
		rect.setDepth(10)
		rect.setAlpha(0.4)
		this.gameoverText.setDropShadow(4, 4, 0x000000);

		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

	}
	actionOnClick() {
		this.cameras.main.flash().on
		var theOtherScene = this.scene.get('GameScene');
		theOtherScene.restart();
	}

	update(time, delta) {
		if (Phaser.Input.Keyboard.JustDown(this.enter)) {
			this.actionOnClick()
		}
	}



}

export default GameOverScene;