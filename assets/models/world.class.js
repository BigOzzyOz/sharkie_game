class World {
  level = initializeLevel1();
  character = new Character();
  bubbles = [];
  backgroundImage = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  drawRequest;
  statusBarLife = new Statusbar(15, 0, 200, 0);
  statusBarPoison = new Statusbar(200, 0, 60, 1);
  statusBarCoin = new Statusbar(560, 10, 60, 2);
  isPaused = false;


  /**
   * World constructor.
   * @param {HTMLCanvasElement} canvas - The canvas to render the game on.
   * @param {Keyboard} keyboard - The keyboard to get input from.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    music.forEach(song => Object.values(song).forEach(song => {
      song.volume = document.getElementById('music').value * 0.2;
      song.loop = true;
    }));
    music[0].game.play();
    this.updateGame();
  }


  /**
   * Sets the world of the character and enemies, and sets the background images.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => enemy.world = this);
    for (let i = -1; i < 7; i++) i % 2 === 0 ? this.setBackground(this.level.backgroundImageSet1, i) : this.setBackground(this.level.backgroundImageSet2, i);
  }


  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Sets the background images in the game world.
   * @param {string[]} set - An array of image paths.
   * @param {number} round - The round number to set the background for.
   */
  /******  a851ee8d-50a3-49f1-b0c2-c2e12b19f0c0  *******/
  setBackground(set, round) {
    for (let i = 0; i < 5; i++) this.backgroundImage.push(new Background(set[i], round * this.canvas.width, this.canvas.width, this.canvas.height));
  }


  /**
   * Updates the game by checking for collisions and updating the status bar.
   * @param {number} interval - The interval to update the game in milliseconds.
   * @private
   */
  updateGame() {
    setInterval(() => {
      gamePause();
      if (this.isPaused) return;
      this.checkCollision();
      this.statusBarLife.updateLife(this.character.life);
    }, 100);
  }


  /**
   * Checks for collisions between the character, enemies, bubbles, and collectables.
   * @private
   */
  checkCollision() {
    if (this.character.isDead()) return;
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) this.character.isHit(enemy);
      this.bubbles.forEach((bubble) => {
        if (bubble.isColliding(enemy)) bubble.isHit(enemy);
      });
    });
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) collectable.isCollected();
    });
  }


  /**
   * Draws all objects in the game by translating the canvas and drawing all
   * objects relative to the character's position.
   * @private
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjects();
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    this.drawRequest = requestAnimationFrame(() => {
      if (self.isPaused) return;
      else self.draw();
    });
  };


  /**
   * Draws all objects in the game by adding them to the map.
   * This function is called in the draw() function and is responsible for drawing all objects in the game.
   * It adds all objects in the game to the map, which is then translated and drawn relative to the character's position.
   * @private
   */
  drawObjects() {
    this.addObjectToMap(this.backgroundImage);
    this.addObjectToMap(this.level.barriers);
    this.addObjectToMap(this.level.collectables);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarPoison);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.character);
    this.addObjectToMap(this.bubbles);
  }


  /**
   * Adds an object to the map by drawing its image, frame and text.
   * If the object has a turnAround property, it is flipped horizontally
   * before and after drawing.
   * @param {DrawableObject} otd - The object to add to the map.
   * @private
   */
  addToMap(otd) {
    if (otd.turnAround) otd.imageMirror(this.ctx);
    otd.imageDraw(this.ctx);
    // otd.frameDraw(this.ctx);
    otd.textDraw(this.ctx);
    if (otd.turnAround) otd.imageMirrorBack(this.ctx);
  };


  /**
   * Adds an array of objects to the map by drawing their images, frames and text.
   * If the object has a turnAround property, it is flipped horizontally
   * before and after drawing.
   * @param {DrawableObject[]} object - An array of objects to add to the map.
   * @private
   */
  addObjectToMap(object) {
    object.forEach(o => this.addToMap(o));
  };


  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Resets the game to its initial state, cancelling all intervals and animation
   * frames, reinitializing the level and restarting the game.
   * @private
   */
  /******  482a57aa-cae3-43a3-b10e-40c307226edb  *******/
  reset() {
    clearAllIntervals();
    window.cancelAnimationFrame(this.drawRequest);
    this.level = initializeLevel1();
    music.forEach(song => Object.values(song).forEach(song => song.pause()));
    init();
    document.getElementById('loseScreen').classList.add('op0', 'd-none');
    document.getElementById('winScreen').classList.add('op0', 'd-none');
  }


  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Ends the game by clearing all intervals, cancelling the animation frame, reinitializing
   * the level, toggling the start screen, and pausing all music.
   * @private
   */
  /******  22fb4e30-b987-40a7-b347-1de81ac1170c  *******/
  endGame() {
    clearAllIntervals();
    window.cancelAnimationFrame(this.drawRequest);
    this.level = initializeLevel1();
    document.getElementById('start').classList.toggle('d-none');
    document.getElementById('loseScreen').classList.add('op0', 'd-none');
    document.getElementById('winScreen').classList.add('op0', 'd-none');
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('pauseMenu').classList.add('d-none');
    music.forEach(song => Object.values(song).forEach(song => song.pause()));
  }


  /**
   * Displays the win screen, pausing the game and playing the win music.
   * @private
   */
  displayWin() {
    document.getElementById('winScreen').classList.remove('op0', 'd-none');
    music[0].game.pause();
    music[0].win.play();
  }


  /**
   * Displays the lose screen, pausing the game and playing the lose music.
   * @private
   */
  displayLose() {
    document.getElementById('loseScreen').classList.remove('op0', 'd-none');
    music[0].game.pause();
    music[0].lose.play();
  }
}
