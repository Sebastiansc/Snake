const Snake = require("./snake.js");

class Board {
  constructor() {
    this.snake = new Snake();
    this.apple = this.generateApple();
  }

  isSnake(coordinate){
    return this.snake.segments.some(segment => (
      segment[0] === coordinate[0] && segment[1] === coordinate[1]
    ));
  }

  isApple(coord){
    return this.apple[0] === coord[0] && this.apple[1] === coord[1];
  }

  generateApple(){
    const random = () => Math.floor(Math.random() * 19);
    let position = [random(), random()];
    while (this.isSnake(position)){
      position = [random(), random()];
    }
    this.apple = position;
    return position;
  }

  eatApple(){
    this.snake.eat(this.apple);
    this.generateApple();
  }

  outOfBounds(){
    return this.snake.segments.some( segment => (
      segment[0] < 0 || segment[0] > 19 ||
      segment[1] < 0 || segment[1] > 19
    ));
  }

  snakeCollision(){
    return this.snake.collision();
  }
}


module.exports = Board;
