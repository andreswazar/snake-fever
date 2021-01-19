export function addBackground(scene, color, positionX, positionY, width, height) {
    let graphic;
    graphic = scene.add.graphics({x: positionX, y: positionY});
    graphic.fillStyle(color, 1);
    graphic.fillRoundedRect(0, 0, width, height, 15);
    
    return graphic;
}