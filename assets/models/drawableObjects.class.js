class DrawableObjects {
  world;
  x = 20;
  y = 120;
  height = 100;
  width = 100;
  img;
  currentImage = 0;
  currentMoveSet = [];
  imageCache = {};
  turnAround = false;


  /**
   * Loads an image from the given path into the 'img' property.
   * @param {string} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Loads an array of image paths into the 'imageCache' object and sets the 'img' property to the
   * first image in the array.
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    }
    );
    this.img = this.imageCache[this.currentMoveSet[0]];
  }


  /**
   * Mirror the image horizontally by scaling and translating the context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to modify.
   * @return {void}
   */
  imageMirror(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-this.width, 0);
    this.x = this.x * -1;
  }


  /**
   * Reverses the mirroring operation on the canvas context and flips the object's x-coordinate back to its original value.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to modify.
   * @return {void}
   */
  imageMirrorBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }


  /**
   * Draws the object's image on the canvas context at the object's x,y coordinates with the object's width and height.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @return {void}
   */
  imageDraw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  /**
   * Draws two rectangles on the canvas context around the object's bounding box.
   * The outer rectangle is green and the inner rectangle is red.
   * The outer rectangle represents the object's bounding box without any offset.
   * The inner rectangle represents the object's bounding box with the offset taken into account.
   * The frame is only drawn for objects that are an instance of Character, Jellyfish, Pufferfish, Boss, or CollectableObject.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @return {void}
   */
  frameDraw(ctx) {
    if (this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Boss || this instanceof CollectableObject) {
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

  /**
   * Draws text on the canvas context for objects that are an instance of Statusbar.
   * The text is drawn at the object's x,y coordinates with a yellow fill color and a black outline.
   * The text is offset by 50 pixels to the right and 50 pixels down from the object's coordinates.
   * The text is a counter that is updated every frame and is displayed as a number.
   * The counter is either the poison counter or the coin counter, depending on which counter is greater than zero.
   * The counter is reset to zero when it reaches five.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
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