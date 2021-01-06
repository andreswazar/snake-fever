import Phaser from "phaser";

import gameMusicOgg from "./../assets/POL-star-way-short.wav";
import gameOverOgg from "./../assets/jingles_NES00.ogg";
import greenAppleEatOgg from "./../assets/jingles_NES01.ogg";
import redAppleEatOgg from "./../assets/jingles_NES02.ogg";

import Snake from "../entities/Snake.js"
import GreenApple from "../entities/GreenApple.js";
import RedApple from "../entities/RedApple.js";
import Obstacle from "../entities/Obstacle.js";

import apiCommunicator from "./../utility/apiCommunicator.js";

class MainScene extends Phaser.Scene {
    constructor(){
        super({key:"MainScene", active: false});
    }

    preload() {
        this.load.audio("gameMusic", gameMusicOgg);
        this.load.audio("gameOver", gameOverOgg);
        this.load.audio("greenApple", greenAppleEatOgg);
        this.load.audio("redApple", redAppleEatOgg);
    }

    create() {
        // Sounds
        this.gameMusic = this.sound.add("gameMusic", {
            volume: 1,
            loop: true,
        });
        this.gameOverSound = this.sound.add("gameOver");
        this.greenAppleSound = this.sound.add("greenApple");
        this.redAppleSound = this.sound.add("redApple");

        // Entities
        this.snake = new Snake(this);
        this.redApple = new RedApple(this);
        this.obstacles = new Obstacle(this);
        this.greenApple = new GreenApple(this);

        // Play game music
        this.gameMusic.play();
    }

    update(time) {
        this.snake.update(time);
        this.greenApple.update(this.snake, this.obstacles.obstacleArray, this.redApple.redAppleArray);
        this.redApple.update(time, this.snake, this.greenApple.apple);
        this.obstacles.update(time, this.snake, this.greenApple.apple);
    }

    triggerGameOver(message) {
        this.gameMusic.stop();

        if (this.snake.score > 0) { // Sends score to backend, prevents score of 0 from being sent
            apiCommunicator.sendScoreToAPI(this.snake.score); 
        }

        if (message == "Game Over") {
            this.gameOverSound.play(); // Plays game over jingle

            this.time.addEvent({ // Shows the game over screen in 1.5 seconds
                delay: 1500,
                callback: this.showGameOver.bind(this, message),
                callbackScope: this
            });
        } else { // Message is "You Win!"
            this.time.addEvent({ // Shows the game over screen in 1.5 seconds
                delay: 1500,
                callback: this.showGameOver.bind(this, message),
                callbackScope: this
            });
        }
    }

    showGameOver(message) {
        // Show the Game Over scene as overlay
        this.scene.launch("GameOver", {score: this.snake.score, gameConfig: this.game.config, title: message});
        
        // Listen to events from the Game Over scene
        let panel = this.scene.get("GameOver");
        panel.events.on("clickTryAgain", this.handleTryAgain, this);
    }

    closeGameOver() {
        this.scene.stop("GameOver");
    }

    handleTryAgain() {
        this.closeGameOver();
        this.scene.restart();
    }
}

export default MainScene;