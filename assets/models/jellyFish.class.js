class Jellyfish extends MoveableObject {
  height = 50;
  width = 50;
  variant;

  jellyLila = [
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
  ];

  jellyYellow = [
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
  ];

  jellyGreen = [
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png'
  ];

  jellyPink = [
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
    'assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png'
  ];

  constructor() {
    super();
    this.variant = Math.floor(Math.random() * 4) + 1;
    if (this.variant == 1) {
      this.loadImages(this.jellyLila);
    }
    if (this.variant == 2) {
      this.loadImages(this.jellyYellow);
    }
    if (this.variant == 3) {
      this.loadImages(this.jellyGreen);
    }
    if (this.variant == 4) {
      this.loadImages(this.jellyPink);
    }
    this.img = this.imageCache[0];
    this.x = 200 + Math.floor(Math.random() * 140);
    this.y = 50 + Math.floor(Math.random() * 200);
    this.floatHeight = this.y;
    this.state = 'sinking';
    this.counter = 0;
    this.direction = 'sinking';
    this.swimHeight;
    this.breakTime = 0.5;
    this.breakCounter = 0;
    this.animate();
  }

  update() {
    if (this.y < this.floatHeight) {
      this.img = this.imageCache[0];
      this.y += 2;
      this.direction = 'sinking';
    } else if (this.direction === 'sinking') {
      this.y += 2;
      this.img = this.img == this.imageCache[0] ? this.imageCache[2] : this.imageCache[0];
      if (this.y >= 380) {
        this.img = this.imageCache[2];
        this.direction = 'swimming';
        this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
      } else if (this.y >= 370) {
        this.img = this.imageCache[3];
      }
    } else if (this.direction === 'swimming') {
      this.y -= 7;
      this.img = this.imageCache[1];
      if (this.y <= this.swimHeight) {
        this.img = this.imageCache[3];
        this.direction = 'breaking';
        this.breakCounter = 0;
      }
    } else if (this.direction === 'breaking') {
      this.breakCounter += 0.166666667;
      this.y += 2;
      if (this.breakCounter >= this.breakTime) {
        this.img = this.imageCache[2];
        this.direction = 'swimming';
        this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
        this.breakCounter = 0;
      }
    }
  }


  animate() {
    setInterval(() => {
      this.update();
    }, 150);
  }

}