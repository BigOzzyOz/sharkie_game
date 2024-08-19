class World {
  level = level1;
  character = new Character();
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
    this.checkCollision();
  }


  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    for (let i = -1; i < 9; i++) {
      if (i % 2 === 0) {
        for (let j = 0; j < 5; j++) {
          this.backgroundImage.push(new Background(this.level.backgroundImageSet1[j], i * this.canvas.width, this.canvas.width, this.canvas.height));
        };
      } else {
        for (let j = 0; j < 5; j++) {
          this.backgroundImage.push(new Background(this.level.backgroundImageSet2[j], i * this.canvas.width, this.canvas.width, this.canvas.height));
        };
      }
    };
  }


  checkCollision() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.life -= 5;
        }
      });
    }, 100);
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.backgroundImage);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);


    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };


  addToMap(otd) {
    if (otd.turnAround) {
      otd.imageMirror(this.ctx);
    }
    otd.imageDraw(this.ctx);
    otd.frameDraw(this.ctx);
    if (otd.turnAround) {
      otd.imageMirrorBack(this.ctx);
    }
  };


  addObjectToMap(object) {
    object.forEach(o => {
      this.addToMap(o);
    });
  };


}
