class Jellyfish extends MoveableObject {
  height = 50;
  width = 50;
  variant;

  moveSetSwimLila = [
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
  ];

  moveSetSwimYellow = [
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
  ];

  moveSetSwimGreen = [
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
  ];

  moveSetSwimPink = [
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
  ];

  constructor() {
    super();
    this.variant = Math.floor(Math.random() * 4) + 1;
    if (this.variant == 1) {
      this.currentMoveSet = this.moveSetSwimLila;
    }
    if (this.variant == 2) {
      this.currentMoveSet = this.moveSetSwimYellow;
    }
    if (this.variant == 3) {
      this.currentMoveSet = this.moveSetSwimGreen;
    }
    if (this.variant == 4) {
      this.currentMoveSet = this.moveSetSwimPink;
    }
    this.loadImages(this.currentMoveSet);
    this.x = 200 + Math.floor(Math.random() * 140);
    this.y = 50 + Math.floor(Math.random() * 200);
    this.floatHeight = this.y;
    this.direction = 'sinking';
    this.swimHeight;
    this.breakTime = 0.6;
    this.breakCounter = 0;
    this.animate();
  }


  animate() {
    setInterval(() => {
      this.update();
    }, 100);
  }


  update() {
    if (this.y < this.floatHeight) {
      this.sinkingStart();
    } else if (this.direction === 'sinking') {
      this.sinkingEnd();
    } else if (this.direction === 'swimming') {
      this.swimUp();
    } else if (this.direction === 'breaking') {
      this.swimBreak();
    }
  }


  sinkingStart() {
    !this.applyGravity ? this.startGravity() : '';
    this.img = this.imageCache[this.currentMoveSet[2]];
    this.y += 2;
    this.direction = 'sinking';
  }


  sinkingEnd() {
    this.y += 2;
    this.img = this.img == this.imageCache[this.currentMoveSet[2]] ? this.imageCache[this.currentMoveSet[3]] : this.imageCache[this.currentMoveSet[2]];
    if (this.y >= 380) {
      this.stopGravity();
      this.img = this.imageCache[this.currentMoveSet[0]];
      this.direction = 'swimming';
      this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
    } else if (this.y >= 370) {
      this.img = this.imageCache[this.currentMoveSet[3]];
    }
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


}