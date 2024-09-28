class Boss extends MoveableObject {
  y = 0;
  x = 420;
  height = 300;
  width = 300;
  isHit = false;
  lastAttack;
  attackPossible = true;
  startPoint;

  moveSetFloating = bossAnimation.moveSetFloating;
  moveSetIntro = bossAnimation.moveSetIntro;
  moveSetAttack = bossAnimation.moveSetAttack;
  moveSetHurt = bossAnimation.moveSetHurt;
  moveSetDead = bossAnimation.moveSetDead;

  constructor(x = 2000) {
    super();
    this.offset = {
      right: 40,
      left: 20,
      top: 140,
      bottom: 60
    };
    this.x = x;
    this.startPoint = x;
    this.loadImages(this.moveSetFloating);
    this.loadImages(this.moveSetIntro);
    this.loadImages(this.moveSetAttack);
    this.loadImages(this.moveSetHurt);
    this.loadImages(this.moveSetDead);
    this.setAnimation(this.moveSetFloating);
    this.animateId = setInterval(() => this.update(), 100);
  }


  update() {
    if (!this.world) return;
    if (this.isDead()) this.animateDeath();
    else if (this.bossIntroPlayed()) this.animateIntro();
    else if (this.isHit) this.animateHit();
    else if (this.characterIsNear() && this.attackPossible) this.animateAttack();
    else if (this.world.character.bossInsight) this.animateFloat();
  }


  checkAttack() {
    let timeExpired = new Date().getTime();
    if (timeExpired - this.lastAttack > 5000) this.attackPossible = true;
  }


  setMoveSet(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
  }


  characterIsNear() {
    let dx = this.world.character.x + this.width / 2 - (this.x + this.width / 2);
    let dy = this.world.character.y + this.height / 2 - (this.y + this.height / 2);
    if (!this.turnAround) return Math.sqrt(dx * dx + dy * dy) < 250;
    else return Math.sqrt(dx * dx + dy * dy) < 450;
  }


  bossIntroPlayed() {
    return !this.world.character.bossInsight && this.world.character.x >= this.startPoint - 720;
  }


  swimMove() {
    let dx = this.world.character.x + this.width / 2 - (this.x + this.width / 2);
    let dy = this.world.character.y + this.height / 2 - (this.y + this.height / 2);
    let distance = Math.sqrt(dx * dx + dy * dy);
    let directionX = dx / distance;
    let directionY = dy / distance;
    this.turnAround = directionX < 0 ? false : true;
    this.x += directionX * this.speed;
    if (!this.isOutOfBounds(directionY * this.speed)) this.y += directionY * this.speed;
  }


  isOutOfBounds(futureMove) {
    return this.y + futureMove <= 0 - this.offset.top || this.y + this.height + futureMove >= this.world.canvas.height;
  }


  animateDeath() {
    if (!this.dead) {
      for (let i = 0; i < 10; i++) {
        this.giveReward();
      }
    }
    this.setMoveSet(this.moveSetDead);
    if (this.currentImage === this.moveSetDead.length) {
      this.currentImage = this.moveSetDead.length - 1;
      document.getElementById('winScreen').classList.remove('op0', 'd-none');
    }
  }


  animateIntro() {
    this.x = this.startPoint - 300;
    this.setMoveSet(this.moveSetIntro);
    if (this.currentImage === this.moveSetIntro.length) this.world.character.bossInsight = true;
  }


  animateAttack() {
    this.speed = 20;
    this.setMoveSet(this.moveSetAttack);
    if (this.currentImage === this.moveSetAttack.length) {
      this.attackPossible = false;
      this.lastAttack = new Date().getTime();
    }
    this.swimMove();
  }


  animateHit() {
    this.setMoveSet(this.moveSetHurt);
    if (this.currentImage === this.moveSetHurt.length * 3) this.isHit = false;
  }


  animateFloat() {
    this.speed = 6;
    this.setMoveSet(this.moveSetFloating);
    this.swimMove();
    this.checkAttack();
  }

}

