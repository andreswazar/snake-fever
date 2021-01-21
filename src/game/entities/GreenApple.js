import {store} from "./../../store/store.js";

class GreenApple {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 16;

        this.apple = { x: 0, y: 0};
    }

    update(snake) {
        if (!this.apple) {
            this.generateApple();
        } else {
            this.checkForAppleEating(snake);
        }
    }

    // Changes the position of the apple after it has been eaten
    generateApple() {
        if (this.apple) {
            this.apple.destroy();
        }

        // Makes sure the apple doesn't spawn on top of any obstacles or the snake
        let position = this.scene.positionTracker.getUniquePosition({snake: true, obstacles: true, redApples: true});

        this.apple = this.scene.add.rectangle(position[0], position[1], this.tileSize, this.tileSize, 0x00ff00).setOrigin(0);
        this.apple.setDepth(10);
    }

    checkForAppleEating(snake) {
        // Snake eats a green apple and grows
        if (snake.body[0].x == this.apple.x && snake.body[0].y == this.apple.y) {
            this.scene.greenAppleSound.play(); // Plays happy jingle
            
            snake.applesConsumed++;
            snake.score++;
            store.state.score++, // Increases score in Vuex store to update the Current Score component
            this.generateApple();
        }
    }
}

export default GreenApple;