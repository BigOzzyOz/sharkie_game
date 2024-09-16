class Pufferfish extends MoveableObject {
  height = 50;
  width = 50;
  variantPufferfish;
  moveSetTransition;
  moveSetBubbleSwim;
  moveSetDead;
  maxLeft;
  maxRight;
  transition = false;


  constructor(variant = Math.floor(Math.random() * 3) + 1, x = 340 + Math.floor(Math.random() * 100), y = 100 + Math.floor(Math.random() * 200)) {
    super();
    this.offset = {
      right: 5,
      left: 5,
      top: 10,
      bottom: 5
    };
    this.variantPufferfish = variant;
    this.loadAllImages(this.variantPufferfish);
    this.x = x;
    this.y = y;
    this.maxLeft = this.x - 100 - Math.floor(Math.random() * 200);
    this.maxRight = this.x + 100 + Math.floor(Math.random() * 200);
    this.animateId = setInterval(() => this.update(), 100);
  }


  update() {
    if (this.characterNear()) {
      this.currentImage = !this.currentMoveSet.includes(this.moveSetTransition[0]) ? 0 : this.currentImage;
      this.setAnimation(this.moveSetTransition);
      this.transition = this.currentImage >= this.moveSetTransition.length ? true : false;
    } else if (this.characterFar()) {
      this.currentImage = !this.currentMoveSet.includes(this.moveSetTransition[0]) ? 5 : this.currentImage;
      this.setAnimation(this.moveSetTransition);
      this.currentImage = this.currentImage - 2;
      this.transition = this.currentImage === 0 ? false : true;
    } else {
      this.currentMoveSet = this.transition ? this.moveSetBubbleSwim : this.moveSetSwim;
      this.setAnimation(this.currentMoveSet);
      if (this.turnAround) {
        this.swimRight();
      } else {
        this.swimLeft();
      }
    }

  }


  swimLeft() {
    this.transition ? this.x -= 2.5 : this.x -= 5;
    this.turnAround = this.x <= this.maxLeft ? true : false;
  }


  swimRight() {
    this.transition ? this.x += 2.5 : this.x += 5;
    this.turnAround = this.x >= this.maxRight ? false : true;
  }




  loadAllImages(variant) {
    let imagesSwim = `${pufferFishAnimation[`moveSetSwim${variant}`]}`;
    let imagesTransition = `${pufferFishAnimation[`moveSetTransition${variant}`]}`;
    let imagesBubbleSwim = `${pufferFishAnimation[`moveSetBubbleSwim${variant}`]}`;
    let imagesDead = `${pufferFishAnimation[`moveSetDead${variant}`]}`;
    this.currentMoveSet = imagesSwim.split(',');
    this.moveSetSwim = imagesSwim.split(',');
    this.moveSetTransition = imagesTransition.split(',');
    this.moveSetBubbleSwim = imagesBubbleSwim.split(',');
    this.moveSetDead = imagesDead.split(',');
    this.loadImages(this.moveSetTransition);
    this.loadImages(this.moveSetBubbleSwim);
    this.loadImages(this.moveSetDead);
    this.loadImages(this.currentMoveSet);
  }


  characterNear() {
    if (!this.world) return false;
    const distanceX = Math.abs(this.world.character.x + 100 - this.x + 25);
    const distanceY = Math.abs(this.world.character.y + 100 - this.y + 25);
    return distanceX <= 150 && distanceY <= 150 && !this.transition;
  };


  characterFar() {
    if (!this.world) return false;
    const distanceX = Math.abs(this.world.character.x + 100 - this.x + 25);
    const distanceY = Math.abs(this.world.character.y + 100 - this.y + 25);
    return (distanceX > 150 || distanceY > 150) && this.transition;
  }
}