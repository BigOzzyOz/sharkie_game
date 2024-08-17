class Character extends MoveableObject {
  world;
  height = 200;
  width = 200;


  moveSetIdle = [
    'assets/img/1.Sharkie/1.IDLE/1.png',
    'assets/img/1.Sharkie/1.IDLE/2.png',
    'assets/img/1.Sharkie/1.IDLE/3.png',
    'assets/img/1.Sharkie/1.IDLE/4.png',
    'assets/img/1.Sharkie/1.IDLE/5.png',
    'assets/img/1.Sharkie/1.IDLE/6.png',
    'assets/img/1.Sharkie/1.IDLE/7.png',
    'assets/img/1.Sharkie/1.IDLE/8.png',
    'assets/img/1.Sharkie/1.IDLE/9.png',
    'assets/img/1.Sharkie/1.IDLE/10.png',
    'assets/img/1.Sharkie/1.IDLE/11.png',
    'assets/img/1.Sharkie/1.IDLE/12.png',
    'assets/img/1.Sharkie/1.IDLE/13.png',
    'assets/img/1.Sharkie/1.IDLE/14.png',
    'assets/img/1.Sharkie/1.IDLE/15.png',
    'assets/img/1.Sharkie/1.IDLE/16.png',
    'assets/img/1.Sharkie/1.IDLE/17.png',
    'assets/img/1.Sharkie/1.IDLE/18.png'
  ];

  moveSetSwim = [
    'assets/img/1.Sharkie/3.Swim/1.png',
    'assets/img/1.Sharkie/3.Swim/2.png',
    'assets/img/1.Sharkie/3.Swim/3.png',
    'assets/img/1.Sharkie/3.Swim/4.png',
    'assets/img/1.Sharkie/3.Swim/5.png',
    'assets/img/1.Sharkie/3.Swim/6.png',
  ];

  constructor() {
    super();
    this.loadImages(this.moveSetSwim);
    this.img = this.imageCache[0];
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.world.camera_x = -this.x + 75;
      if (this.world.keyboard.RIGHTUP && this.y > 0 && this.x < 720 * 8 - this.width) {
        this.y -= this.speed;
        this.x += this.speed;
        this.turnAround = false;
      } else if (this.world.keyboard.RIGHTDOWN && this.y < 480 - this.height && this.x > 720 * 8 - this.width) {
        this.x += this.speed;
        this.y += this.speed;
        this.turnAround = false;
      } else if (this.world.keyboard.LEFTUP && this.y > 0 && this.x > 0) {
        this.y -= this.speed;
        this.x -= this.speed;
        this.turnAround = true;
      } else if (this.world.keyboard.LEFTDOWN && this.y < 480 - this.height && this.x > 0) {
        this.x -= this.speed;
        this.y += this.speed;
        this.turnAround = true;
      } else if (this.world.keyboard.RIGHT && this.x < 720 * 8 - this.width) {
        this.x += this.speed;
        this.turnAround = false;
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.turnAround = true;
      } else if (this.world.keyboard.UP && this.y > 0) {
        this.y -= this.speed;
      } else if (this.world.keyboard.DOWN && this.y < 480 - this.height) {
        this.y += this.speed;
      }
    }, 1000 / 60);


    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
        this.loadImages(this.moveSetSwim);
        let i = this.currentImage % this.moveSetSwim.length;
        this.img = this.imageCache[i];
        this.currentImage++;
      }
      else {
        this.loadImages(this.moveSetIdle);
        let i = this.currentImage % this.moveSetIdle.length;
        this.img = this.imageCache[i];
        this.currentImage++;
      }
    }, 100);

  }
}