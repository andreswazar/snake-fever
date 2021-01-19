class MultiplayerApple {
    constructor(scene, color, startX, startY) {
        this.scene = scene;

        this.color = color;
        this.tileSize = 16;
        this.apple = this.scene.add.rectangle(startX, startY, this.tileSize, this.tileSize, this.color).setOrigin(0);
    }

    renderApple(appleObject) {
        this.apple.x = appleObject.x;
        this.apple.y = appleObject.y;
    }
}

export default MultiplayerApple;