class Pufferfish extends MoveableObject {
  height = 50;
  width = 50;
  variant;
  constructor() {
    super();
    this.variant = Math.floor(Math.random() * 3) + 1;
    if (this.variant == 1) {
      this.loadImage('assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
      this.y = 100;
    }
    if (this.variant == 2) {
      this.loadImage('assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
      this.y = 200;
    }
    if (this.variant == 3) {
      this.loadImage('assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
      this.y = 300;
    }

    this.x = 340 + Math.floor(Math.random() * 100);
    this.y = 100 + Math.floor(Math.random() * 200);
  }
}