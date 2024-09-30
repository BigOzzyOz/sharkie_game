class CollectableObject extends MoveableObject {
  variant = 0;




  constructor(variant, x, y) {
    super();
    this.variant = variant;
    this.x = x;
    this.y = y;

    if (variant === 'coin') {
      this.width = 30;
      this.height = 30;
      this.currentMoveSet = collectableObject.moveSetCoins;
      this.loadImages(collectableObject.moveSetCoins);
    } else if (variant === 'poison') {
      this.currentMoveSet = collectableObject.moveSetPoison;
      this.loadImages(collectableObject.moveSetPoison);
      this.width = 45;
      this.height = 60;
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
    if (!world || world.isPaused) return;
    this.setAnimation(this.currentMoveSet);
  }


  isCollected() {
    if (this.variant === 'poison') {
      if (world.statusBarPoison.poisonCounter >= 5) {
        return;
      } else {
        world.statusBarPoison.poisonCounter++;
        this.destroy(world.level.collectables, this);
        playSound(soundEffects[0].poison);
      }
    } else if (this.variant === 'coin') {
      world.statusBarCoin.coinCounter++;
      this.destroy(world.level.collectables, this);
      playSound(soundEffects[0].coin);
    }
  }
}