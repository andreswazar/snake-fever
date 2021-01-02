import Phaser from "phaser";
import {store} from "./../../store/store.js";

class Snake {
    constructor(scene) {
        this.gameOver = false;
        this.deathAnimationStarted = false;

        this.tileSize = 16;
        this.lastMoveTime = 0;  //  Records the last time at which the snake moved to know when it will move again (lastMoveTime + moveInterval)
        this.moveInterval = 150; // Adjusts the rate at which the snake moves
        this.direction = Phaser.Math.Vector2.RIGHT; 
        this.lastDirection = Phaser.Math.Vector2.RIGHT; // Useful for preventing "180 degrees turns"
        this.previousPosition = []; // Useful for moving the body of the snake
        this.applesConsumed = 0; // Variable used to make the snake grow. The value here will be the starting size of the body
        this.score = 0;

        this.scene = scene;

        this.body = [];
        // Adds the initial square, which is the head
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xf0f0f0).setOrigin(0));

        scene.input.keyboard.on("keydown", (e) => { // Captures the event object and forwards it to a custom function
            this.keydown(e)
        });

        // Initializes score to 0 in the Vuex store and UI
        store.state.score = this.score;
    }

    // Snake movement
    keydown(event) { 
        switch (event.keyCode) {
            case 37: //left
                if (this.lastDirection != Phaser.Math.Vector2.RIGHT) { // Prevents doing "180 degrees turns"
                    this.direction = Phaser.Math.Vector2.LEFT;
                }
            break;
            case 38: //up
                if (this.lastDirection != Phaser.Math.Vector2.DOWN) {
                    this.direction = Phaser.Math.Vector2.UP;
                }
            break;
            case 39: //right
                if (this.lastDirection != Phaser.Math.Vector2.LEFT) {
                    this.direction = Phaser.Math.Vector2.RIGHT;
                }
            break;
            case 40: //down
                if (this.lastDirection != Phaser.Math.Vector2.UP) {
                    this.direction = Phaser.Math.Vector2.DOWN;
                }
            break;
        }
    }

    // Snake loop
    update(time) { 
        if (this.gameOver == false) { // Normal loops happens as long as the player hasn't lost the game
            if (time >= this.lastMoveTime + this.moveInterval) {
                this.lastMoveTime = time;
                this.moveHead();
                this.moveBody();
                this.checkForAppleConsumption();
                this.checkForGameOver();
            }
        } else { // If player lost, it will play a death animation only once
            if (this.deathAnimationStarted == false) {
                this.deathAnimation();
            }
        }
    }

    moveHead() {
        this.previousPosition = [this.body[0].x, this.body[0].y]; // For body movement

        this.body[0].x += this.direction.x * 16;
        this.body[0].y += this.direction.y * 16;

        this.lastDirection = this.direction;
    }

    moveBody() {
        let previousX = 0;
        let previousY = 0;
        
        for (let i = 1; i <= this.body.length - 1; i++ ) {
            previousX = this.previousPosition[0];
            previousY = this.previousPosition[1];
            this.previousPosition[0] = this.body[i].x;
            this.previousPosition[1] = this.body[i].y;

            this.body[i].x = previousX;
            this.body[i].y = previousY;
        }
    }

    checkForAppleConsumption() {
        if (this.applesConsumed > 0) { // Grows the snake after consuming green apple
            uiUpdater.updateScoreUI(this.score);

            this.applesConsumed--;
            this.body.push(this.scene.add.rectangle(this.previousPosition[0], this.previousPosition[1], this.tileSize, this.tileSize, 0xffffff).setOrigin(0));
        } else if (this.applesConsumed < 0) { // Shrinks the snake by 2 after consuming red apple or kills it
            if (this.body.length <= 2) {
                this.scene.triggerGameOver();
                this.gameOver = true;
            } else {
                this.applesConsumed += 2;
                this.body[this.body.length - 1].destroy();
                this.body[this.body.length - 2].destroy();
                this.body.length -= 2;
            }
        }
    }

    checkForGameOver() {
        // Snake dies by crashing against itself
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                this.scene.triggerGameOver();
                this.gameOver = true;
            }
        }

        // Snake dies by going off screen
        if (this.body[0].x < 0 || this.body[0].x >= this.scene.game.config.width || this.body[0].y < 0 || this.body[0].y >= this.scene.game.config.height) {
            this.scene.triggerGameOver();
            this.gameOver = true;
        }
    }

    deathAnimation() {
        this.deathAnimationStarted = true;

        const primaryColor = Phaser.Display.Color.ValueToColor(0xffffff);
        const secondaryColor = Phaser.Display.Color.ValueToColor(0x000000);

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 500,
            repeat: 0,
            yoyo: false,
            onUpdate: (tween) => {
                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
                    primaryColor, 
                    secondaryColor,
                    100,
                    value
                );
                
                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
                
                for (let i = 0; i < this.body.length; i++) {
                    this.body[i].setFillStyle(color);
                }
            }
        });

        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 500,
            repeat: 0,
            yoyo: false,
            onUpdate: () => {
                for (let i = 0; i < this.body.length; i++) {
                    this.body[i].scaleX += 0.02;
                    this.body[i].scaleY += 0.02;
                }
            }
        });
    }
}

export default Snake;