import Phaser from "phaser";

import { addBackground } from "./backgroundBuilder.js";
import { addText } from "./titleBuilder.js";

export function addButton(scene, message, size, positionX, positionY, width, height, callback) {
    // "0x39314B"
    // Create button graphics
    let btn = addBackground(scene, "0x39314B", positionX, positionY, width, height);
    btn.setDepth(99);

    let clickArea = new Phaser.Geom.Rectangle(0, 0, width, height);
    btn.setInteractive(clickArea, Phaser.Geom.Rectangle.Contains);

    // Label
    addText(scene, message, size, positionX + (width * 0.5), positionY + (height * 0.5)); // Middle of the button

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
}