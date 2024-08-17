class Background extends MoveableObject {
  x = 0;
  y = -0;
  width = 720;
  height = 480;


  constructor(imagePath, x) {
    super();
    this.x = x;
    this.loadImage(imagePath);
  }
}