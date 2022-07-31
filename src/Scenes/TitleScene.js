import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
    constructor() {
        super("TitleScene");
    }

    preload() {

    }

    create() {

        this.text = this.add.text(30, 30, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });


        const newLocal = 56;
        this.button = this.add
            .image(this.scale.width / 2 - 220, this.scale.height - 50, "iconset", newLocal)
            .setScale(3)
            .setInteractive({ cursor: "pointer" });

        this.button.on("pointerdown", () => {
            this.actionOnClick();
        });
    }
    actionOnClick() {
        this.scene.start("GameScene")
    }



}

export default TitleScene;