class DrawableObjects {
  world;
  x = 20;
  y = 100;
  height = 100;
  width = 100;
  img;
  currentImage = 0;
  currentMoveSet = [];
  imageCache = {};
  turnAround = false;


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    }
    );
    this.img = this.imageCache[this.currentMoveSet[0]];
  }




  imageMirror(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-this.width, 0);
    this.x = this.x * -1;
  }


  imageMirrorBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }


  imageDraw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  frameDraw(ctx) {
    if (this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Boss) {
      ctx.beginPath();
      ctx.strokeStyle = '#0f0';
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.beginPath();
      ctx.strokeStyle = '#f00';
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
    }
  }

  textDraw(ctx) {
    if (this instanceof Statusbar) {
      ctx.fillStyle = '#d5ff0d';
      ctx.font = '32px luckyGuy';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      if (this.poisonCounter >= 0) ctx.fillText('= ' + this.poisonCounter + '/5', this.x + 50, this.y + 50);
      else if (this.coinCounter >= 0) ctx.fillText('= ' + ('000' + String(this.coinCounter)).substring(String(this.coinCounter).length), this.x + 55, this.y + 40);
      ctx.shadowColor = 'transparent';
    }
  }
}