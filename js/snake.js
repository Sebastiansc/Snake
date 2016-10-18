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
