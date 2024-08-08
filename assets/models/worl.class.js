class World {



  character = new Character();
  enemies = [
    new Pufferfish(),
    new Pufferfish(),
    new Jellyfish(),
    new Jellyfish(),
    new Boss()
  ];
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemies[i].img, this.enemies[i].x, this.enemies[i].y, this.enemies[i].height, this.enemies[i].width);
    };
  }
}