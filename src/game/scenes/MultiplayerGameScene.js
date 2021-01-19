import Phaser from "phaser";

import { store } from "./../../store/store.js";
import { sendScoreToAPI } from "../utility/api/apiCommunicator.js";
import { emitMovement } from "./../utility/socket/Socket.js";
import MultiplayerSnake from "../entities/MultiplayerSnake.js";
import MultiplayerApple from "../entities/MultiplayerApple.js";

class MultiplayerGameScene extends Phaser.Scene {
    constructor(){
        super({key:"MultiplayerGameScene", active: false});
    }

    create() {
        // Entities
        this.playerOne = new MultiplayerSnake(this, 0x4c4cff);
        this.playerTwo = new MultiplayerSnake(this, 0xff4d4d);
        this.greenApple = new MultiplayerApple(this, 0x00ff00, 320, 320);

        this.input.keyboard.on("keydown", (event) => { // Captures the event object and forwards it to a custom function
            event.preventDefault();
            emitMovement(event.keyCode);
        });
    }

    triggerGameOver(message) {
        if (store.state.score > 0) { // Sends score to backend, prevents score of 0 from being sent
            sendScoreToAPI(store.state.score); 
        }

        this.time.addEvent({ // Shows the game over screen in 1.5 seconds
            delay: 1500,
            callback: this.showGameOver.bind(this, message),
            callbackScope: this
        });
    }

    showGameOver(message) {
        // Show the Game Over scene as overlay
        this.scene.launch("GameOver", {score: store.state.score, gameConfig: this.game.config, title: message, disableTryAgain: true});
        
        // Listen to events from the Game Over scene
        let panel = this.scene.get("GameOver");
        panel.events.on("clickMenu", this.handleMainMenu, this);
    }

    closeGameOver() {
        this.scene.stop("GameOver");
    }

    closeMultiplayerGameScene() {
        this.scene.stop("MultiplayerGameScene");
    }

    handleMainMenu() {
        this.closeGameOver();
        this.closeMultiplayerGameScene();
        this.scene.launch("Menu", {comingFromMultiplayer: false}); // Keeps menu theme playing
    }
}

export default MultiplayerGameScene;

// Socket handlers
export function gameStateHandler(client, game) { // Updates the board according to the game state
    let scene = game.scene.keys.MultiplayerGameScene;
    
    client.on("gameState", function(gameState) {
        let serializedGameState = JSON.parse(gameState);
        scene.playerOne.renderSnake(serializedGameState.players[0].body);
        scene.playerTwo.renderSnake(serializedGameState.players[1].body);
        scene.greenApple.renderApple(serializedGameState.greenApple);
    });
}

export function greenAppleEatenHandler(client, store) {
    client.on("greenAppleEaten", function() {
        store.state.score += 1; // Receives a reference to Vuex store from Socket.js
    });
}

export function gameOverHandler(client, game) {
    let scene = game.scene.keys.MultiplayerGameScene;
    
    client.on("gameOver", function() {
        scene.triggerGameOver("Game Over");
    });
}