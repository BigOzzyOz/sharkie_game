class Pufferfish extends MoveableObject {
  height = 50;
  width = 50;
  variantPufferfish;
  moveSetTransition;
  moveSetBubbleSwim;
  moveSetDead;
  maxLeft;
  maxRight;
  transition = false;
  isStunned = false;
  lastHit;


  /**
   * Creates a new instance of Pufferfish class
   * @param {number} [variant=1] - variant of pufferfish (1-3)
   * @param {number} [x=340] - x position of the object
   * @param {number} [y=100] - y position of the object
   */
  constructor(variant = Math.floor(Math.random() * 3) + 1, x = 340 + Math.floor(Math.random() * 100), y = 100 + Math.floor(Math.random() * 200)) {
    super();
    this.offset = {
      right: 5,
      left: 5,
      top: 5,
      bottom: 5
    };
    this.variantPufferfish = variant;
    this.setAllImages(this.variantPufferfish);
    this.loadAllImages();
    this.x = x;
    this.y = y;
    this.maxLeft = this.x - 100 - Math.floor(Math.random() * 200);
    this.maxRight = this.x + 100 + Math.floor(Math.random() * 200);
    this.animateId = setInterval(() => this.update(), 100);
  }


  /**
   * Updates the state of the pufferfish
   *
   * This function is called every frame and is responsible for updating the state of the pufferfish.
   * The state of the pufferfish can be one of the following:
   * - dead: the pufferfish is dead
   * - bubbleUp: the pufferfish is above the character
   * - bubbleDown: the pufferfish is below the character
   * - stunned: the pufferfish is stunned
   * - swim: the pufferfish is swimming
   *
   * The function first checks if the world is paused or if the pufferfish is dead.
   * If either condition is true, the function returns.
   * If the pufferfish is above the character, it calls the animateBubbleUp function.
   * If the pufferfish is below the character, it calls the animateBubbleDown function.
   * If the pufferfish is stunned, it calls the animateStun function.
   * If none of the above conditions are true, it calls the animateSwim function.
   */
  update() {
    if (!this.world || this.world.isPaused) return;
    if (this.isDead()) this.animateDeath();
    else if (this.characterNear()) this.animateBubbleUp();
    else if (this.characterFar()) this.animateBubbleDown();
    else if (this.isStunned) this.animateStun();
    else this.animateSwim();
  }


  /**
   * Sets all the move sets for the pufferfish
   *
   * @param {string} variant - the name of the pufferfish variant
   */
  setAllImages(variant) {
    this.currentMoveSet = this.loadMoveSet(variant, 'moveSetSwim');
    this.moveSetSwim = this.currentMoveSet;
    this.moveSetTransition = this.loadMoveSet(variant, 'moveSetTransition');
    this.moveSetBubbleSwim = this.loadMoveSet(variant, 'moveSetBubbleSwim');
    this.moveSetDead = this.loadMoveSet(variant, 'moveSetDead');
  }


  /**
   * Loads the move set for the pufferfish
   *
   * @param {string} variant - the name of the pufferfish variant
   * @param {string} moveSetKey - the key of the move set to load
   * @return {string[]} - the move set images
   */
  loadMoveSet(variant, moveSetKey) {
    let images = `${pufferFishAnimation[`${moveSetKey}${variant}`]}`;
    return images.split(',');
  }


  /**
   * Loads all the move sets for the pufferfish
   *
   * It loads the move set transition, bubble swim, dead, swim and current move set
   */
  loadAllImages() {
    this.loadImages(this.moveSetTransition);
    this.loadImages(this.moveSetBubbleSwim);
    this.loadImages(this.moveSetDead);
    this.loadImages(this.moveSetSwim);
    this.loadImages(this.currentMoveSet);
  }


  /**
   * Checks if the character is near the pufferfish
   *
   * A character is considered near the pufferfish if it is within 150 pixels of
   * the pufferfish horizontally and vertically, and if the pufferfish is not
   * transitioning or stunned.
   *
   * @return {boolean} - true if the character is near, false otherwise
   */
  characterNear() {
    if (!this.world) return false;
    const distanceX = Math.abs(this.world.character.x + 100 - this.x + 25);
    const distanceY = Math.abs(this.world.character.y + 100 - this.y + 25);
    return distanceX <= 150 && distanceY <= 150 && !this.transition && !this.isStunned;
  };


  /**
   * Checks if the character is far from the pufferfish
   *
   * A character is considered far from the pufferfish if it is more than 150
   * pixels away from it horizontally or vertically, and if the pufferfish is
   * transitioning or not stunned.
   *
   * @return {boolean} - true if the character is far, false otherwise
   */
  characterFar() {
    if (!this.world) return false;
    const distanceX = Math.abs(this.world.character.x + 100 - this.x + 25);
    const distanceY = Math.abs(this.world.character.y + 100 - this.y + 25);
    return (distanceX > 150 || distanceY > 150) && this.transition && !this.isStunned;
  }


  /**
   * Animates the death of the pufferfish
   *
   * When called, this function will animate the death of the pufferfish. If the
   * pufferfish is not dead, it will give a reward and play a sound effect. It
   * will then move the pufferfish up or down depending on its current position
   * and whether it is bubbled up or not. If the pufferfish is no longer above
   * ground, it will set its image to the third image in the moveSetDead array.
   * If the pufferfish is out of bounds, it will clear the animation interval and
   * delete itself from the world.
   */
  animateDeath() {
    if (!this.dead) {
      this.giveReward();
      soundEffects[0].slap.play();
    }
    this.life = 0;
    this.isBubbledUp() ? this.y -= 15 : this.y += 15;
    this.isBubbledUp() ? this.x -= 15 : this.x += 15;
    if (!this.isAboveGround()) this.loadImage(this.moveSetDead[2]);
    if (this.isOutOfBounds()) {
      clearInterval(this.animateId);
      this.destroy(world.level.enemies, this);
    }
  }


  /**
   * Checks if the pufferfish is bubbled up
   *
   * Checks if the current image of the pufferfish is the first image in the
   * moveSetDead array, which is the bubbled up image.
   *
   * @return {boolean} - true if the pufferfish is bubbled up, false otherwise
   */
  isBubbledUp() {
    return this.img.attributes[0].value === this.moveSetDead[0];
  }


  /**
   * Animates the pufferfish bubbling up
   *
   * Animates the pufferfish bubbling up by setting the current image to the
   * first image in the moveSetTransition array and setting the animation to the
   * same array. If the pufferfish is already in the transition state, it will
   * continue from the current image. If the pufferfish is not in the transition
   * state, it will start from the beginning of the animation.
   */
  animateBubbleUp() {
    this.currentImage = !this.currentMoveSet.includes(this.moveSetTransition[0]) ? 0 : this.currentImage;
    this.setAnimation(this.moveSetTransition);
    this.transition = this.currentImage >= this.moveSetTransition.length ? true : false;
  }


  /**
   * Animates the pufferfish bubbling down
   *
   * Animates the pufferfish bubbling down by setting the current image to the
   * last image in the moveSetTransition array and setting the animation to the
   * same array. If the pufferfish is not in the transition state, it will start
   * from the end of the animation. If the pufferfish is already in the
   * transition state, it will continue from the current image. The animation
   * will be reversed and the transition boolean will be set to true until the
   * animation is finished.
   */
  animateBubbleDown() {
    this.currentImage = !this.currentMoveSet.includes(this.moveSetTransition[0]) ? 5 : this.currentImage;
    this.setAnimation(this.moveSetTransition);
    this.currentImage = this.currentImage - 2;
    this.transition = this.currentImage === 0 ? false : true;
  }


  /**
   * Animates the pufferfish stunned state
   *
   * Animates the pufferfish stunned state by loading the dead image if the
   * pufferfish has been hit within the last 3 seconds. If the hit was greater
   * than 3 seconds ago, the pufferfish's isStunned boolean is set to false.
   */
  animateStun() {
    let timeExpired = new Date().getTime() - this.lastHit;
    if (timeExpired <= 3000) {
      this.currentMoveSet.includes(this.moveSetSwim[0]) ? this.loadImage(this.moveSetDead[1]) : this.loadImage(this.moveSetDead[0]);
    } else {
      this.isStunned = false;
    }
  }


  /**
   * Animates the pufferfish swimming animation
   *
   * Animates the pufferfish swimming animation by loading the correct move set
   * based on the current state of the pufferfish. If the pufferfish is in the
   * transition state, it will load the bubble swim animation. Otherwise, it
   * will load the regular swim animation. It will then call either the swimLeft
   * or swimRight function to animate the pufferfish moving left or right.
   */
  animateSwim() {
    this.currentMoveSet = this.transition ? this.moveSetBubbleSwim : this.moveSetSwim;
    this.setAnimation(this.currentMoveSet);
    if (this.turnAround) {
      this.swimRight();
    } else {
      this.swimLeft();
    }
  }


  /**
   * Animates the pufferfish swimming to the left
   *
   * Subtracts either 2.5 or 5 from the x position of the pufferfish depending
   * on whether it is in the transition state or not. Sets the turnAround boolean
   * to true if the pufferfish is beyond its maximum left position, otherwise
   * sets it to false.
   */
  swimLeft() {
    this.transition ? this.x -= 2.5 : this.x -= 5;
    this.turnAround = this.x <= this.maxLeft ? true : false;
  }


  /**
   * Animates the pufferfish swimming to the right
   *
   * Adds either 2.5 or 5 to the x position of the pufferfish depending
   * on whether it is in the transition state or not. Sets the turnAround boolean
   * to false if the pufferfish is beyond its maximum right position, otherwise
   * sets it to true.
   */
  swimRight() {
    this.transition ? this.x += 2.5 : this.x += 5;
    this.turnAround = this.x >= this.maxRight ? false : true;
  }
}