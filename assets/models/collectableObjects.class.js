class CollectableObject extends MoveableObject {
  variant = 0;




  constructor(variant, x, y) {
    super();
    this.variant = variant;
    this.x = x;
    this.y = y;

    if (variant === 'coin') {
      this.width = 35;
      this.height = 35;
      this.loadImages(collectableObject.moveSetCoins);
      this.currentMoveSet = collectableObject.moveSetCoins;
    } else if (variant === 'poison') {
      this.loadImages(collectableObject.moveSetPoison);
      this.currentMoveSet = collectableObject.moveSetPoison;
      this.width = 50;
      this.height = 70;
      this.offset = {
        left: 10,
        right: 10,
        top: 20,
        bottom: 0
      };
    }
    this.animateId = setInterval(() => this.update(), 100);
  }

  update() {
    this.setAnimation(this.currentMoveSet);
  }


  isCollected() {
    if (this.variant === 'poison') {
      if (world.statusBarPoison.poisonCounter >= 5) {
        return;
      } else {
        world.statusBarPoison.poisonCounter++;
        this.destroy(world.level.collectables, this);
      }
    } else if (this.variant === 'coin') {
      world.statusBarCoin.coinCounter++;
      this.destroy(world.level.collectables, this);
    }
  }
}