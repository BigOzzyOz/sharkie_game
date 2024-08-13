class World {

  character = new Character();
  enemies = [
    new Pufferfish(),
    new Pufferfish(),
    new Jellyfish(),
    new Jellyfish(),
    new Boss()
  ];

  backgroundImage = [
    new BackgroundLight('assets/img/3. Background/Layers/5. Water/L1.png'),
    new BackgroundLight('assets/img/3. Background/Layers/4.Fondo 2/L1.png'),
    new BackgroundLight('assets/img/3. Background/Layers/3.Fondo 1/L1.png'),
    new BackgroundLight('assets/img/3. Background/Layers/2. Floor/L1.png'),
    new BackgroundLight('assets/img/3. Background/Layers/1. Light/1.png'),
  ];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectToMap(this.backgroundImage);
    this.addObjectToMap(this.enemies);
    this.addToMap(this.character);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };


  addToMap(otd) {
    this.ctx.drawImage(otd.img, otd.x, otd.y, otd.width, otd.height);
  };


  addObjectToMap(object) {
    object.forEach(o => {
      this.addToMap(o);
    });
  };


}
