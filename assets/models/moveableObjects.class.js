class MoveableObject {
  x = 20;
  y = 100;
  height = 100;
  width = 100;
  speed = 5;
  img;
  currentImage = 0;
  imageCache = {};
  turnAround = false;

  constructor() {

  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path, i) => {
      let img = new Image();
      img.src = path;
      this.imageCache[i] = img;
    }
    );
  }

  moveRight() {

  }
}