import Phaser from "phaser";
import selectOgg from "./../assets/open_002.ogg";
import titleTheme from "./../assets/POL-treasure-match-short.wav";

import { store } from "./../../store/store.js";
import { addText } from "./../utility/builders/titleBuilder.js";
import { addButton } from "./../utility/builders/buttonBuilder.js";

class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: "Menu", active: true});
        this.alreadyCreated = false;

        // Data for the moving lines in title screen
        this.tileSize = 16;
        this.rectangles = [];
        this.rectangleWidth = 64;
        this.rectangleHeight = 16; 
        this.nextSpawnInterval = 500;
        this.lastSpawnTime = 0;
    }

    init(data) {
        if (data.comingFromMultiplayer) {
            this.comingFromMultiplayer = true;
        } else {
            this.comingFromMultiplayer = false;
        }
    }

    preload() {
        this.load.audio("select_sound", selectOgg);
        this.load.audio("title_theme", titleTheme);
    }

    create() {
        if (!this.alreadyCreated) { // Prevents a bug where the music start overlapping and creating an unpleasant sound
            this.alreadyCreated = true;
            
            // Sound
            this.selectSound = this.sound.add("select_sound");
            this.titleThemeMusic = this.sound.add("title_theme", {
                volume: 1,
                loop: true,
            });
        }

        // Play title theme
        if (!this.comingFromMultiplayer) { // If the user is coming to the Menu Scene from the Multiplayer Menu Scene, then music is already playing
            this.titleThemeMusic.play();
        }

        // Display Title
        addText(this, "Snake Fever", "64px", this.game.config.width * 0.5, this.game.config.height * 0.25);

        // Display Buttons
        addButton(this, "1 player", "30px", 220, 400, 200, 50, this.handleClickOnePlayer.bind(this));
        addButton(this, "2 players", "30px", 220, 470, 200, 50, this.handleClickTwoPlayers.bind(this));
    }

    update(time) {
        // Create rectangles
        if (time > this.lastSpawnTime + this.nextSpawnInterval) {
            this.lastSpawnTime = time;

            this.rectangles.push(this.add.rectangle(
                -64, 
                Math.floor((Math.random() * this.game.config.height / this.tileSize)) * this.tileSize, // Random height
                this.rectangleWidth, 
                this.rectangleHeight, 
                0xf0f0f0
            ).setOrigin(0));
        }

        // Move rectangles
        for (let rectangle of this.rectangles) {
            rectangle.x += 3;
        }

        // Destroy rectangles
        this.rectangles.forEach((rectangle, index) => {
            if (rectangle.x >= this.game.config.width + 64) {                
                rectangle.destroy();
                this.rectangles.splice(index,1);
            }
        });
    }

    // Closes current scene
    closeMenu() {
        this.scene.stop("Menu");
    }

    // Opens main game and closes menu
    handleClickOnePlayer() {
        if (store.state.gameIsPlayable) { // Prevents user from clicking through the username modal
            this.titleThemeMusic.stop();
            this.selectSound.play();
            this.closeMenu();
            this.scene.launch("MainScene");
        }
    }

    // Opens multiplayer menu and closes main menu (but keeps audio)
    handleClickTwoPlayers() {
        if (store.state.gameIsPlayable) { // Prevents user from clicking through the username modal
            this.selectSound.play();
            this.closeMenu();
            this.scene.launch("MultiplayerMenuScene", {mainMenuTheme: this.titleThemeMusic, selectSound: this.selectSound});
        }
    }
}

export default MenuScene;