import Phaser from "phaser";

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
        // Variables
        let positionX = this.game.config.width / 8 - 10;
        let width = 500;
        
        // Title
        this.add.text(positionX + (width / 2), 200, this.title, {
            fontFamily: "Kenney Blocks",
            fontSize: '64px',
            color: '#fff'
        }).setOrigin(0.5, 0.5).setDepth(100);

        // Buttons
        // this.createAllButtons();
    }
}

export default MultiplayerWaitingScene;

// Socket handlers
export function roomCodeHandler(client, game) { // Adds the room code on the screen
    client.on("gameCode", function(gameCode) {
        console.log(gameCode);

        // Variables
        let positionX = game.config.width / 8 - 10;
        let width = 500;

        game.scene.keys.MultiplayerWaitingScene.add.text(positionX + (width / 2), 270, gameCode, {
            fontFamily: "Kenney Blocks",
            fontSize: '64px',
            color: '#fff'
        }).setOrigin(0.5, 0.5).setDepth(100);
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