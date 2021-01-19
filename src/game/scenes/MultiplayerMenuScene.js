import Phaser from "phaser";

import { store } from "./../../store/store.js";
import { addText } from "../utility/builders/titleBuilder.js";
import { addButton } from "./../utility/builders/buttonBuilder.js";
import { emitNewGame } from "./../utility/socket/Socket.js";
import { connectToServer, initializeHandlers } from "./../utility/socket/Socket.js";

class MultiplayerMenuScene extends Phaser.Scene {
    constructor(){
        super({key:"MultiplayerMenuScene", active: false});
        this.alreadyConnectedToServer = false;
    }

    init (data) {
        // data is passed from "Menu" Scene
        this.mainMenuTheme = data.mainMenuTheme;
        this.selectSound = data.selectSound;
    }

    create() {
        if (!this.alreadyConnectedToServer) { // Prevents multiple handlers from being assigned
            this.alreadyConnectedToServer = true;
            connectToServer();
            initializeHandlers();
        }

        // Display Title
        addText(this, "Multiplayer", "64px", this.game.config.width * 0.5, this.game.config.height * 0.25);

        // Display Buttons
        addButton(this, "New Game", "30px", 220, 400, 200, 50, this.handleNewGame.bind(this));
        addButton(this, "Join Game", "30px", 220, 470, 200, 50, this.handleJoinGame.bind(this));
        addButton(this, "Main Menu", "30px", 220, 540, 200, 50, this.handleMainMenu.bind(this));
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
    });
}