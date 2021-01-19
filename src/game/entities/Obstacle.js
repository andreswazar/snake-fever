import Phaser from "phaser";

class Obstacle {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 16;

        this.obstacleSpawnRate = 10;
        this.amountOfIntangibility = 3500; // This will make obstacles intangible for 3.5 seconds
        this.obstacleArray = [];
    }

    update(time, snake) {
        if (snake.gameOver == false) {
            this.checkForObstaclesAdding(time, snake.score);
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

    generateObstacle(time) {
        // Makes sure the obstacle doesn't spawn on top of the green apple
        let position = this.scene.positionTracker.getUniquePosition({greenApple: true});

        this.obstacleArray.push(this.scene.add.rectangle(position[0], position[1], this.tileSize, this.tileSize, 0x808080).setOrigin(0));
        this.obstacleArray[this.obstacleArray.length - 1].intangibilityTimer = time + this.amountOfIntangibility;
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
                this.scene.triggerGameOver("Game Over");
                snake.gameOver = true;
            }
        }
    }
}

export default Obstacle;