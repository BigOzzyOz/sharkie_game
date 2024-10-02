class Barrier extends MoveableObject {

  /**
   * The constructor function initializes properties for a barrier object in a game.
   * @param x - The `x` parameter in the constructor function is used to set the initial x-coordinate of
   * an object. It determines the horizontal position of the object on the screen or canvas.
   * @param turn - The `turn` parameter in the constructor function is used to determine whether the
   * object should turn around or not. It is a boolean value that indicates the direction or orientation
   * of the object. If `turn` is true, the object will turn around; if `turn` is false, the object will
   */
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