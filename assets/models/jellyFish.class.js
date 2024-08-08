class Jellyfish extends MoveableObject {
  x = 240;
  height = 50;
  width = 50;

  variant;
  constructor() {
    super();
    this.variant = Math.floor(Math.random() * 4) + 1;
    if (this.variant == 1) {
      this.loadImage('assets/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
      this.y = 50;
    }
    if (this.variant == 2) {
      this.loadImage('assets/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
      this.y = 100;
    }
    if (this.variant == 3) {
      this.loadImage('assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png');
      this.y = 150;
    }
    if (this.variant == 4) {
      this.loadImage('assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png');
      this.y = 200;
    }
  }

}