import Phaser from "phaser";

import { addText } from "../utility/builders/titleBuilder.js";

class MultiplayerWaitingScene extends Phaser.Scene {
    constructor(){
        super({key:"MultiplayerWaitingScene", active: false});
    }

    init (data) {
        // data is passed from "Multiplayer Menu" scene
        this.title = data.title;
        this.mainMenuTheme = data.mainMenuTheme;
        this.selectSound = data.selectSound;
    }

    create() {
        // Display Title
        addText(this, this.title, "64px", this.game.config.width * 0.5, this.game.config.height * 0.25);
    }
}

export default MultiplayerWaitingScene;

// Socket handlers
export function roomCodeHandler(client, game) { // Adds the room code on the screen
    client.on("gameCode", function(gameCode) {
        // Display Title
        addText(game.scene.keys.MultiplayerWaitingScene, gameCode, "64px", game.config.width * 0.5, game.config.height * 0.40);
    });
}

export function unknownGameHandler(client) {
    client.on("unknownGame", function() {
        console.log("Unknown Game");
    });
}

export function fullGameHandler(client) {
    client.on("fullGame", function() {
        console.log("Full Game");
    });
}

export function beginGameHandler(client, game, closeMultiplayerWaiting, openMultiplayerGame) {
    client.on("beginGame", function() {
        game.scene.keys.MultiplayerWaitingScene.mainMenuTheme.stop();
        game.scene.keys.MultiplayerWaitingScene.selectSound.play();
        closeMultiplayerWaiting();
        openMultiplayerGame();
    });
}

