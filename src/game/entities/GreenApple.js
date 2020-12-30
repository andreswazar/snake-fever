class GreenApple {
    constructor(scene) {
        this.tileSize = 16;

        this.scene = scene;
    }

    update(snake, obstacles, redApples) {
        if (!this.apple) {
            this.generateApple(snake, obstacles, redApples);
        } else {
            this.checkForAppleEating(snake, obstacles, redApples);
        }
    }

    // Makes sure the apple doesn't spawn on top of any obstacles or the snake
    getUniquePosition(snake, obstacles, redApples) {
        let positionX = 0;
        let positionY = 0;
        
        // If the position clashes with the position of another entity, continue the loop until an unique position is generated
        // eslint-disable-next-line no-constant-condition
        whileLoop: while (true) { 
            positionX = Math.floor((Math.random() * this.scene.game.config.width / this.tileSize)) * this.tileSize;
            positionY = Math.floor((Math.random() * this.scene.game.config.height / this.tileSize)) * this.tileSize;

            for (let i = 0; i < snake.body.length; i++) {
                if (positionX == snake.body[i].x && positionY == snake.body[i].y) {
                    continue whileLoop;
                }
            }            

            for (let i = 0; i < obstacles.length; i++) {
                if (positionX == obstacles[i].x && positionY == obstacles[i].y) {
                    continue whileLoop;
                }
            }

            for (let i = 0; i < redApples.length; i++) {
                if (positionX == redApples[i].x && positionY == redApples[i].y) {
                    continue whileLoop;
                }
            }
            
            break;
        } 

        return [positionX, positionY];
    }

    // Changes the position of the apple after it has been eaten
    generateApple(snake, obstacles, redApples) {
        if (this.apple) {
            this.apple.destroy();
        }

        let position = this.getUniquePosition(snake, obstacles, redApples);

        this.apple = this.scene.add.rectangle(position[0], position[1], this.tileSize, this.tileSize, 0x00ff00).setOrigin(0)
    }

    checkForAppleEating(snake, obstacles, redApples) {
        // Snake eats a green apple and grows
        if (snake.body[0].x == this.apple.x && snake.body[0].y == this.apple.y) {
            this.scene.greenAppleSound.play(); // Plays happy jingle
            
            snake.applesConsumed++;
            snake.score++;
            this.generateApple(snake, obstacles, redApples);
        }
    }
}

export default GreenApple;