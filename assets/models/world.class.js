class World {
  level = level1;

  character = new Character();
  enemies = this.level.enemies;
  backgroundImageSet1 = this.level.backgroundImageSet1;
  backgroundImageSet2 = this.level.backgroundImageSet2;

  backgroundImage = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }


  setWorld() {
    this.character.world = this;
    for (let i = -1; i < 9; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < 5; j++) {
          this.backgroundImage.push(new Background(this.backgroundImageSet1[j], i * 720));
        };
      } else {
        for (let j = 0; j < 5; j++) {
          this.backgroundImage.push(new Background(this.backgroundImageSet2[j], i * 720));
        };
      }
    };
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.backgroundImage);
    this.addObjectToMap(this.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);


    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };


  addToMap(otd) {
    if (otd.turnAround) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.translate(-otd.width, 0);
      otd.x = otd.x * -1;
    }
    this.ctx.drawImage(otd.img, otd.x, otd.y, otd.width, otd.height);
    if (otd.turnAround) {
      otd.x = otd.x * -1;
      this.ctx.restore();
    }
  };


  addObjectToMap(object) {
    object.forEach(o => {
      this.addToMap(o);
    });
  };


}
