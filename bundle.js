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

	const View = __webpack_require__(1)
	$( () =>{
	  const snakeGame = $('.snake-game');
	  new View(snakeGame);
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3)

	class Board {
	  constructor() {
	    this.snake = new Snake();
	    this.apples = [];
	  }
	}


	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Snake {
	  constructor() {
	    this.direction = "N";
	    this.segments = [[6,6]];
	  }

	  move(){
	    let head = this.segments[this.segments.length - 1];
	    let tail = this.segments.shift();
	    this.segments.push(this.updateCoordinate.bind(this, head));
	  }

	  updateCoordinate(coordinate){
	    return coordinate.map( (el,idx) => {
	      return el + Snake.DIRS[this.direction][idx];
	    })
	  }

	  turn(dir){
	    this.direction = dir;
	  }
	}
	Snake.DIRS = {"N": [0,-2], "E": [2,0], "S": [0,2], "W": [-2,0]};
	module.exports = Snake;


/***/ }
/******/ ]);