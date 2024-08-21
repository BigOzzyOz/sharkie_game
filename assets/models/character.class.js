class Character extends MoveableObject {
  height = 200;
  width = 200;
  idleCounter = 0;
  swim_sound = new Audio('assets/audio/swim.mp3');
  bossInsight = false;


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

  moveSetHurtPoison = [
    'assets/img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    'assets/img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    'assets/img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    'assets/img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
  ];

  moveSetHurtSchock = [
    'assets/img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
    'assets/img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
    'assets/img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
  ];

  moveSetDeathPoison = [
    'assets/img/1.Sharkie/6.dead/1.Poisoned/1.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/2.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/3.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/4.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/5.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/6.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/7.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/8.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/9.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/10.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/11.png',
    'assets/img/1.Sharkie/6.dead/1.Poisoned/12.png'
  ];

  moveSetDeathShock = [
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/1.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/2.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/3.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/4.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/5.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/6.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/7.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/8.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/9.png',
    'assets/img/1.Sharkie/6.dead/2.Electro_shock/10.png'
  ];

  moveSetFinSlap = [
    'assets/img/1.Sharkie/4.Attack/Fin slap/1.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/2.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/3.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/4.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/5.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/6.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/7.png',
    'assets/img/1.Sharkie/4.Attack/Fin slap/8.png'
  ];

  moveSetBubbleNormal = [
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
  ];

  moveSetBubblePoison = [
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
    'assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
  ];

  constructor() {
    super();
    this.offset = {
      right: 45,
      left: 45,
      top: 100,
      bottom: 45
    };
    this.currentMoveSet = this.moveSetSwim;
    this.loadImages(this.moveSetSwim);
    this.loadImages(this.moveSetDeepIdle);
    this.loadImages(this.moveSetIdle);
    this.loadImages(this.moveSetHurtPoison);
    this.loadImages(this.moveSetHurtSchock);
    this.loadImages(this.moveSetDeathPoison);
    this.loadImages(this.moveSetDeathShock);
    this.loadImages(this.moveSetFinSlap);
    this.loadImages(this.moveSetBubbleNormal);
    this.loadImages(this.moveSetBubblePoison);
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
      if (this.isAlive() && !this.attackPressed()) {
        this.move();
      }
    }, 1000 / 60);



    setInterval(() => {
      this.swim_sound.pause();
      if (!this.isAlive()) {
        this.animateDeath();
      } else if (this.isHurt()) {
        this.animateHit();
      } else if (this.attackPressed()) {
        this.world.keyboard.SPACE ? this.animateSlap() : this.animateBubbleThrow();
      } else if (this.arrowPressed()) {
        this.animateSwim();
      } else if (this.idleCounter > 1) {
        this.animateDeepIdle();
      } else {
        this.animateIdle();
      }
    }, 100);
  }


  move() {
    this.world.camera_x = -this.x + 25;
    this.world.statusBarLife.x = -this.world.camera_x + 15;
    this.world.statusBarPoison.x = -this.world.camera_x + 200;
    this.world.statusBarCoin.x = -this.world.camera_x + 560;
    if (this.world.keyboard.RIGHTUP && this.y > 0 - 25 && this.x < this.world.canvas.width * 8 - this.width) {
      this.swimRight();
      this.swimUp();
      this.turnAround = false;
    } else if (this.world.keyboard.RIGHTDOWN && this.y < this.world.canvas.height - this.height && this.x < this.world.canvas.width * 8 - this.width) {
      this.swimRight();
      this.swimDown();
      this.turnAround = false;
    } else if (this.world.keyboard.LEFTUP && this.y > 0 - 25 && this.x > 0) {
      this.swimLeft();
      this.swimUp();
      this.turnAround = true;
    } else if (this.world.keyboard.LEFTDOWN && this.y < this.world.canvas.height - this.height && this.x > 0) {
      this.swimLeft();
      this.swimDown();
      this.turnAround = true;
    } else if (this.world.keyboard.RIGHT && this.x < this.world.canvas.width * 8 - this.width) {
      this.swimRight();
      this.turnAround = false;
    } else if (this.world.keyboard.LEFT && this.x > 0 - 25) {
      this.swimLeft();
      this.turnAround = true;
    } else if (this.world.keyboard.UP && this.y > 0 - 25) {
      this.swimUp();
    } else if (this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height) {
      this.swimDown();
    }
  }


  isAlive() {
    return this.life > 0;
  }


  isHit(enemy) {
    if (this.life < 0) {
      this.life = 0;
    } else if (!this.isHurt()) {
      this.lastHit = new Date().getTime();
      this.life -= 20;

    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 750;
  }



  arrowPressed() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN ||
      this.world.keyboard.LEFTUP || this.world.keyboard.LEFTDOWN || this.world.keyboard.RIGHTUP || this.world.keyboard.RIGHTDOWN;
  }

  attackPressed() {
    return this.world.keyboard.SPACE || this.world.keyboard.D;
  }


  playSwim() {
    if (this.swim_sound.paused) {
      this.swim_sound.play().catch(error => {
        console.log("Error playing sound:", error);
      });
    }
  }


  animateSwim() {
    this.setAnimation(this.moveSetSwim);
    this.stopGravity();
    this.playSwim();
    this.idleCounter = 0;
  }


  animateDeepIdle() {
    this.currentImage = this.currentMoveSet.includes(this.moveSetIdle[0]) ? 0 : this.currentImage;
    this.setAnimation(this.moveSetDeepIdle);
    if (this.currentImage === this.moveSetDeepIdle.length) {
      this.currentImage = 10;
    }
    !this.applyGravity ? this.startGravity() : '';
  }


  animateIdle() {
    this.idleCounter = this.idleCounter + 0.008;
    this.setAnimation(this.moveSetIdle);
  }

  animateSlap() {
    this.animateAttack(this.moveSetFinSlap);
  }

  animateBubbleThrow() {
    if (!this.bossInsight) {
      this.animateAttack(this.moveSetBubbleNormal);
    } else {
      this.animateAttack(this.moveSetBubblePoison);
    }
  }

  animateAttack(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
    if (this.currentImage === set.length) {
      this.currentImage = 0;
      this.world.keyboard.D = false;
      this.world.keyboard.SPACE = false;
    }
  }


  animateHit() {
    this.setAnimation(this.moveSetHurtPoison);
  }


  animateDeath() {
    this.currentImage = !this.currentMoveSet.includes(this.moveSetDeathPoison[0]) ? 0 : this.currentImage;
    this.setAnimation(this.moveSetDeathPoison);
    if (this.currentImage === this.moveSetDeathPoison.length) {
      this.currentImage = this.moveSetDeathPoison.length - 1;
    }
  }


  unmuteSound() {
    this.swim_sound.muted = false;
    document.removeEventListener('click', this.unmuteSound);
    document.removeEventListener('keydown', this.unmuteSound);
  }
}