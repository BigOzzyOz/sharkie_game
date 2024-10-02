class Statusbar extends DrawableObjects {
  imagesLife = statusBar.imagesLife;
  imagePoison = statusBar.imagePoison;
  imageCoin = statusBar.imageCoin;
  currentLife;
  poisonCounter;
  coinCounter;


  /**
   * Constructor for Statusbar objects.
   * @param {number} x - The x-coordinate of the Statusbar.
   * @param {number} y - The y-coordinate of the Statusbar.
   * @param {number} width - The width of the Statusbar.
   * @param {number} bar - A number indicating which type of status bar to create.
   * 0 for life, 1 for poison counter, and 2 for coin counter.
   */
  constructor(x, y, width, bar) {
    super();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = width;
    if (bar === 0) {
      this.currentMoveSet = this.imagesLife;
    } else if (bar === 1) {
      this.currentMoveSet = this.imagePoison;
      this.poisonCounter = 0;
    } else if (bar === 2) {
      this.currentMoveSet = this.imageCoin;
      this.coinCounter = 0;
    }
    this.loadImages(this.currentMoveSet);
  }


  /**
   * Updates the life counter in the status bar.
   * @param {number} life - The number of lives left.
   */
  updateLife(life) {
    this.currentLife = life;
    let path = this.imagesLife[this.imgIndex()];
    this.img = this.imageCache[path];
  }


  /**
   * Returns the index of the image in the imagesLife array that should be
   * displayed based on the current number of lives left.
   * @return {number} The index of the image in the imagesLife array.
   */
  imgIndex() {
    if (this.currentLife === 100) return 0;
    else if (this.currentLife >= 80) return 1;
    else if (this.currentLife >= 60) return 2;
    else if (this.currentLife >= 40) return 3;
    else if (this.currentLife >= 20) return 4;
    else return 5;
  }

}