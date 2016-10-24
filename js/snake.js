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
