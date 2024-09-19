class World {
  level = level1;
  character = new Character();
  bubbles = [];
  backgroundImage = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarLife = new Statusbar(15, 400, 200, 0);
  statusBarPoison = new Statusbar(200, 400, 60, 1);
  statusBarCoin = new Statusbar(560, 410, 60, 2);


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.updateGame();
  }


  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    for (let i = -1; i < 7; i++) {
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


  updateGame() {
    setInterval(() => {
      this.checkCollision();
      this.statusBarLife.updateLife(this.character.life);
    }, 100);
  }


  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.isHit(enemy);
      }
      this.bubbles.forEach((bubble) => {
        if (bubble.isColliding(enemy)) {
          bubble.isHit(enemy);
        }
      });
    });
    this.level.collectables.forEach((collectable) => {
      if (this.character.isColliding(collectable)) {
        collectable.isCollected();
      }
    });
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.backgroundImage);
    this.addObjectToMap(this.level.barriers);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.collectables);
    this.addToMap(this.character);
    this.addObjectToMap(this.bubbles);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarPoison);
    this.addToMap(this.statusBarCoin);

    this.ctx.translate(-this.camera_x, 0);


    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  };


  addToMap(otd) {
    if (otd.turnAround) otd.imageMirror(this.ctx);
    otd.imageDraw(this.ctx);
    otd.frameDraw(this.ctx);
    otd.textDraw(this.ctx);
    if (otd.turnAround) otd.imageMirrorBack(this.ctx);
  };


  addObjectToMap(object) {
    object.forEach(o => this.addToMap(o));
  };


}
