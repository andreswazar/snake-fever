import Phaser from "phaser";

class Obstacle {
    constructor(scene) {
        this.tileSize = 16;
        this.obstacleSpawnRate = 10;
        this.amountOfIntangibility = 3000; // This will make obstacles intangible for 3 seconds
        this.obstacleArray = [];

        this.scene = scene;
    }

    update(time, snake, greenApple) {
        if (snake.gameOver == false) {
            this.checkForObstaclesAdding(time, snake.score, greenApple);
            this.checkForDeathByObstacles(time, snake);
        }
    }

    checkForObstaclesAdding(time, score, greenApple) {
        if (score == this.obstacleSpawnRate) {
            // Replace obstacles by destroying all elements and emptying array
            for (let element of this.obstacleArray) {
                element.destroy();
            }
            this.obstacleArray.length = 0; // Empties array

            // Add obstacles
            for (let i = 0; i < score/2; i++) {
                this.generateObstacle(time, greenApple);
            }
            this.addFlashingWarning();

            this.obstacleSpawnRate += 10;
        }
    }

    generateObstacle(time, greenApple) {
        const position = this.getUniquePosition(greenApple);

        this.obstacleArray.push(this.scene.add.rectangle(position[0], position[1], this.tileSize, this.tileSize, 0x808080).setOrigin(0));
        this.obstacleArray[this.obstacleArray.length - 1].intangibilityTimer = time + this.amountOfIntangibility;
    }

    // Makes sure the obstacle doesn't spawn on top of the green apple
    getUniquePosition(greenApple) {
        let positionX = 0;
        let positionY = 0;
        
        do {
            positionX = Math.floor((Math.random() * this.scene.game.config.width / this.tileSize)) * this.tileSize;
            positionY = Math.floor((Math.random() * this.scene.game.config.height / this.tileSize)) * this.tileSize;
        } 
        while (positionX == greenApple.x && positionY == greenApple.y)

        return [positionX, positionY];
    }

    addFlashingWarning() {
        // Adds flashing effect for warning
        const primaryColor = Phaser.Display.Color.ValueToColor(0x808080);
        const secondaryColor = Phaser.Display.Color.ValueToColor(0x000000);
        
        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 500,
            repeat: 3,
            yoyo: true,
            onUpdate: (tween) => {
                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    primaryColor, 
                    secondaryColor,
                    100,
                    value
                );
                
                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
                
                for (let i = 0; i < this.obstacleArray.length; i++) {
                    this.obstacleArray[i].setFillStyle(color);
                }
            }
        });
    }

    checkForDeathByObstacles(time, snake) {
        // Snake dies by crashing against obstacle
        for (let element of this.obstacleArray) {
            if ( (time > element.intangibilityTimer) && (snake.body[0].x == element.x && snake.body[0].y == element.y) ) {
                this.scene.triggerGameOver();
                snake.gameOver = true;
            }
        }
    }
}

export default Obstacle;