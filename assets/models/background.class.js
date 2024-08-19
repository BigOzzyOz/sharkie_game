class Background extends MoveableObject {
  x = 0;
  y = -0;
  width = 720;
  height = 480;


  constructor(imagePath, x, width, height) {
    super();
    this.x = x;
    this.width = width;
    this.height = height;
    this.loadImage(imagePath);
  }
}