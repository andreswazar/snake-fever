// import Phaser from "phaser";
// import {store} from "./../../store/store.js";

class MultiplayerSnake {
    constructor(scene, color) {
        this.scene = scene;
        this.tileSize = 16;

        this.color = color;
        this.body = []; 
    }

    // Renders or re-renders the snake
    renderSnake(snakeObject) {
        this.destroyCurrentRender();
        
        for (let block of snakeObject) {
            this.body.push(this.scene.add.rectangle(block.x, block.y, this.tileSize, this.tileSize, this.color).setOrigin(0));
        }
    }

    destroyCurrentRender() {
        for (let block of this.body) {
            block.destroy();
        }
        this.body.length = 0; // Empties array
    }
}

export default MultiplayerSnake;