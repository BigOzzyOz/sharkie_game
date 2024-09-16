class MoveableObject extends DrawableObjects {
  speed = 5;
  life = 100;
  offset = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  };
  speedDown = 0;
  acceleration = 0.005;
  lastHit;
  applyGravity;
  animateId;


  constructor() {
    super();
  }

  startGravity() {
    if (this.isAboveGround()) {
      this.applyGravity = setInterval(() => {
        if (this.isAboveGround()) {
          this.y += this.speedDown;
          this.speedDown += this.acceleration;
        } else {
          this.stopGravity();
        }
      }, 1000 / 25);
    }
  }


  stopGravity() {
    clearInterval(this.applyGravity);
    this.speedDown = 0;
    this.applyGravity = null;
  }


  isAboveGround() {
    let ground = this.world ? this.world.canvas.height - this.height : 1000;
    return this.y <= ground;
  }


  setAnimation(moveSet) {
    this.currentMoveSet = moveSet;
    let i = this.currentImage % moveSet.length;
    let path = moveSet[i];
    this.img = this.imageCache[path];
    this.currentImage++;
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


  destroy(arr, obj) {
    arr.splice(arr.findIndex(o => o.y === obj.y), 1);
  }


  isDead() {
    return this.life <= 0;
  }


  isOutOfBounds() {
    if (!this.world) {
      return this.y < 0 - this.height;
    } else {
      return this.y < 0 - this.height || this.y > this.world.canvas.height;
    }
  }
}