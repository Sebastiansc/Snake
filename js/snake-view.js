const Board = require('./board.js');

class View {

  constructor($el) {
    this.el = $el;
    this.board = new Board();
    this.bindListener();
    setInterval(this.step.bind(this), 5000);
  }

  bindListener() {
    $('window').keydown(event => {
      switch(event.keycode){
        case 37:
          this.board.turn("W")
          break;
        case 38:
          this.board.turn("N")
          break;
        case 39:
          this.board.turn("E")
          break;
        case 40:
          this.board.turn("S")
          break;
        default:
          break;
      }
    })
  }

  step(){
    this.board.snake.move();
    this.renderBoard();
  }

  renderBoard(){
    this.el.empty();
    let $ul;
    for(let i = 0; i < 20; i++){
      $ul = $('<ul></ul>');
      for (let j = 0; j < 20; j++) {
        let $li = $('<li></li>').data('pos', [i,j]);
        if(this.board.snake.segments.includes([i,j])){
          $li.addClass('snake');
        }
        $ul.append($li);
      }
      this.el.append($ul);
    }
  }
}

module.exports = View;
