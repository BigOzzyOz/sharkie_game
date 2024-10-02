class Bubble extends MoveableObject {
  height = 40;
  width = 40;
  bubbleLeft;
  bubbleType = 'normal';


  /**
   * The constructor function initializes properties for a bubble trap object in a game, including
   * positioning, type, image loading, animation, and sound effects.
   * @param x - The `x` parameter in the constructor function represents the horizontal position of the
   * object being created. It is used to determine the initial x-coordinate of the object within the game
   * world.
   * @param y - The `y` parameter in the constructor function represents the vertical position of the
   * object being created. It is used to determine the initial position of the object along the y-axis on
   * the screen. In this specific code snippet, the `y` value is modified by adding 105 to it (`this.y
   */
  constructor(x, y) {
    super();
    this.y = y + 105;
    if (world.character.turnAround) this.x = x;
    else this.x = x + 155;
    this.bubbleLeft = world.character.turnAround;
    this.acceleration = -0.1;
    if (this.poisonBubbleAvailable()) {
      this.bubbleType = 'poison';
      this.loadImage('assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
      world.statusBarPoison.poisonCounter--;
    } else this.loadImage('assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
    this.startGravity();
    this.animateId = setInterval(() => this.update(), 100);
    playSound(soundEffects[0].bubble);
  }


  /**
   * The update function moves an object horizontally, changes its size, and destroys it if it goes out
   * of view.
   * @returns If the `world` does not exist or is paused, the `update()` function will return early and
   * not execute the rest of the code block.
   */
  update() {
    if (!world || world.isPaused) return;
    if (this.bubbleLeft) this.x -= 8;
    else this.x += 8;
    this.width = this.width === 40 ? 38 : 40;
    this.height = this.height === 40 ? 38 : 40;
    if (this.outOfView()) this.destroyBubble();
  }


  /**
   * The function `outOfView` checks if there are bubbles in the world and if the current object is out
   * of bounds.
   * @returns The `outOfView()` function is returning a boolean value. It checks if there are bubbles in
   * the `world` object and if the current object is out of bounds. If both conditions are true, it
   * returns `true`, otherwise it returns `false`.
   */
  outOfView() {
    return world.bubbles.length > 0 && this.isOutOfBounds();
  }


  /**
   * The function isHit takes an enemy object as a parameter and reduces its life points based on the
   * type of enemy and the type of bubble used.
   * @param enemy - The `enemy` parameter in the `isHit` function represents the target that is being
   * attacked. Depending on the type of enemy, different actions are taken when the `isHit` function is
   * called. The function checks the type of the enemy (Jellyfish, Boss, Pufferfish)
   */
  isHit(enemy) {
    if (enemy instanceof Jellyfish) enemy.life = enemy.life - 100;
    else if (enemy instanceof Boss && !enemy.isHit) {
      enemy.isHit = true;
      if (this.bubbleType === 'poison') enemy.life = enemy.life - 20;
      else if (this.bubbleType === 'normal') enemy.life = enemy.life - 2;
    }
    if (enemy instanceof Pufferfish) {
      enemy.lastHit = new Date().getTime();
      enemy.isStunned = true;
    }
    soundEffects[0].bubblePop.play();
    this.destroyBubble();
  }


  /**
   * The `destroyBubble` function stops gravity, clears the animation interval, and destroys a bubble in
   * a world.
   */
  destroyBubble() {
    this.stopGravity();
    clearInterval(this.animateId);
    this.destroy(world.bubbles, this);
  }


  /**
   * The function `poisonBubbleAvailable` checks if the boss insight is available and the poison counter
   * in the status bar is greater than 0.
   * @returns The `poisonBubbleAvailable()` function returns a boolean value based on the conditions
   * specified in the return statement. It returns `true` if the character has boss insight and the
   * poison counter in the status bar is greater than 0, otherwise it returns `false`.
   */
  poisonBubbleAvailable() {
    return world.character.bossInsight && world.statusBarPoison.poisonCounter > 0;
  }
}

