class Boss extends MoveableObject {
  x = 400;
  height = 300;
  width = 300;

  currentImage = 0;

  moveSetFloating = [
    'assets/img/2.Enemy/3 Final Enemy/2.floating/1.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/2.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/3.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/4.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/5.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/6.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/7.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/8.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/9.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/10.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/11.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/12.png',
    'assets/img/2.Enemy/3 Final Enemy/2.floating/13.png'
  ];

  constructor() {
    super();
    this.loadImages(this.moveSetFloating);
    this.img = this.imageCache[0];
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.moveSetFloating.length;
      this.img = this.imageCache[i];
      this.currentImage++;
    }, 100);

  }

}