class Statusbar extends DrawableObjects {
  imagesLife = [
    'assets/img/4. Marcadores/green/Life/100_  copia 2.png',
    'assets/img/4. Marcadores/green/Life/80_  copia 3.png',
    'assets/img/4. Marcadores/Purple/60_ .png',
    'assets/img/4. Marcadores/Purple/40_ .png',
    'assets/img/4. Marcadores/orange/20_ copia 2.png',
    'assets/img/4. Marcadores/orange/0_  copia.png'
  ];
  imagePoison = ['assets/img/4. Marcadores/green/100_ copia 5.png'];
  imageCoin = ['assets/img/4. Marcadores/green/100_ copia 6.png'];
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
    if (this.currentLife === 100) {
      return 0;
    } else if (this.currentLife >= 80) {
      return 1;
    } else if (this.currentLife >= 60) {
      return 2;
    } else if (this.currentLife >= 40) {
      return 3;
    } else if (this.currentLife >= 20) {
      return 4;
    } else {
      return 5;
    }
  }

}