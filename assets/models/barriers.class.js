class Barrier extends MoveableObject {

  constructor(x, turn) {
    super();
    this.x = x;
    this.y = 0;
    this.width = 100;
    this.height = 560;
    this.turnAround = turn;
    this.loadImage('assets/img/3. Background/Barrier/3.png');
  }
}