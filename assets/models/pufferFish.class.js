class Pufferfish extends MoveableObject {
  height = 50;
  width = 50;


  moveSetSwim1 = [
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
  ];

  moveSetSwim2 = [
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
  ];

  moveSetSwim3 = [
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
    'assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
  ];


  variantPufferfish;
  constructor() {
    super();
    this.offset = {
      right: 5,
      left: 5,
      top: 10,
      bottom: 5
    };
    this.variantPufferfish = Math.floor(Math.random() * 3) + 1;
    if (this.variantPufferfish == 1) {
      this.currentMoveSet = this.moveSetSwim1;
    }
    if (this.variantPufferfish == 2) {
      this.currentMoveSet = this.moveSetSwim2;

    }
    if (this.variantPufferfish == 3) {
      this.currentMoveSet = this.moveSetSwim3;
    }
    this.loadImages(this.currentMoveSet);
    this.x = 340 + Math.floor(Math.random() * 100);
    this.y = 100 + Math.floor(Math.random() * 200);
    this.animateId = setInterval(() => {
      this.setAnimation(this.currentMoveSet);
    }, 100);
  }


}