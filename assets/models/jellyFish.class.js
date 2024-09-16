class Jellyfish extends MoveableObject {
  height = 50;
  width = 50;
  variantJellyfish;
  groundHeight;
  currentDeadSet;


  constructor(variant = Math.floor(Math.random() * 4) + 1, x = 200 + Math.floor(Math.random() * 140), y = 50 + Math.floor(Math.random() * 200)) {
    super();
    this.offset = {
      right: 5,
      left: 5,
      top: 5,
      bottom: 5
    };
    this.variantJellyfish = variant;
    if (this.variantJellyfish == 1) this.loadAllImages(jellyFishAnimation.moveSetSwimLila, jellyFishAnimation.moveSetDeadLila);
    if (this.variantJellyfish == 2) this.loadAllImages(jellyFishAnimation.moveSetSwimYellow, jellyFishAnimation.moveSetDeadYellow);
    if (this.variantJellyfish == 3) this.loadAllImages(jellyFishAnimation.moveSetSwimGreen, jellyFishAnimation.moveSetDeadGreen);
    if (this.variantJellyfish == 4) this.loadAllImages(jellyFishAnimation.moveSetSwimPink, jellyFishAnimation.moveSetDeadPink);
    this.x = x;
    this.y = y;
    this.floatHeight = this.y;
    this.direction = 'sinking';
    this.swimHeight;
    this.breakTime = 0.6;
    this.breakCounter = 0;
    this.animateId = setInterval(() => this.update(), 100);
  }


  update() {
    if (this.life <= 0) this.death();
    else if (this.y < this.floatHeight) this.sinkingStart();
    else if (this.direction === 'sinking') this.sinkingEnd();
    else if (this.direction === 'swimming') this.swimUp();
    else if (this.direction === 'breaking') this.swimBreak();
  }


  sinkingStart() {
    !this.applyGravity ? this.startGravity() : '';
    this.img = this.imageCache[this.currentMoveSet[2]];
    this.y += 2;
    this.direction = 'sinking';
  }


  sinkingEnd() {
    this.groundHeight = this.world ? this.world.canvas.height - this.height - (this.world.canvas.height * 0.1) : 0;
    this.y += 2;
    this.img = this.img == this.imageCache[this.currentMoveSet[2]] ? this.imageCache[this.currentMoveSet[3]] : this.imageCache[this.currentMoveSet[2]];
    if (this.isAboveGround()) this.startSwimUp();
    else if (this.isNearGround()) this.prepareStartSwimUp();
  }


  isAboveGround() {
    return this.y >= this.groundHeight;
  }


  isNearGround() {
    return this.y >= this.groundHeight - (this.world.canvas.height * 0.02);
  }


  startSwimUp() {
    this.stopGravity();
    this.img = this.imageCache[this.currentMoveSet[0]];
    this.direction = 'swimming';
    this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
  }


  prepareStartSwimUp() {
    this.img = this.imageCache[this.currentMoveSet[3]];
  }


  swimUp() {
    this.y -= 6;
    this.img = this.imageCache[this.currentMoveSet[1]];
    if (this.y <= this.swimHeight) {
      this.img = this.imageCache[this.currentMoveSet[3]];
      this.direction = 'breaking';
      this.breakCounter = 0;
    }
  }


  swimBreak() {
    this.breakCounter += 0.15;
    this.y += 2;
    if (this.breakCounter >= this.breakTime) {
      this.img = this.imageCache[this.currentMoveSet[0]];
      this.direction = 'swimming';
      this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
      this.breakCounter = 0;
    }
  }


  loadAllImages(swim, dead) {
    this.currentMoveSet = swim;
    this.currentDeadSet = dead;
    this.loadImages(this.currentMoveSet);
    this.loadImages(this.currentDeadSet);
  }


  death() {
    this.life = 0;
    this.setAnimation(this.currentDeadSet);
    this.direction = 'dead';
    this.y -= 4;
    if (this.y < 0 - this.height) {
      clearInterval(this.animateId);
      this.stopGravity;
      this.destroy(world.level.enemies, this);
    }
  }


}