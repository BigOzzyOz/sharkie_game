class Character extends MoveableObject {
  height = 200;
  width = 200;
  idleCounter = 0;
  lastEnemy;
  bossInsight = false;


  /**
   * Character constructor.
   *
   * @constructor
   * @param {number} x - X position of the character.
   * @param {number} y - Y position of the character.
   *
   * @this {Character}
   */
  constructor() {
    super();
    this.offset = {
      right: 45,
      left: 45,
      top: 100,
      bottom: 45
    };
    this.currentMoveSet = characterAnimation.moveSetSwim;
    this.loadAllImages();
    this.img = this.imageCache[this.currentMoveSet[0]];
    this.animate();
  }


  /**
   * Loads all animations from the character animation object.
   *
   * @private
   */
  loadAllImages() {
    Object.keys(characterAnimation).forEach((key) => this.loadImages(characterAnimation[key]));
  }


  /**
   * Animates the character at 60fps if it is alive and not attacking.
   *
   * @private
   */
  animate() {
    setInterval(() => !this.isDead() && !this.attackPressed() ? this.move() : '', 1000 / 60);
    setInterval(() => this.playAnimation(), 100);
  }


  /**
   * Plays the correct animation for the character based on its current state.
   *
   * If the character is not alive, it plays the death animation.
   * If the character is hurt, it plays the hurt animation.
   * If the character is pressing the attack key, it plays the attack animation.
   * If the character is pressing a movement key, it plays the swimming animation.
   * If the character has been idle for a while, it plays the deep idle animation.
   * If the character is doing nothing, it plays the idle animation.
   *
   * @private
   */
  playAnimation() {
    if (!this.world || this.world.isPaused) return;
    if (this.isDead()) this.animateDeath();
    else if (this.isHurt()) this.animateHit();
    else if (this.attackPressed()) this.world.keyboard.SPACE ? this.animateAttack(characterAnimation.moveSetFinSlap) : this.animateBubbleThrow();
    else if (this.arrowPressed()) this.animateSwim();
    else if (this.idleCounter > 1) this.animateDeepIdle();
    else this.animateIdle();
  }


  /**
   * Moves the character based on the current keyboard input.
   *
   * It will move the character up, down, left, or right if the corresponding
   * arrow key is pressed. If two arrow keys are pressed, it will move the
   * character in the diagonal direction.
   *
   * @private
   */
  move() {
    if (!this.world || this.world.isPaused) return;
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


  /**
   * Moves the camera to the left or right of the character based on its facing direction.
   *
   * This function is called every frame when the character is alive and not paused.
   *
   * @private
   */
  moveCamera() {
    this.world.camera_x = this.world.character.turnAround ? -this.x + this.world.canvas.width - this.world.character.width - 25 : -this.x + 25;
    this.world.statusBarLife.x = -this.world.camera_x + 15;
    this.world.statusBarPoison.x = -this.world.camera_x + 200;
    this.world.statusBarCoin.x = -this.world.camera_x + 560;
  }


  /**
   * Handles the hit event when the character collides with an enemy.
   *
   * If the character is already dead, it sets the life points to 0.
   *
   * If the character can attack the pufferfish, it reduces the life points of the pufferfish by 100.
   *
   * If the character can get damage from the enemy, it reduces the life points of the character by 20 and
   * records the enemy that hit the character and the time of the hit.
   *
   * @param {Pufferfish|Jellyfish|Boss} enemy The enemy that hit the character.
   */
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


  /**
   * Checks if the character can get damage from an enemy.
   *
   * To get damage, the character must not be hurt, must be alive, the enemy must have life points greater
   * than 0, and the enemy must not be stunned.
   *
   * @param {Pufferfish|Jellyfish|Boss} enemy The enemy that is trying to attack the character.
   * @return {Boolean} If the character can get damage from the enemy.
   */

  canGetDamage(enemy) {
    return !this.isHurt() && !this.isDead() && enemy.life > 0 && !enemy.isStunned;
  }


  /**
   * Checks if the character is hurt.
   *
   * The character is hurt if the time passed since the last hit is less than 1500 milliseconds.
   *
   * @return {Boolean} If the character is hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 1500;
  }


  /**
   * Checks if any of the arrow keys are pressed.
   *
   * @return {Boolean} If any of the arrow keys are pressed.
   */
  arrowPressed() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN ||
      this.world.keyboard.LEFTUP || this.world.keyboard.LEFTDOWN || this.world.keyboard.RIGHTUP || this.world.keyboard.RIGHTDOWN;
  }


  /**
   * Checks if the character is attacking.
   *
   * The character is attacking if the 'D' key or the space bar is pressed.
   *
   * @return {Boolean} If the character is attacking.
   */
  attackPressed() {
    return this.world.keyboard.SPACE || this.world.keyboard.D;
  }


  /**
   * Animates the character swimming.
   *
   * Sets the animation to the swim set, stops gravity, and plays the swim sound effect.
   * Also resets the idle counter.
   */
  animateSwim() {
    this.setAnimation(characterAnimation.moveSetSwim);
    this.stopGravity();
    soundEffects[0].swim.paused ? playSound(soundEffects[0].swim) : '';
    this.idleCounter = 0;
  }


  /**
   * Animates the character swimming deep.
   *
   * Sets the animation to the deep idle set, and resets the current image to the first image in the
   * animation set if the current image is not already in that set.
   *
   * If the current image is at the end of the deep idle animation set, it resets the current image to
   * the 10th image in the set.
   *
   * Also starts gravity if it is not already being applied.
   */
  animateDeepIdle() {
    this.currentImage = this.currentMoveSet.includes(characterAnimation.moveSetIdle[0]) ? 0 : this.currentImage;
    this.setAnimation(characterAnimation.moveSetDeepIdle);
    if (this.currentImage === characterAnimation.moveSetDeepIdle.length) this.currentImage = 10;
    !this.applyGravity ? this.startGravity() : '';
  }


  /**
   * Animates the character doing an idle animation.
   *
   * Increments the idle counter by 0.008 and sets the animation to the idle set.
   */
  animateIdle() {
    this.idleCounter = this.idleCounter + 0.008;
    this.setAnimation(characterAnimation.moveSetIdle);
  }


  /**
   * Animates the character throwing a bubble.
   *
   * If this.bossInsight is false, calls animateAttack with the normal bubble animation set.
   * Otherwise, calls animateAttack with the poison bubble animation set.
   */
  animateBubbleThrow() {
    !this.bossInsight ? this.animateAttack(characterAnimation.moveSetBubbleNormal) : this.animateAttack(characterAnimation.moveSetBubblePoison);
  }


  /**
   * Animates the character throwing a bubble of a given type.
   *
   * Calls setAnimation with the given set of images, and executes the fin slap attack. If the current
   * image is at the end of the animation set, it executes the bubble attack and resets the position
   * to its origin.
   *
   * @param {Array<String>} set - An array of images representing the bubble animation to be played.
   */
  animateAttack(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
    this.executeFinSlap(set);
    if (this.currentImage === set.length) {
      this.executeBubble();
      this.resetToOrigin();
    }
  }


  /**
   * Adjusts the character's position and offset for the fin slap animation.
   *
   * If the spacebar is being pressed, it adjusts the character's right and left offset
   * and moves the character to the right or left depending on the direction it is facing.
   *
   * @param {Array<String>} set - An array of images representing the bubble animation to be played.
   */
  executeFinSlap(set) {
    if (this.world.keyboard.SPACE) {
      this.offset.right = this.turnAround ? 45 : 15;
      this.offset.left = this.turnAround ? 15 : 45;
      this.x = this.turnAround ? this.x - 5 : this.x + 5;
    }
  }


  /**
   * Executes the bubble throwing animation and creates a new bubble object at the character's position.
   *
   * If the 'D' key is being pressed, a new bubble object is created at the character's position and added
   * to the world's bubble list.
   */
  executeBubble() {
    if (this.world.keyboard.D) {
      let bubble = new Bubble(this.x, this.y);
      this.world.bubbles.push(bubble);
    }
  }


  /**
   * Resets the character's position and animation state to the origin.
   *
   * Resets the character's image index to 0, sets the left and right offset back to 45, and
   * sets the 'D' and 'SPACE' key states to false.
   */
  resetToOrigin() {
    this.currentImage = 0;
    this.offset.right = 45;
    this.offset.left = 45;
    this.world.keyboard.D = false;
    this.world.keyboard.SPACE = false;
  }


  /**
   * Animates the character being hit by an enemy.
   *
   * Checks which type of enemy the character was last hit by and plays the appropriate sound effect.
   * If the time since the last hit is less than 150 milliseconds, it plays a sound effect and
   * sets the character's animation set to the hurt set.
   */
  animateHit() {
    let timePassed = new Date().getTime() - this.lastHit;
    this.checkLastEnemy() ? this.setAnimation(characterAnimation.moveSetHurtSchock) : this.setAnimation(characterAnimation.moveSetHurtPoison);
    timePassed < 150 ? this.checkLastEnemy() ? playSound(soundEffects[0].electrify) : playSound(soundEffects[0].hit) : '';
  }


  /**
   * Animates the character dying after being hit by an enemy.
   *
   * Checks which type of enemy the character was last hit by and plays the appropriate death
   * animation. If the character was hit by a puffer fish, the character moves up. If the character
   * was hit by a whale, the character moves down. The character's death sound effect is also played.
   */
  animateDeath() {
    if (this.checkLastEnemy()) {
      this.animateDeathAnimation(characterAnimation.moveSetDeathShock);
      this.y += this.y + this.height < this.world.canvas.height ? 0.5 : 0;
    } else {
      this.animateDeathAnimation(characterAnimation.moveSetDeathPoison);
      this.y -= this.y > 0 ? 0.5 : 0;
    }
    this.currentImage === 1 ? soundEffects[0].death.play() : '';
  }


  /**
   * Animates the character death animation based on the given set.
   *
   * Resets the character's current image index if the character's current move set does not
   * include the first image in the given set, and sets the character's animation set to the given
   * set. If the character's current image index is equal to the length of the given set, it
   * resets the character's current image index to the last image in the set and displays the
   * "You Lose" screen.
   * @param {Array<string>} set The set of images to animate the character death with.
   */
  animateDeathAnimation(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
    if (this.currentImage === set.length) {
      this.currentImage = set.length - 1;
      world.displayLose();
    }
  }


  /**
   * Checks if the character's last enemy was a puffer fish (yellow or pink).
   * @return {boolean} If the character's last enemy was a puffer fish, true; otherwise, false.
   */
  checkLastEnemy() {
    return this.lastEnemy.variantJellyfish === 3 || this.lastEnemy.variantJellyfish === 4;
  }


  /**
   * Checks if the character is able to attack a stunned puffer fish enemy.
   *
   * Checks if the character is not hurt, is alive, the enemy is a puffer fish, the enemy is stunned, and the space bar is pressed.
   * @param {Pufferfish} enemy The enemy to attack.
   * @return {boolean} If the character can attack the enemy, true; otherwise, false.
   */
  canAttackPufferfish(enemy) {
    return !this.isHurt() && !this.isDead() && enemy instanceof Pufferfish && enemy.isStunned && this.world.keyboard.SPACE;
  }
}