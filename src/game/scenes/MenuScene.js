import Phaser from "phaser";
import selectOgg from "./../assets/open_002.ogg";
import titleTheme from "./../assets/POL-treasure-match-short.wav";

import {store} from "./../../store/store.js";

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

        // Variables
        let positionX = this.game.config.width / 8 - 10;
        let width = 500;
        
        // Title
        this.add.text(positionX + (width / 2), 200, "Snake Fever", {
            fontFamily: "Kenney Blocks",
            fontSize: '64px',
            color: '#fff'
        }).setOrigin(0.5, 0.5).setDepth(100);

        // Buttons
        this.createAllButtons();

        // Play title theme
        if (!this.comingFromMultiplayer) { // If the user is coming to the Menu Scene from the Multiplayer Scene, then music is already playing
            this.titleThemeMusic.play();
        }
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

    // Buttons
    createAllButtons(){
        // Play button
        this.btn_onePlayer = this.createButton(220, 400, 200, 50, this.handleClickOnePlayer, "1 Player");
        this.btn_twoPlayers = this.createButton(220, 470, 200, 50, this.handleClickTwoPlayers, "2 Players");
    }

    createButton(positionX, positionY, width, height, callback, message) {
        // Create button graphics
        let btn = this.add.graphics({x: positionX, y: positionY});

        btn.fillStyle("0x39314B", 1);
        btn.fillRoundedRect(0, 0, width, height, 10);
        btn.setDepth(100);

        let hit_area = new Phaser.Geom.Rectangle(0, 0, width, height);
        btn.setInteractive(hit_area, Phaser.Geom.Rectangle.Contains);

        // Label
        this.add.text(positionX + (width / 2), positionY + (height / 2), message, {
            fontFamily: "Kenney Blocks",
            fontSize: '30px',
			color: '#fff'
        }).setOrigin(0.5, 0.5).setDepth(101);

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