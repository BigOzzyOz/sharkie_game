class Background extends MoveableObject {
  x = 0;
  y = -0;
  width = 720;
  height = 480;


  /**
   * The function is a constructor that initializes properties for an image object with a specified
   * image path, x position, width, and height.
   * @param imagePath - The `imagePath` parameter in the constructor represents the path to the image
   * file that you want to load for the object. This path should point to the location of the image
   * file in your project directory or a URL if the image is hosted online.
   * @param x - The `x` parameter typically represents the horizontal position of an object on the
   * screen or canvas. It specifies the x-coordinate where the object will be placed.
   * @param width - The `width` parameter in the constructor represents the width of the image that
   * will be loaded. It specifies the horizontal dimension of the image in pixels.
   * @param height - The `height` parameter in the constructor function represents the vertical
   * dimension of the image or element being created. It specifies how tall the image or element will
   * be displayed on the screen.
   */
  constructor(imagePath, x, width, height) {
    super();
    this.x = x;
    this.width = width;
    this.height = height;
    this.loadImage(imagePath);
  }
}