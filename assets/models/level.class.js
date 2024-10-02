class Level {
  enemies;
  collectables;
  backgroundImageSet1;
  backgroundImageSet2;
  barriers;

  /**
   * Constructor for the Level class.
   * @param {Array} enemies - An array of all the enemies in the level.
   * @param {Array} collectables - An array of all the collectable objects in the level.
   * @param {HTMLImageElement[]} backgroundImageSet1 - An array of all the background images for the first parallax layer.
   * @param {HTMLImageElement[]} backgroundImageSet2 - An array of all the background images for the second parallax layer.
   * @param {Object} barriers - An object containing the map of all the barriers in the level.
   */
  constructor(enemies, collectables, backgroundImageSet1, backgroundImageSet2, barriers) {
    this.enemies = enemies;
    this.collectables = collectables;
    this.backgroundImageSet1 = backgroundImageSet1;
    this.backgroundImageSet2 = backgroundImageSet2;
    this.barriers = barriers;
  }

}