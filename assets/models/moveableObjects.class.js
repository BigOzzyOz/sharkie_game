class MoveableObject {
  x = 20;
  y = 100;
  height = 100;
  width = 100;
  speed = 5;
  life = 100;
  img;
  offset = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  };
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
    this.currentMoveSet = moveSet;
    let i = this.currentImage % moveSet.length;
    let path = moveSet[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  imageDraw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  frameDraw(ctx) {
    if (this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Boss) {
      ctx.beginPath();
      ctx.strokeStyle = '#0f0';  // some color/style
      ctx.lineWidth = 3;         // thickness
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.beginPath();
      ctx.strokeStyle = '#f00';  // some color/style
      ctx.lineWidth = 3;         // thickness
      ctx.strokeRect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
    }
  }


  imageMirror(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-this.width, 0);
    this.x = this.x * -1;
  }


  imageMirrorBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }


  swimLeft() {
    this.x -= this.speed;
  }


  swimRight() {
    this.x += this.speed;
  }


  swimUp() {
    this.y -= this.speed;
  }


  swimDown() {
    this.y += this.speed;
  }


  isColliding(obj) {
    return this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom;

  }

}