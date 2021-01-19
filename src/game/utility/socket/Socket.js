import io from "socket.io-client";
import { store } from "./../../../store/store.js";
import { connectionHandler } from "./../../scenes/MultiplayerMenuScene.js";
import { roomCodeHandler, unknownGameHandler, fullGameHandler, beginGameHandler  } from "./../../scenes/MultiplayerWaitingScene.js";
import { gameStateHandler, greenAppleEatenHandler, gameOverHandler } from "./../../scenes/MultiplayerGameScene.js";

let socket = {};

export function connectToServer() {
    socket = io("http://localhost:3000");
}

// Handlers
export function initializeHandlers() { // Registers the event handle after the game has been stored
    connectionHandler(socket, store);
    roomCodeHandler(socket, store.state.game); 
    unknownGameHandler(socket);
    fullGameHandler(socket);
    beginGameHandler(socket, store.state.game, closeMultiplayerWaitingScene, openMultiplayerGame);
    gameStateHandler(socket, store.state.game);
    greenAppleEatenHandler(socket, store);
    gameOverHandler(socket, store.state.game);

    socket.on("playerNumberAssign", playerNumberAssignHandler);
}

function playerNumberAssignHandler(playerNumber) {
    store.state.playerNumber = playerNumber;
}

// Emitters
export function emitNewGame() {
    socket.emit("newGame");
}

export function emitJoinGame(gameCode) {
    socket.emit("joinGame", gameCode);
}

export function emitMovement(keyCode) {
    socket.emit("Movement", keyCode);
}

// Helper functions
function closeMultiplayerWaitingScene() {
    store.state.game.scene.stop("MultiplayerWaitingScene");
}

function openMultiplayerGame() {
    store.state.game.scene.start("MultiplayerGameScene");
}