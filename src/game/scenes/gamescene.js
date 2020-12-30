import Phaser from "phaser";

export default class GameSene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    preload() {}

    create() {
        this.add.rectangle(300, 300, 50, 50, 0x00ffff);
    }

    update() {}
}