class BootScene extends Phaser.Scene {

	preload() {
		this.load.spritesheet('player', 'assets/player.png', { frameWidth: 16, frameHeight: 24});
		this.load.spritesheet('laser-bolts', 'assets/laser-bolts.png', { frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('power-up', 'assets/power-up.png', { frameWidth: 16, frameHeight: 16});
		//Enemies
		this.load.spritesheet('enemy-big', 'assets/enemy-big.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('enemy-medium', 'assets/enemy-medium.png', { frameWidth: 32, frameHeight: 32 });
		this.load.spritesheet('enemy-small', 'assets/enemy-small.png', { frameWidth: 16, frameHeight: 16 });

		//Background
		this.load.image('desert-backgorund', 'assets/desert-backgorund.png');
		this.load.image('clouds-transparent', 'assets/clouds-transparent.png');
		this.load.image('clouds', 'assets/clouds.png');

		//Font
		this.load.bitmapFont('vermin', 'font/vermin.png', 'font/vermin.xml');



	}

	create() {
		this.game.scene.start("TitleScene");
	}

}

export default BootScene;