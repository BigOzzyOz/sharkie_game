class CollectableObject extends MoveableObject {
  variant = 0;




  constructor(variant) {
    this.variant = variant;
    if (variant === 'coin') {

    } else if (variant === 'poison') {

    }
  }
}