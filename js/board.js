const Snake = require("./snake.js")

class Board {
  constructor() {
    this.snake = new Snake();
    this.apples = [];
  }
}


module.exports = Board;
