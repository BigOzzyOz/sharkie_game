class MoveableObject extends DrawableObjects {
  speed = 5;
  life = 100;
  offset = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  };
  speedDown = 0;
  acceleration = 0.005;
  lastHit;
  applyGravity;
  animateId;
  dead = false;


  /**
   * Constructor for MoveableObject
   *
   * @constructor
   */
  constructor() {
    super();
  }


  /**
   * Applies gravity to the object if it is above ground.
   *
   * @todo this method should be refactored to be more understandable
   */
  startGravity() {
    if (this.isAboveGround()) {
      this.applyGravity = setInterval(() => {
        if (!world || world.isPaused) return;
        if (this.isAboveGround()) {
          this.y += this.speedDown;
          this.speedDown += this.acceleration;
        } else this.stopGravity();
      }, 1000 / 25);
    }
  }


  /**
   * Stops the gravity interval and resets the speedDown property.
   *
   * @see MoveableObject#startGravity
   */
  stopGravity() {
    clearInterval(this.applyGravity);
    this.speedDown = 0;
    this.applyGravity = null;
  }


  /**
   * Checks if the object is above the ground.
   *
   * This method is used to check if the object is above the ground. If the object is part of a world, it
   * will use the world's canvas height subtracted by the object's height as the ground. Otherwise, it will
   * assume the ground is at y position 1000.
   *
   * @return {boolean} true if the object is above the ground, false otherwise
   * @private
   */
  isAboveGround() {
    let ground = this.world ? this.world.canvas.height - this.height : 1000;
    return this.y <= ground;
  }


  /**
   * Sets the animation for the object and updates the current image index.
   *
   * @param {Array<string>} moveSet The set of images to animate the object with.
   * @see MoveableObject#currentImage
   * @see MoveableObject#imageCache
   */
  setAnimation(moveSet) {
    this.currentMoveSet = moveSet;
    let i = this.currentImage % moveSet.length;
    let path = moveSet[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Makes the object swim left and up at the same time, and then makes it turn around.
   *
   * This method is a convenience method that calls both #swimLeft and #swimUp, and then sets
   * the #turnAround flag to true.
   */
  swimLeftUp() {
    this.swimLeft();
    this.swimUp();
    this.turnAround = true;
  }


  /**
   * Moves the object up by the object's speed.
   *
   * @see MoveableObject#speed
   */
  swimUp() {
    this.y -= this.speed;
  }


  /**
   * Makes the object swim right and up at the same time, and then makes it turn around.
   *
   * This method is a convenience method that calls both #swimRight and #swimUp, and then sets
   * the #turnAround flag to false.
   */
  swimRightUp() {
    this.swimRight();
    this.swimUp();
    this.turnAround = false;
  }


  /**
   * Moves the object left by the object's speed, and sets the object's turnAround flag to true.
   *
   * @see MoveableObject#speed
   * @see MoveableObject#turnAround
   */
  swimLeft() {
    this.x -= this.speed;
    this.turnAround = true;
  }


  /**
   * Moves the object right by the object's speed, and sets the object's turnAround flag to false.
   *
   * @see MoveableObject#speed
   * @see MoveableObject#turnAround
   */
  swimRight() {
    this.x += this.speed;
    this.turnAround = false;
  }


  /**
   * Makes the object swim left and down at the same time, and then makes it turn around.
   *
   * This method is a convenience method that calls both #swimLeft and #swimDown, and then sets
   * the #turnAround flag to true.
   *
   * @see MoveableObject#swimLeft
   * @see MoveableObject#swimDown
   * @see MoveableObject#turnAround
   */
  swimLeftDown() {
    this.swimLeft();
    this.swimDown();
    this.turnAround = true;
  }


  /**
   * Moves the object down by the object's speed.
   *
   * @see MoveableObject#speed
   */
  swimDown() {
    this.y += this.speed;
  }


  /**
   * Makes the object swim right and down at the same time, and then makes it turn around.
   *
   * This method is a convenience method that calls both #swimRight and #swimDown, and then sets
   * the #turnAround flag to false.
   *
   * @see MoveableObject#swimRight
   * @see MoveableObject#swimDown
   * @see MoveableObject#turnAround
   */
  swimRightDown() {
    this.swimRight();
    this.swimDown();
    this.turnAround = false;
  }


  /**
   * Checks if the object is colliding with the given object.
   *
   * This method uses the object's offset values to calculate if the object is colliding with
   * the given object. The object's offset values are used to calculate the object's actual
   * width and height when checking for collision.
   *
   * @param {MoveableObject} obj The object to check for collision against.
   * @returns {boolean} True if the object is colliding with the given object, false otherwise.
   */
  isColliding(obj) {
    return this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom;
  }


  /**
   * Destroys the given object in the given array by removing the element at the index
   * specified by the object's y and x coordinates.
   *
   * @param {array} arr The array containing the object that should be destroyed.
   * @param {MoveableObject} obj The object that should be destroyed.
   */
  destroy(arr, obj) {
    arr.splice(arr.findIndex(o => o.y === obj.y && o.x === obj.x), 1);
  }


  /**
   * Checks if the object is dead.
   *
   * This method checks if the object's life property is less than or equal to zero.
   * If the object is dead, the method will return true, otherwise it will return false.
   *
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.life <= 0;
  }


  /**
   * Checks if the object is out of bounds.
   *
   * This method checks if the object is out of bounds vertically.
   * If the object is out of bounds, the method will return true, otherwise it will return false.
   *
   * If the object has a world property, it will check against the world's canvas height.
   * If the object does not have a world property, it will only check against the object's height.
   *
   * @returns {boolean} True if the object is out of bounds, false otherwise.
   */
  isOutOfBounds() {
    if (!this.world) {
      return this.y < 0 - this.height;
    } else {
      return this.y < 0 - this.height || this.y > this.world.canvas.height;
    }
  }


  /**
   * Creates a new collectable coin at the object's position and adds it to the level's collectables array.
   *
   * The method first creates a new CollectableObject of type 'coin' at the object's position with a slight
   * offset to the left and up. It then adds this new object to the level's collectables array.
   *
   * The method then sets the object's dead property to true, effectively killing the object.
   */
  giveReward() {
    let reward = new CollectableObject('coin', this.x + this.width / 2 - 15, this.y + this.height / 2 - 15);
    world.level.collectables.push(reward);
    this.dead = true;
  }


  /**
   * Checks if the character can swim up and to the right.
   *
   * It checks if the right-up arrow key is pressed, if the character is not out of the top boundary of the
   * canvas (with some extra padding), and if the character is not out of the right boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim up and to the right.
   * @private
   */
  canSwimRightUp() {
    return this.world.keyboard.RIGHTUP && this.y > 0 - 70 && this.x < this.world.canvas.width * 6 - this.width;
  }


  /**
   * Checks if the character can swim down and to the right.
   *
   * It checks if the right-down arrow key is pressed, if the character is not out of the bottom boundary of the
   * canvas (with some extra padding), and if the character is not out of the right boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim down and to the right.
   * @private
   */
  canSwimRightDown() {
    return this.world.keyboard.RIGHTDOWN && this.y < this.world.canvas.height - this.height && this.x < this.world.canvas.width * 6 - this.width;
  }


  /**
   * Checks if the character can swim up and to the left.
   *
   * It checks if the left-up arrow key is pressed, if the character is not out of the top boundary of the
   * canvas (with some extra padding), and if the character is not out of the left boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim up and to the left.
   * @private
   */
  canSwimLeftUp() {
    return this.world.keyboard.LEFTUP && this.y > 0 - 70 && this.x > 0;
  }


  /**
   * Checks if the character can swim down and to the left.
   *
   * It checks if the left-down arrow key is pressed, if the character is not out of the bottom boundary of the
   * canvas (with some extra padding), and if the character is not out of the left boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim down and to the left.
   * @private
   */
  canSwimLeftDown() {
    return this.world.keyboard.LEFTDOWN && this.y < this.world.canvas.height - this.height && this.x > 0;
  }


  /**
   * Checks if the character can swim to the right.
   *
   * It checks if the right arrow key is pressed, and if the character is not out of the right boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim to the right.
   * @private
   */
  canSwimRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.canvas.width * 6 - this.width;
  }


  /**
   * Checks if the character can swim to the left.
   *
   * It checks if the left arrow key is pressed, and if the character is not out of the left boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim to the left.
   * @private
   */
  canSwimLeft() {
    return this.world.keyboard.LEFT && this.x > 0 - 25;
  }


  /**
   * Checks if the character can swim up.
   *
   * It checks if the up arrow key is pressed, and if the character is not out of the top boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim up.
   * @private
   */
  canSwimUp() {
    return this.world.keyboard.UP && this.y > 0 - 70;
  }


  /**
   * Checks if the character can swim down.
   *
   * It checks if the down arrow key is pressed, and if the character is not out of the bottom boundary of the
   * canvas (with some extra padding).
   *
   * @return {Boolean} If the character can swim down.
   * @private
   */
  canSwimDown() {
    return this.world.keyboard.DOWN && this.y < this.world.canvas.height - this.height;
  }
}