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

  /**
   * The constructor function initializes properties for an object related to animation and sets up
   * intervals for updating the animation.
   * @param [x=2000] - The `x` parameter in the constructor function is used to set the initial
   * x-coordinate value. If no value is provided when creating an instance of this class, the default
   * value is 2000.
   */
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


  /**
   * The update function checks various conditions and triggers different animations based on the game
   * state.
   * @returns If the `update()` method is called and the conditions are met, then the method will return
   * the corresponding animation function to be executed.
   */
  update() {
    if (!this.world || this.world.isPaused) return;
    if (this.isDead()) this.animateDeath();
    else if (this.bossIntroPlayed()) this.animateIntro();
    else if (this.isHit) this.animateHit();
    else if (this.characterIsNear() && this.attackPossible) this.animateAttack();
    else if (this.world.character.bossInsight) this.animateFloat();
  }


  /**
   * The function `checkAttack` checks if enough time has passed since the last attack to allow for a new
   * attack.
   */
  checkAttack() {
    let timeExpired = new Date().getTime();
    if (timeExpired - this.lastAttack > 5000) this.attackPossible = true;
  }


  /**
   * The function `setMoveSet` sets the current image and animation based on the provided move set.
   * @param set - It looks like the `setMoveSet` function takes a `set` parameter, which is an array of
   * values. The function checks if the first element of the `set` array is included in the
   * `currentMoveSet` array. If it is not included, it sets the `currentImage
   */
  setMoveSet(set) {
    this.currentImage = !this.currentMoveSet.includes(set[0]) ? 0 : this.currentImage;
    this.setAnimation(set);
  }


  /**
   * The function `characterIsNear` calculates the distance between the character and an object in a game
   * world and returns a boolean based on predefined conditions.
   * @returns The `characterIsNear()` function is returning a boolean value based on whether the distance
   * between the character and the object is less than a certain threshold. If `this.turnAround` is
   * false, it checks if the distance is less than 250 units, and if `this.turnAround` is true, it checks
   * if the distance is less than 450 units.
   */
  characterIsNear() {
    let dx = this.world.character.x + this.width / 2 - (this.x + this.width / 2);
    let dy = this.world.character.y + this.height / 2 - (this.y + this.height / 2);
    if (!this.turnAround) return Math.sqrt(dx * dx + dy * dy) < 250;
    else return Math.sqrt(dx * dx + dy * dy) < 450;
  }


  /**
   * The function bossIntroPlayed() returns true if the bossInsight property of the character is false
   * and the character's x position is greater than or equal to the startPoint minus 720.
   * @returns The bossIntroPlayed() function returns a boolean value. It returns true if the bossInsight
   * property of the character is false and the character's x position is greater than or equal to the
   * startPoint minus 720. Otherwise, it returns false.
   */
  bossIntroPlayed() {
    return !this.world.character.bossInsight && this.world.character.x >= this.startPoint - 720;
  }


  /**
   * The swimMove function calculates the direction towards the character in the game world and moves the
   * object accordingly.
   */
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


  /**
   * The function isOutOfBounds checks if a future move will cause an object to go out of bounds
   * vertically on a canvas.
   * @param futureMove - The `futureMove` parameter represents the amount by which the `y` coordinate of
   * an object is going to change in the future. It is used in the `isOutOfBounds` function to check if
   * the object will move out of bounds vertically based on its current position (`this.y`), height (`
   * @returns The function `isOutOfBounds(futureMove)` is returning a boolean value based on the
   * conditions provided. It will return `true` if the future move would make the object go out of bounds
   * (either above the canvas or below the canvas), and `false` otherwise.
   */
  isOutOfBounds(futureMove) {
    return this.y + futureMove <= 0 - this.offset.top || this.y + this.height + futureMove >= this.world.canvas.height;
  }


  /**
   * The `animateDeath` function increments the coin counter in the status bar, sets the character as
   * dead, changes its move set, plays a sound effect, and displays a win message when the character's
   * death animation is complete.
   */
  animateDeath() {
    if (!this.dead) for (let i = 0; i < 10; i++) world.statusBarCoin.coinCounter++;
    this.dead = true;
    this.setMoveSet(this.moveSetDead);
    this.currentImage === 1 ? soundEffects[0].boss_death.play() : '';
    if (this.currentImage === this.moveSetDead.length) {
      this.currentImage = this.moveSetDead.length - 1;
      world.displayWin();
    }
  }


  /**
   * The `animateIntro` function sets the initial position of an object, plays a sound effect, and
   * updates a character's state based on the current image being displayed.
   */
  animateIntro() {
    this.x = this.startPoint - 300;
    this.setMoveSet(this.moveSetIntro);
    soundEffects[0].boss_insight.volume = 0.25 * document.getElementById('sound').value;
    this.currentImage === 1 ? soundEffects[0].boss_insight.play() : '';
    if (this.currentImage === this.moveSetIntro.length) this.world.character.bossInsight = true;
  }


  /**
   * The `animateAttack` function sets the speed, move set, and checks if an attack is possible before
   * executing a swimming movement.
   */
  animateAttack() {
    this.speed = 20;
    this.setMoveSet(this.moveSetAttack);
    if (this.currentImage === this.moveSetAttack.length) {
      this.attackPossible = false;
      this.lastAttack = new Date().getTime();
    }
    this.swimMove();
  }


  /**
   * The `animateHit` function sets the move set to `moveSetHurt` and checks if the character is hit
   * based on the current image and move set length.
   */
  animateHit() {
    this.setMoveSet(this.moveSetHurt);
    if (this.currentImage > 4 && this.currentImage % 8 === this.moveSetHurt.length) this.isHit = false;
  }


  /**
   * The `animateFloat` function sets the speed, move set, and movement for an object to simulate
   * floating and checks for attacks.
   */
  animateFloat() {
    this.speed = 6;
    this.setMoveSet(this.moveSetFloating);
    this.swimMove();
    this.checkAttack();
  }

}

