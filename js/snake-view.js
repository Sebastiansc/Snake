const Board = require('./board.js');

class View {

  constructor($el) {
    this.el = $el;
    this.board = new Board();
    this.bindListener();
    this.interval = setInterval(this.step.bind(this), 100);
  }

  bindListener() {
    $(window).on("keydown", event => {
      switch(event.keyCode){
        case 37:
          this.board.snake.turn("W");
          break;
        case 38:
          this.board.snake.turn("N");
          break;
        case 39:
          this.board.snake.turn("E");
          break;
        case 40:
          this.board.snake.turn("S");
          break;
        default:
          break;
      }
    });
  }

  step(){
    this.board.snake.move();
    this.render();
  }

  renderModal(){
    const $popup = $("<div class=\"popup\"></div>");
    $popup.append($('<span>You Lose<span>'));
    const $modal = $('<div class="modal"></div>');
    $('body').append($modal);
    $(".modal").append($popup);
    clearInterval(this.interval);
  }

  renderGrid(){
    let $ul;

    for(let i = 0; i < 20; i++){
      $ul = $('<ul></ul>');

      for (let j = 0; j < 20; j++) {
        let $li = $('<li></li>').data('pos', [i,j]);
        const isSnake = this.board.isSnake([i, j]);
        if (isSnake && this.board.isApple([i, j])){
          this.board.eatApple();
        } else if (this.board.isApple([i,j])) {
          $li.addClass('apple');
        } else if (isSnake) {
          $li.addClass('snake');
        }

        $ul.append($li);
      }
      this.el.append($ul);
    }
  }

  render(){
    this.el.empty();
    if (this.board.outOfBounds() || this.board.snakeCollision()) {
      this.renderModal();
      return;
    }
    $('.score').html(this.board.snake.score);
    this.renderGrid();
  }
}

module.exports = View;
