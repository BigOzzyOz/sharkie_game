class BackgroundLight extends MoveableObject {
  x = 0;
  y = -0;
  width = 720;
  height = 480;
  backgroundLight = [
    'assets/img/3. Background/Layers/5. Water/L1.png',
    'assets/img/3. Background/Layers/4.Fondo 2/L1.png',
    'assets/img/3. Background/Layers/3.Fondo 1/L1.png',
    'assets/img/3. Background/Layers/2. Floor/L1.png',
    'assets/img/3. Background/Layers/1. Light/1.png',
  ];


  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
  }
}