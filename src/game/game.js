import Phaser from "phaser";
import MainScene from "./scenes/MainScene.js";
import MenuScene from "./scenes/MenuScene.js";
import GameOver from "./scenes/GameOver.js";

function launch(containerId) {
    return new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerId,
        scene: [MenuScene, MainScene, GameOver],
        scale: {
            mode: Phaser.Scale.FIT,
            width: 640,
            height: 640
        }
    });
}

export default launch;
export { launch };