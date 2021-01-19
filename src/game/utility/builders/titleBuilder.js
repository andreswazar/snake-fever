export function addText(scene, title, size, positionX, positionY) {
    scene.add.text(positionX, positionY, title, {
        fontFamily: "Kenney Blocks",
        fontSize: size,
        color: '#fff'
    }).setOrigin(0.5, 0.5).setDepth(100);
}