class MoveableObject {
  x = 120;
  y = 200;
  height = 100;
  width = 100;
  img;

  constructor() {

  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {

  }
}