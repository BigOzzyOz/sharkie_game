class MoveableObject {
  x = 20;
  y = 100;
  height = 100;
  width = 100;
  speed = 5;
  img;
  currentImage = 0;
  currentMoveSet = [];
  imageCache = {};
  turnAround = false;
  speedDown = 0;
  acceleration = 0.005;
  applyGravity;

  constructor() {
  }

  startGravity() {
    this.applyGravity = setInterval(() => {
      if (this.isAboveGround()) {
        this.y += this.speedDown;
        this.speedDown += this.acceleration;
      } else {
        this.stopGravity();
      }
    }, 1000 / 25);
  }

  stopGravity() {
    clearInterval(this.applyGravity);
    this.speedDown = 0;
    this.applyGravity = null;
  }


  isAboveGround() {
    return this.y <= 480 - this.height;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    }
    );
    this.img = this.imageCache[this.currentImage[0]];
  }


  setAnimation(moveSet) {
    let i = this.currentImage % moveSet.length;
    let path = moveSet[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

}