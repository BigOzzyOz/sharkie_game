class Character extends MoveableObject {
  world;
  height = 200;
  width = 200;
  idleCounter = 0;
  swim_sound = new Audio('assets/audio/swim.mp3');


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

  moveSetDeepIdle = [
    'assets/img/1.Sharkie/2.Long_IDLE/I1.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I2.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I3.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I4.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I5.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I6.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I7.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I8.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I9.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I10.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I11.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I12.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I13.png',
    'assets/img/1.Sharkie/2.Long_IDLE/I14.png',
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
    this.currentMoveSet = this.moveSetSwim;
    this.loadImages(this.moveSetSwim);
    this.loadImages(this.moveSetDeepIdle);
    this.loadImages(this.moveSetIdle);
    this.img = this.imageCache[this.currentMoveSet[0]];
    this.swim_sound.muted = true;
    this.swim_sound.loop = true;
    this.swim_sound.play().catch(() => {
      console.log("Autoplay was prevented, sound will be unmuted on user interaction.");
    });
    document.addEventListener('click', () => this.unmuteSound());
    document.addEventListener('keydown', () => this.unmuteSound());
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.world.camera_x = -this.x + 25;
      if (this.world.keyboard.RIGHTUP && this.y > 0 - 25 && this.x < 720 * 8 - this.width) {
        this.y -= this.speed;
        this.x += this.speed;
        this.turnAround = false;
      } else if (this.world.keyboard.RIGHTDOWN && this.y < 480 - this.height && this.x < 720 * 8 - this.width) {
        this.x += this.speed;
        this.y += this.speed;
        this.turnAround = false;
      } else if (this.world.keyboard.LEFTUP && this.y > 0 - 25 && this.x > 0) {
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
      } else if (this.world.keyboard.LEFT && this.x > 0 - 25) {
        this.x -= this.speed;
        this.turnAround = true;
      } else if (this.world.keyboard.UP && this.y > 0 - 25) {
        this.y -= this.speed;
      } else if (this.world.keyboard.DOWN && this.y < 480 - this.height) {
        this.y += this.speed;
      }
    }, 1000 / 60);


    setInterval(() => {
      this.swim_sound.pause();
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
        this.currentMoveSet = this.moveSetSwim;
        this.setAnimation(this.moveSetSwim);
        this.stopGravity();
        this.playSwim();
        this.idleCounter = 0;
      } else if (this.idleCounter > 1) {
        this.currentImage = this.currentMoveSet.includes(this.moveSetIdle[0]) ? 0 : this.currentImage;
        this.currentMoveSet = this.moveSetDeepIdle;
        this.setAnimation(this.moveSetDeepIdle);
        if (this.currentImage === this.moveSetDeepIdle.length) {
          this.currentImage = 10;
        }
        !this.applyGravity ? this.startGravity() : '';
      } else {
        this.currentMoveSet = this.moveSetIdle;
        this.idleCounter = this.idleCounter + 0.008;
        this.setAnimation(this.moveSetIdle);
      }
    }, 100);
  }


  playSwim() {
    if (this.swim_sound.paused) {
      this.swim_sound.play().catch(error => {
        console.log("Error playing sound:", error);
      });
    }
  }

  unmuteSound() {
    this.swim_sound.muted = false;
    document.removeEventListener('click', this.unmuteSound);
    document.removeEventListener('keydown', this.unmuteSound);
  }
}