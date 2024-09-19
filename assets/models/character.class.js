class Character extends MoveableObject {
  height = 200;
  width = 200;
  idleCounter = 0;
  swim_sound = new Audio('assets/audio/swim.mp3');
  lastEnemy;
  bossInsight = false;

  moveSetIdle = characterAnimation.moveSetIdle;
  moveSetDeepIdle = characterAnimation.moveSetDeepIdle;
  moveSetSwim = characterAnimation.moveSetSwim;
  moveSetHurtPoison = characterAnimation.moveSetHurtPoison;
  moveSetHurtSchock = characterAnimation.moveSetHurtSchock;
  moveSetDeathPoison = characterAnimation.moveSetDeathPoison;
  moveSetDeathShock = characterAnimation.moveSetDeathShock;
  moveSetFinSlap = characterAnimation.moveSetFinSlap;
  moveSetBubbleNormal = characterAnimation.moveSetBubbleNormal;
  moveSetBubblePoison = characterAnimation.moveSetBubblePoison;


  constructor() {
    super();
    this.offset = {
      right: 45,
      left: 45,
      top: 100,
      bottom: 45
    };
    this.currentMoveSet = this.moveSetSwim;
    this.loadAllImages();
    this.img = this.imageCache[this.currentMoveSet[0]];
    this.muteSwimSound();
    document.addEventListener('click', () => this.unmuteSound());
    document.addEventListener('keydown', () => this.unmuteSound());
    this.animate();
  }


  loadAllImages() {
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
  }


  animate() {
    setInterval(() => this.isAlive() && !this.attackPressed() ? this.move() : '', 1000 / 60);
    setInterval(() => this.playAnimation(), 100);
  }


  playAnimation() {
    this.swim_sound.pause();
    if (!this.isAlive()) this.animateDeath();
    else if (this.isHurt()) this.animateHit();
    else if (this.attackPressed()) this.world.keyboard.SPACE ? this.animateSlap() : this.animateBubbleThrow();
    else if (this.arrowPressed()) this.animateSwim();
    else if (this.idleCounter > 1) this.animateDeepIdle();
    else this.animateIdle();
  }


  move() {
    this.moveCamera();
    if (this.canSwimRightUp()) this.swimRightUp();
    else if (this.canSwimRightDown()) this.swimRightDown();
    else if (this.canSwimLeftUp()) this.swimLeftUp();
    else if (this.canSwimLeftDown()) this.swimLeftDown();
    else if (this.canSwimRight()) this.swimRight();
    else if (this.canSwimLeft()) this.swimLeft();
    else if (this.canSwimUp()) this.swimUp();
    else if (this.canSwimDown()) this.swimDown();
  }


  moveCamera() {
    this.world.camera_x = this.world.character.turnAround ? -this.x + this.world.canvas.width - this.world.character.width - 25 : -this.x + 25;
    this.world.statusBarLife.x = -this.world.camera_x + 15;
    this.world.statusBarPoison.x = -this.world.camera_x + 200;
    this.world.statusBarCoin.x = -this.world.camera_x + 560;
  }


  canSwimRightUp() {
    return this.world.keyboard.RIGHTUP && this.y > 0 - this.offset.top && this.x < this.world.canvas.width * 6 - this.width;
  }


  swimRightUp() {
    super.swimRight();
    super.swimUp();
    this.turnAround = false;
  }


  canSwimRightDown() {
    return this.world.keyboard.RIGHTDOWN && this.y < this.world.canvas.height - this.height && this.x < this.world.canvas.width * 6 - this.width;
  }


  swimRightDown() {
    super.swimRight();
    super.swimDown();
    this.turnAround = false;
  }


  canSwimLeftUp() {
    return this.world.keyboard.LEFTUP && this.y > 0 - this.offset.top && this.x > 0;
  }


  swimLeftUp() {
    super.swimLeft();
    super.swimUp();
    this.turnAround = true;
  }


  canSwimLeftDown() {
    return this.world.keyboard.LEFTDOWN && this.y < this.world.canvas.height - this.height && this.x > 0;
  }


  swimLeftDown() {
    super.swimLeft();
    super.swimDown();
    this.turnAround = true;
  }


  canSwimRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.canvas.width * 6 - this.width;
  }


  swimRight() {
    super.swimRight();
    this.turnAround = false;
  }


  canSwimLeft() {
    return this.world.keyboard.LEFT && this.x > 0 - 25;
  }


  swimLeft() {
    super.swimLeft();
    this.turnAround = true;
  }


  canSwimUp() {
    return this.world.keyboard.UP && this.y > 0 - this.offset.top;
  }


  swimUp() {
    super.swimUp();
  }


  canSwimDown() {
    return this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height;
  }


  swimDown() {
    super.swimDown();
  }


  isAlive() {
    return this.life > 0;
  }


  isHit(enemy) {
    if (this.life < 0) this.life = 0;
    else if (this.canAttackPufferfish(enemy)) {
      enemy.life -= 100;
    }
    else if (this.canGetDamage(enemy)) {
      this.lastEnemy = enemy;
      this.lastHit = new Date().getTime();
      this.life -= 20;
    }
  }


  canGetDamage(enemy) {
    return !this.isHurt() && this.isAlive() && enemy.life > 0 && !enemy.isStunned;
  }


  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 1500;
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
    if (this.currentImage === this.moveSetDeepIdle.length) this.currentImage = 10;
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
    !this.bossInsight ? this.animateAttack(this.moveSetBubbleNormal) : this.animateAttack(this.moveSetBubblePoison);
  }


  animateAttack(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
    this.executeFinSlap();
    if (this.currentImage === set.length) {
      this.executeBubble();
      this.resetToOrigin();
    }
  }


  executeFinSlap() {
    if (this.world.keyboard.SPACE) {
      this.offset.right = this.turnAround ? 45 : 15;
      this.offset.left = this.turnAround ? 15 : 45;
      this.x = this.turnAround ? this.x - 5 : this.x + 5;
    }
  }


  executeBubble() {
    if (this.world.keyboard.D) {
      let bubble = new Bubble(this.x, this.y);
      this.world.bubbles.push(bubble);
    }
  }


  resetToOrigin() {
    this.currentImage = 0;
    this.offset.right = 45;
    this.offset.left = 45;
    this.world.keyboard.D = false;
    this.world.keyboard.SPACE = false;
  }


  animateHit() {
    this.checkLastEnemy() ? this.setAnimation(this.moveSetHurtSchock) : this.setAnimation(this.moveSetHurtPoison);
  }


  animateDeath() {
    if (this.checkLastEnemy()) {
      this.animateDeathAnimation(this.moveSetDeathShock);
      this.y += this.y + this.height < this.world.canvas.height ? 0.5 : 0;
    } else {
      this.animateDeathAnimation(this.moveSetDeathPoison);
      this.y -= this.y > 0 ? 0.5 : 0;
    }
  }


  animateDeathAnimation(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
    if (this.currentImage === set.length) this.currentImage = set.length - 1;
  }


  checkLastEnemy() {
    return this.lastEnemy.variantJellyfish === 3 || this.lastEnemy.variantJellyfish === 4;
  }


  muteSwimSound() {
    this.swim_sound.muted = true;
    this.swim_sound.loop = true;
    this.swim_sound.play().catch(() => {
      console.log("Autoplay was prevented, sound will be unmuted on user interaction.");
    });
  }


  unmuteSound() {
    this.swim_sound.muted = false;
    document.removeEventListener('click', this.unmuteSound);
    document.removeEventListener('keydown', this.unmuteSound);
  }


  canAttackPufferfish(enemy) {
    return !this.isHurt() && this.isAlive() && enemy instanceof Pufferfish && enemy.isStunned && this.world.keyboard.SPACE;
  }
}