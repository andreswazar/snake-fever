import Phaser from "phaser";
import { emitNewGame } from "./../utility/Socket.js";
import { store } from "./../../store/store.js";
import { connectToServer, initializeHandlers } from "./../utility/Socket.js";

class MultiplayerMenuScene extends Phaser.Scene {
    constructor(){
        super({key:"MultiplayerMenuScene", active: false});
        this.alreadyConnectedToServer = false;
    }

    init (data) {
        // data is passed from "Main Scene" scene
        this.mainMenuTheme = data.mainMenuTheme;
        this.selectSound = data.selectSound;
    }

    create() {
        if (!this.alreadyConnectedToServer) { // Prevents multiple handlers from being assigned
            this.alreadyConnectedToServer = true;
            connectToServer();
            initializeHandlers();
        }

        // Variables
        let positionX = this.game.config.width / 8 - 10;
        let width = 500;
        
        // Title
        this.add.text(positionX + (width / 2), 200, "Multiplayer", {
            fontFamily: "Kenney Blocks",
            fontSize: '64px',
            color: '#fff'
        }).setOrigin(0.5, 0.5).setDepth(100);

        // Buttons
        this.createAllButtons();
    }

    // Buttons
    createAllButtons(){
        // Play button
        this.btn_newGame = this.createButton(210, 400, 220, 50, this.handleNewGame, "New Game");
        this.btn_joinGame = this.createButton(210, 470, 220, 50, this.handleJoinGame, "Join Game");
        this.btn_joinGame = this.createButton(210, 540, 220, 50, this.handleMainMenu, "Main Menu");
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

    // In game button handlers
    handleNewGame() {
        if (store.state.gameIsPlayable) { // Prevents user from clicking through the game code modal
            emitNewGame(); // calls socket.emit("newGame"); in Socket.js file
            this.openMultiplayerWaiting("Room Code:");
            this.closeMultiplayerMenu();
        }
    }

    handleJoinGame() {
        if (store.state.gameIsPlayable) { // Prevents user from clicking through the game code modal
            store.state.showGameCodePopupFunction();
            this.openMultiplayerWaiting("Join Game");
            this.closeMultiplayerMenu();
        }
    }

    handleMainMenu() {
        if (store.state.gameIsPlayable) { // Prevents user from clicking through the game code modal
            this.selectSound.play();
            this.closeMultiplayerMenu();
            this.openMainMenu();
        }
    }

    // Helper functions
    closeMultiplayerMenu() {
        this.scene.stop("MultiplayerMenuScene");
    }

    openMultiplayerWaiting(title) {
        this.scene.launch("MultiplayerWaitingScene", {title: title, mainMenuTheme: this.mainMenuTheme, selectSound: this.selectSound});
    }

    openMainMenu() {
        this.scene.launch("Menu", {comingFromMultiplayer: true});
    }
}

export default MultiplayerMenuScene;

// Socket handlers
export function connectionHandler(client, store) {
    client.on("connectedSuccesfully", function() {
        store.state.showAlertFunction("Connected to the server.", "success");
        store.state.hideAlertFunction();
    });
}