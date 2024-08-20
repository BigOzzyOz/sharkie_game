class Statusbar extends DrawableObjects {
  images = [
    'assets/img/4. Marcadores/green/Life/100_  copia 2.png',
    'assets/img/4. Marcadores/green/Life/80_  copia 3.png',
    'assets/img/4. Marcadores/Purple/60_ .png',
    'assets/img/4. Marcadores/Purple/40_ .png',
    'assets/img/4. Marcadores/orange/20_ copia 2.png',
    'assets/img/4. Marcadores/orange/0_  copia.png'
  ];
  currentLife;

  constructor() {
    super();
    this.x = 15;
    this.y = 0;
    this.height = 60;
    this.width = 200;
    this.currentMoveSet = this.images;
    this.loadImages(this.images);
  }


  updateLife(life) {
    this.currentLife = life;
    let path = this.images[this.imgIndex()];
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