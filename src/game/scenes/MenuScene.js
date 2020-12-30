import Phaser from "phaser";
import selectOgg from "./../assets/open_002.ogg";

class MenuScene extends Phaser.Scene {
    constructor() {
        super({key: "Menu", active: true});
    }

    preload() {
        this.load.audio("select_sound", selectOgg);
    }

    create() {
        // Sound
        this.selectSound = this.sound.add("select_sound");
        
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
        this.add.text(positionX + (width / 2), 200, "Snake Fever", {
            fontSize: '48px',
			color: '#fff'
        }).setOrigin(0.5, 0.5);

        // Buttons
        this.createAllButtons();
    }

    // Buttons
    createAllButtons(){
        // Play button
        this.btn_again = this.createButton(220, 400, 200, 50, this.handleClickPlay, "Play");
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

    // Closes current scene
    closeMenu() {
        this.scene.stop("Menu");
    }

    // Opens main game and closes menu
    handleClickPlay() {
        this.selectSound.play();
        this.closeMenu();
        this.scene.launch("MainScene");
    }
}

export default MenuScene;