import Phaser from "phaser";
import KenneyBlocks from "./assets/Kenney Blocks.ttf";

import MainScene from "./scenes/MainScene.js";
import MenuScene from "./scenes/MenuScene.js";
import GameOver from "./scenes/GameOver.js";
import MultiplayerMenuScene from "./scenes/MultiplayerMenuScene.js";
import MultiplayerWaitingScene from "./scenes/MultiplayerWaitingScene.js";
import MultiplayerGameScene from "./scenes/MultiplayerGameScene.js";

function launch(containerId) {
    loadFont("Kenney Blocks", KenneyBlocks);

    return new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerId,
        scene: [MenuScene, MainScene, MultiplayerMenuScene, MultiplayerWaitingScene, MultiplayerGameScene, GameOver],
        scale: {
            mode: Phaser.Scale.FIT,
            width: 640,
            height: 640
        }
    });
}

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

export { launch };