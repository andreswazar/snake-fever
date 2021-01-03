import Phaser from "phaser";

import selectOgg from "./../assets/open_002.ogg";
import gameOverTheme from "./../assets/POL-foggy-forest-short.wav";

class GameOver extends Phaser.Scene {
    constructor() {
        super({key: "GameOver", active: false});
    }

    init (data) {
        // Score data passed from "Main Scene" scene
        this.score = data.score;
        this.config = data.gameConfig;
        this.title = data.title; // Allows this scene to also be used as a victory scene
    }

    preload() {
        this.load.audio("select_sound", selectOgg);
        this.load.audio("game_over_theme", gameOverTheme);
    }

    create() {
        // Sound
        this.selectSound = this.sound.add("select_sound");
        this.gameOverTheme = this.sound.add("game_over_theme", {
            volume: 1,
            loop: true,
        });

        // Play music
        this.gameOverTheme.play();
        
        // Variables
        let positionX = this.game.config.width / 8 - 10;
        let positionY = this.game.config.height / 8;
        let width = 500;
        let height = 500;
        
        // Background
        this.background = this.add.graphics({x: positionX, y: positionY});
        this.background.fillStyle("0x302C2E", 1);
        this.background.fillRoundedRect(0, 0, width, height, 15);
        
        // Title
        this.add.text(positionX + (width / 2), 200, this.title, {
            fontFamily: "Kenney Blocks",
            fontSize: '64px',
			color: '#fff'
        }).setOrigin(0.5, 0.5);
        
        // Score Text
        let scoreText = this.score < 10 ? "0" + this.score : this.score; // Appends a 0 before single digit score

        this.add.text(positionX + (width / 2), 300, "Score: " + scoreText, {
            fontFamily: "Kenney Blocks",
            fontSize: '48px',
			color: '#fff'
        }).setOrigin(0.5, 0.5);

        // Buttons
        this.createAllButtons();
    }

    // Buttons
    createAllButtons(){
        // Try again
        this.btn_again = this.createButton(220, 400, 200, 50, this.clickTryAgain, "Try Again");
    }

    createButton(positionX, positionY, width, height, callback, message) {
        // Create button graphics
        let btn = this.add.graphics({x: positionX, y: positionY});

        btn.fillStyle("0x39314B", 1);
        btn.fillRoundedRect(0, 0, width, height, 10);

        let hit_area = new Phaser.Geom.Rectangle(0, 0, width, height);
        btn.setInteractive(hit_area, Phaser.Geom.Rectangle.Contains);

        // Label
        this.add.text(positionX + (width / 2), positionY + (height / 2), message, {
            fontFamily: "Kenney Blocks",
            fontSize: '30px',
			color: '#fff'
        }).setOrigin(0.5, 0.5);

        // Events definition to change colors based on cursor position
        btn.myDownCallback = () => {
            btn.clear();
            btn.fillStyle("0x827094", 1);
            btn.fillRoundedRect(0, 0, width, height, 10);
        }

        btn.myOutCallback = () => {
            btn.clear();
            btn.fillStyle("0x39314B", 1);
            btn.fillRoundedRect(0, 0, width, height, 10);
        }

        // Event assignment
        btn.on("pointerup", callback, this);
        btn.on("pointerdown",  btn.myDownCallback, this);
        btn.on("pointerout", btn.myOutCallback, this);
        btn.on("pointerover", btn.myDownCallback, this);
        btn.on("pointerout", btn.myOutCallback, this);

        // Return graphics objects
        return btn;
    }

    // Emits custom event that MainScene is listening to
    clickTryAgain() {
        this.gameOverTheme.stop();
        this.selectSound.play();
        this.events.emit("clickTryAgain");
    }
}

export default GameOver;