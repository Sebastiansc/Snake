/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);

	$( () =>{
	  const snakeGame = $('.snake-game');
	  new View(snakeGame);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Snake {
	  constructor() {
	    this.direction = "N";
	    this.turning = false;
	    this.segments = [[10,10]];
	    this.score = 0;
	  }

	  move(){
	    let head = this.head();
	    this.turning = false;
	    let tail = this.segments.shift();
	    this.segments.push(this.updateCoordinate(head));
	  }

	  updateCoordinate(coordinate){
	    return coordinate.map( (el,idx) => {
	      return el + Snake.DIRS[this.direction][idx];
	    });
	  }

	  turn(dir){
	    const order = (a,b) => {
	      if (a < b) {
	        return -1;
	      } else if (a > b) {
	        return 1;
	      } else { return 0; }
	    };

	    if(this.turning) {
	      return;
	    } else if ("N,S" === [this.direction, dir].sort(order).join()){
	      return;
	    } else if ("E,W" === [this.direction, dir].sort(order).join()){
	      return;
	    }
	    this.turning = true;
	    this.direction = dir;
	  }

	  eat(apple){
	    this.segments.push(apple);
	    this.score += 10;
	  }

	  head(){
	    return this.segments[this.segments.length - 1];
	  }

	  collision(){
	    return this.segments.slice(0,-1).some(segment => {
	      const head = this.head();
	      return segment[0] === head[0] && segment[1] === head[1];
	    });
	  }
	}
	Snake.DIRS = {"N": [-1, 0], "E": [0,1], "S": [1,0], "W": [0,-1]};

	module.exports = Snake;


/***/ }
/******/ ]);