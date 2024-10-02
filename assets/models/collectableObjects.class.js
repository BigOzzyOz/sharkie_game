class CollectableObject extends MoveableObject {
  variant = 0;


  /**
   * Constructor for CollectableObject.
   * @param {String} variant - either 'coin' or 'poison'.
   * @param {Number} x - the x position of the collectable object.
   * @param {Number} y - the y position of the collectable object.
   */
  constructor(variant, x, y) {
    super();
    this.variant = variant;
    this.x = x;
    this.y = y;
    if (variant === 'coin') this.loadCoin();
    else if (variant === 'poison') this.loadPoison();
    this.animateId = setInterval(() => this.update(), 100);
  }


  /**
   * Updates the animation of the collectable object.
   * @private
   */
  update() {
    if (!world || world.isPaused) return;
    this.setAnimation(this.currentMoveSet);
  }


  /**
   * Checks if the collectable object is collected by the character.
   * @private
   */
  isCollected() {
    if (this.variant === 'poison') this.checkPoisonCounter();
    else if (this.variant === 'coin') this.clearCoin();
  }


  /**
   * Loads the coin animation and sets the size of the collectable coin.
   * @private
   */
  loadCoin() {
    this.width = 30;
    this.height = 30;
    this.currentMoveSet = collectableObject.moveSetCoins;
    this.loadImages(collectableObject.moveSetCoins);
  }


  /**
   * Removes the coin collectable object from the level and increments the coin counter
   * in the status bar. It also plays the sound effect for collecting a coin.
   * @private
   */
  clearCoin() {
    world.statusBarCoin.coinCounter++;
    this.destroy(world.level.collectables, this);
    playSound(soundEffects[0].coin);
  }


  /**
   * Loads the poison animation and sets the size of the collectable poison.
   * @private
   */
  loadPoison() {
    this.currentMoveSet = collectableObject.moveSetPoison;
    this.loadImages(collectableObject.moveSetPoison);
    this.width = 45;
    this.height = 60;
    this.offset = {
      left: 10,
      right: 10,
      top: 20,
      bottom: 0
    };
  }


  /**
   * Checks if the poison counter in the status bar has reached 5, if so it does
   * nothing. Otherwise, it clears the poison collectable object from the level
   * and increments the poison counter in the status bar, and plays the sound
   * effect for collecting poison.
   * @private
   */
  checkPoisonCounter() {
    if (world.statusBarPoison.poisonCounter >= 5) return;
    else this.clearPoison();
  }


  /**
   * Removes the poison collectable object from the level and increments the poison counter
   * in the status bar. It also plays the sound effect for collecting poison.
   * @private
   */
  clearPoison() {
    world.statusBarPoison.poisonCounter++;
    this.destroy(world.level.collectables, this);
    playSound(soundEffects[0].poison);
  }
}