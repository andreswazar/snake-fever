import Phaser from "phaser";

class RedApple {
    constructor(scene) {
        this.tileSize = 16;
        this.maxAliveTime = 43000;
        this.maxSpawnInterval = 23000;
        this.nextSpawnInterval = Math.random() * this.maxSpawnInterval; // Gets any time between 0 and 23 seconds
        this.lastSpawnTime = 0;
        this.amountOfIntangibility = 3500; // This will make red apples intangible for 3.5 seconds
        this.redAppleArray = [];

        this.scene = scene;
    }

    update(time, snake, greenApple) {
        if (snake.gameOver == false) {
            this.checkForRedApplesAdding(time, greenApple);
            this.checkForRedApplesTimer(time);
            this.checkForRedApplesConsumption(time, snake);
        }
    }

    // Makes sure the red apple doesn't spawn on top of the green apple
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

    // Generates a red apple by adding it to an array
    // Sets the amount of time it will be alive for
    // Sets intangibility period
    generateRedApple(time, greenApple) {
        const position = this.getUniquePosition(greenApple);

        this.redAppleArray.push(this.scene.add.rectangle(position[0], position[1], this.tileSize, this.tileSize, 0xFF0000).setOrigin(0));
        this.redAppleArray[this.redAppleArray.length - 1].aliveTime = time + (Math.random() * (this.maxAliveTime - 23000) + 23000); // Min value is 23000
        this.redAppleArray[this.redAppleArray.length - 1].intangibilityTimer = time + this.amountOfIntangibility;
    }

    // Red apples get added to the game over time
    checkForRedApplesAdding(time, greenApple) {
        if (time > this.lastSpawnTime + this.nextSpawnInterval) {
            this.generateRedApple(time, greenApple);
            this.addFlashingWarning();

            this.nextSpawnInterval = (Math.random() * (this.maxSpawnInterval - 13000) + 13000); // Min value is 13000
            this.lastSpawnTime = time;
        }
    }

    // Will harm the snake if it eats an apple which intangibility period already passed
    checkForRedApplesConsumption(time, snake) {
        this.redAppleArray.forEach((element, index) => {
            if ( (time > element.intangibilityTimer) && (snake.body[0].x == element.x && snake.body[0].y == element.y) ) {
                this.scene.redAppleSound.play(); // Plays sad jingle
                
                snake.applesConsumed -= 2; // Tells the Snake object to decrease the snake size by 2
                
                element.destroy(); // Removes the red apple from the game
                this.redAppleArray.splice(index,1);
            }
        });
    }

    // Apples only stay on the game for a set amount of time, this function removes them after that time has passed
    checkForRedApplesTimer(time) {
        this.redAppleArray.forEach((element, index) => {
            if (time > element.aliveTime) {                
                element.destroy();
                this.redAppleArray.splice(index,1);
            }
        });
    }

    addFlashingWarning() {
        // Adds flashing effect for warning while red apples are harmless
        const primaryColor = Phaser.Display.Color.ValueToColor(0xff0000);
        const secondaryColor = Phaser.Display.Color.ValueToColor(0x000000);
        
        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 490,
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
                let target = this.redAppleArray[this.redAppleArray.length - 1]; // Only last added red apple flashes
                if (target) {
                    this.redAppleArray[this.redAppleArray.length - 1].setFillStyle(color);
                }
            }
        });
    }
}

export default RedApple;