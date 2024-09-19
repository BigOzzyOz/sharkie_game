class Statusbar extends DrawableObjects {
  imagesLife = statusBar.imagesLife;
  imagePoison = statusBar.imagePoison;
  imageCoin = statusBar.imageCoin;
  currentLife;
  poisonCounter;
  coinCounter;

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


  updateLife(life) {
    this.currentLife = life;
    let path = this.imagesLife[this.imgIndex()];
    this.img = this.imageCache[path];
  }


  imgIndex() {
    if (this.currentLife === 100) return 0;
    else if (this.currentLife >= 80) return 1;
    else if (this.currentLife >= 60) return 2;
    else if (this.currentLife >= 40) return 3;
    else if (this.currentLife >= 20) return 4;
    else return 5;
  }

}