class PositionTracker {
    constructor(scene) {
        this.scene = scene;
        this.tileSize = 16;
        
        this.snake;
        this.obstacles;
        this.redApples;
        this.greenApple;
    }

    update(snake, obstacles, redApples, greenApple) {
        this.snake = snake;
        this.obstacles = obstacles;
        this.redApples = redApples;
        this.greenApple = greenApple;
    }

    getUniquePosition({snake = false, obstacles = false, redApples = false, greenApple = false}) {
        let positionX = 0;
        let positionY = 0;
        
        // If the position clashes with the position of another entity, continue the loop until an unique position is generated
        // eslint-disable-next-line no-constant-condition
        whileLoop: while (true) { 
            positionX = Math.floor((Math.random() * this.scene.game.config.width / this.tileSize)) * this.tileSize;
            positionY = Math.floor((Math.random() * this.scene.game.config.height / this.tileSize)) * this.tileSize;

            if (snake) {
                for (let i = 0; i < this.snake.body.length; i++) {
                    if (positionX == this.snake.body[i].x && positionY == this.snake.body[i].y) {
                        continue whileLoop;
                    }
                }
            }

            if (obstacles) {
                for (let i = 0; i < this.obstacles.length; i++) {
                    if (positionX == this.obstacles[i].x && positionY == this.obstacles[i].y) {
                        continue whileLoop;
                    }
                }
            }

            if (redApples) {
                for (let i = 0; i < this.redApples.length; i++) {
                    if (positionX == this.redApples[i].x && positionY == this.redApples[i].y) {
                        continue whileLoop;
                    }
                }
            }

            if (greenApple) {
                if (positionX == this.greenApple.x && positionY == this.greenApple.y) {
                    continue whileLoop;
                }
            }

            break;
        } 
        return [positionX, positionY];
    }
}

export default PositionTracker;