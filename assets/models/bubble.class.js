class Bubble extends MoveableObject {
  height = 40;
  width = 40;
  bubbleLeft;
  bubbleType = 'normal';

  constructor(x, y) {
    super();
    this.y = y + 105;
    if (world.character.turnAround) {
      this.x = x;
    } else {
      this.x = x + 155;
    }
    this.bubbleLeft = world.character.turnAround;
    this.acceleration = -0.1;
    if (this.poisonBubbleAvailable()) {
      this.bubbleType = 'poison';
      this.loadImage('assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
      world.statusBarPoison.poisonCounter--;
    } else this.loadImage('assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
    this.startGravity();
    this.animateId = setInterval(() => this.update(), 100);
  }


  update() {
    if (this.bubbleLeft) this.x -= 8;
    else this.x += 8;
    this.width = this.width === 40 ? 38 : 40;
    this.height = this.height === 40 ? 38 : 40;
    if (this.outOfView()) this.destroyBubble();
  }


  outOfView() {
    return world.bubbles.length > 0 && this.y < 0 - this.height;
  }


  isHit(enemy) {
    if (enemy instanceof Jellyfish) enemy.life = enemy.life - 100;
    else if (enemy instanceof Boss) {
      if (this.bubbleType === 'poison') enemy.life = enemy.life - 20;
      else if (this.bubbleType === 'normal') enemy.life = enemy.life - 5;
    }
    this.destroyBubble();
  }


  destroyBubble() {
    this.stopGravity();
    clearInterval(this.animateId);
    this.destroy(world.bubbles, this);
  }


  poisonBubbleAvailable() {
    return world.character.bossInsight && world.statusBarPoison.poisonCounter > 0;
  }
}

