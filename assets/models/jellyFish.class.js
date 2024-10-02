class Jellyfish extends MoveableObject {
  height = 50;
  width = 50;
  variantJellyfish;
  groundHeight;
  currentDeadSet;


  /**
   * Creates a new instance of Jellyfish class
   * @param {number} [variant=1] - variant of jellyfish (1-4)
   * @param {number} [x=200] - x position of the object
   * @param {number} [y=50] - y position of the object
   */
  constructor(variant = Math.floor(Math.random() * 4) + 1, x = 200 + Math.floor(Math.random() * 140), y = 50 + Math.floor(Math.random() * 200)) {
    super();
    this.offset = {
      right: 5,
      left: 5,
      top: 5,
      bottom: 5
    };
    this.variantJellyfish = variant;
    if (this.variantJellyfish == 1) this.loadAllImages(jellyFishAnimation.moveSetSwimLila, jellyFishAnimation.moveSetDeadLila);
    if (this.variantJellyfish == 2) this.loadAllImages(jellyFishAnimation.moveSetSwimYellow, jellyFishAnimation.moveSetDeadYellow);
    if (this.variantJellyfish == 3) this.loadAllImages(jellyFishAnimation.moveSetSwimGreen, jellyFishAnimation.moveSetDeadGreen);
    if (this.variantJellyfish == 4) this.loadAllImages(jellyFishAnimation.moveSetSwimPink, jellyFishAnimation.moveSetDeadPink);
    this.x = x;
    this.y = y;
    this.floatHeight = this.y;
    this.direction = 'sinking';
    this.swimHeight;
    this.breakTime = 0.6;
    this.breakCounter = 0;
    this.animateId = setInterval(() => this.update(), 100);
  }


  /**
   * Updates the state of the jellyfish
   * 
   * This function is called every frame and is responsible for updating the state of the jellyfish.
   * The state of the jellyfish can be one of the following:
   * - sinking: the jellyfish is sinking
   * - swimming: the jellyfish is swimming
   * - breaking: the jellyfish is breaking
   * - dead: the jellyfish is dead
   * 
   * The function first checks if the world is paused or if the jellyfish is dead.
   * If either condition is true, the function returns.
   * If the jellyfish is sinking, it calls the sinkingStart function.
   * If the jellyfish is swimming, it calls the swimUp function.
   * If the jellyfish is breaking, it calls the swimBreak function.
   * If the jellyfish is dead, it calls the death function.
   */
  update() {
    if (!this.world || this.world.isPaused) return;
    if (this.isDead()) this.death();
    else if (this.y < this.floatHeight) this.sinkingStart();
    else if (this.direction === 'sinking') this.sinkingEnd();
    else if (this.direction === 'swimming') this.swimUp();
    else if (this.direction === 'breaking') this.swimBreak();
  }


  /**
   * Starts the jellyfish's sinking animation
   * 
   * Applies gravity to the jellyfish, sets the image to the sinking image, and moves the jellyfish down by 2 pixels.
   * Sets the direction of the jellyfish to 'sinking'.
   */
  sinkingStart() {
    !this.applyGravity ? this.startGravity() : '';
    this.img = this.imageCache[this.currentMoveSet[2]];
    this.y += 2;
    this.direction = 'sinking';
  }


  /**
   * Ends the jellyfish's sinking animation
   * 
   * Checks if the jellyfish is above or near the ground. If it is, it starts or prepares to start the swimming animation.
   * If the jellyfish is not near the ground, it continues to sink.
   * 
   * @private
   */
  sinkingEnd() {
    this.groundHeight = this.world ? this.world.canvas.height - this.height - (this.world.canvas.height * 0.1) : 0;
    this.y += 2;
    this.img = this.img == this.imageCache[this.currentMoveSet[2]] ? this.imageCache[this.currentMoveSet[3]] : this.imageCache[this.currentMoveSet[2]];
    if (this.isAboveGround()) this.startSwimUp();
    else if (this.isNearGround()) this.prepareStartSwimUp();
  }


  /**
   * Checks if the jellyfish is above the ground.
   * 
   * @return {boolean} true if the jellyfish is above the ground, false otherwise
   * @private
   */
  isAboveGround() {
    return this.y >= this.groundHeight;
  }


  /**
   * Checks if the jellyfish is near the ground.
   * 
   * This function is used to determine if the jellyfish is close to the ground, and if it should start
   * preparing to swim up. The jellyfish is considered close to the ground if its y position is within
   * 2% of the ground height.
   * 
   * @return {boolean} true if the jellyfish is near the ground, false otherwise
   * @private
   */
  isNearGround() {
    return this.y >= this.groundHeight - (this.world.canvas.height * 0.02);
  }


  /**
   * Starts the swimming up animation.
   * 
   * This function stops gravity on the jellyfish, sets the image to the first frame of the swimming
   * animation, sets the direction to 'swimming', and sets the height at which the jellyfish will
   * swim to to a random y position between 40 and 75 pixels above its current y position.
   * 
   * @private
   */
  startSwimUp() {
    this.stopGravity();
    this.img = this.imageCache[this.currentMoveSet[0]];
    this.direction = 'swimming';
    this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
  }


  /**
   * Prepares the jellyfish to start swimming up.
   * 
   * This function sets the image of the jellyfish to the third frame of the swimming animation, to
   * prepare the jellyfish to start swimming up.
   * 
   * @private
   */
  prepareStartSwimUp() {
    this.img = this.imageCache[this.currentMoveSet[3]];
  }


  /**
   * Moves the jellyfish up the canvas by 6 pixels, and updates its image to the second frame of the
   * swimming animation. If the jellyfish's y position is less than or equal to the height at which
   * the jellyfish is supposed to swim to, then the jellyfish's direction is changed to 'breaking'
   * and the break counter is reset to 0.
   * 
   * @private
   */
  swimUp() {
    this.y -= 6;
    this.img = this.imageCache[this.currentMoveSet[1]];
    if (this.y <= this.swimHeight) {
      this.img = this.imageCache[this.currentMoveSet[3]];
      this.direction = 'breaking';
      this.breakCounter = 0;
    }
  }


  /**
   * Moves the jellyfish up the canvas by 2 pixels and increments the break counter by 0.15.
   * If the break counter is greater than or equal to the break time, then the jellyfish's image
   * is reset to the first frame of the swim animation, the direction is set to 'swimming', and the
   * swim height is set to a random y position between 40 and 75 pixels above the jellyfish's
   * current y position.
   * 
   * @private
   */
  swimBreak() {
    this.breakCounter += 0.15;
    this.y += 2;
    if (this.breakCounter >= this.breakTime) {
      this.img = this.imageCache[this.currentMoveSet[0]];
      this.direction = 'swimming';
      this.swimHeight = this.y - (Math.floor(Math.random() * 35) + 40);
      this.breakCounter = 0;
    }
  }


  /**
   * Loads all the images for the given move and dead sets.
   * @param {Array<string>} swim the set of images for the swim animation
   * @param {Array<string>} dead the set of images for the dead animation
   */
  loadAllImages(swim, dead) {
    this.currentMoveSet = swim;
    this.currentDeadSet = dead;
    this.loadImages(this.currentMoveSet);
    this.loadImages(this.currentDeadSet);
  }


  /**
   * Handles the death of the jellyfish.
   *
   * Sets the life of the jellyfish to 0, sets the animation to the current dead set,
   * and sets the direction to 'dead'. If the jellyfish is off the screen (i.e., its
   * y position is less than 0), the gravity is stopped and the jellyfish is removed
   * from the list of enemies in the current level.
   */
  death() {
    if (!this.dead) this.giveReward();
    this.life = 0;
    this.setAnimation(this.currentDeadSet);
    this.direction = 'dead';
    this.y -= 4;
    if (this.isOutOfBounds()) {
      clearInterval(this.animateId);
      this.stopGravity;
      this.destroy(world.level.enemies, this);
    }
  }


}