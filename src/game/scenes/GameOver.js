import Phaser from "phaser";

import selectOgg from "./../assets/open_002.ogg";
import gameOverTheme from "./../assets/POL-foggy-forest-short.wav";

import {store} from "./../../store/store.js";
import { addText } from "../utility/builders/titleBuilder.js";
import { addBackground } from "../utility/builders/backgroundBuilder.js";
import { addButton } from "./../utility/builders/buttonBuilder.js";

class GameOver extends Phaser.Scene {
    constructor() {
        super({key: "GameOver", active: false});
        this.alreadyCreated = false;
    }

    init (data) {
        // data is passed from "Main Scene" scene
        this.score = data.score;
        this.title = data.title; // Allows this scene to also be used as a victory scene
        this.disableTryAgain = data.disableTryAgain; // Temporary because Multiplayer isn't fully implemented
    }

    preload() {
        this.load.audio("select_sound", selectOgg);
        this.load.audio("game_over_theme", gameOverTheme);
    }

    create() {
        if (!this.alreadyCreated) { // Prevents a bug where the music start overlapping and creating an unpleasant sound
            this.alreadyCreated = true;

            // Sound
            this.selectSound = this.sound.add("select_sound");
            this.gameOverTheme = this.sound.add("game_over_theme", {
                volume: 1,
                loop: true,
            });
        }

        // Play music
        this.gameOverTheme.play();
        
        // Display Overlay
        addBackground(this, "0x302C2E", this.game.config.width * 0.10, this.game.config.height * 0.15, this.game.config.width * 0.80, this.game.config.height * 0.70);
        
        // Display Title
        addText(this, this.title, "64px", this.game.config.width * 0.5, this.game.config.height * 0.25); // title can be "Game Over" or "You Win!" depending on game result
        
        // Display Score 
        let scoreText = "Score: ";
        scoreText += this.score < 10 ? "0" + this.score : this.score; // Appends a 0 before single digit score
        addText(this, scoreText, "50px", this.game.config.width * 0.5, this.game.config.height * 0.40);

        // Buttons
        if (!this.disableTryAgain) {
            addButton(this, "Try Again", "30px", 220, 400, 200, 50, this.clickTryAgain.bind(this));
        }

        addButton(this, "Main Menu", "30px", 220, 470, 200, 50, this.clickMenu.bind(this));
    }

    // Emits custom events that MainScene is listening to
    clickTryAgain() {
        store.state.score = 0; // Resets score back to 0
        this.gameOverTheme.stop();
        this.selectSound.play();
        this.events.emit("clickTryAgain");
    }

    clickMenu() {
        store.state.score = 0; // Resets score back to 0
        this.gameOverTheme.stop();
        this.selectSound.play();
        this.events.emit("clickMenu");
    }
}

export default GameOver;