const level1 = new Level(
  [
    // new Pufferfish(undefined, 720, 100),
    // new Pufferfish(undefined, 720, 150),
    // new Jellyfish(undefined, 960),
    // new Jellyfish(undefined, 1080),
    // new Boss(4300)
  ],

  [
    new CollectableObject('coin', 300, 205),
    new CollectableObject('coin', 300, 245),
    new CollectableObject('coin', 340, 205),
    new CollectableObject('coin', 340, 245),
    new CollectableObject('coin', 380, 205),
    new CollectableObject('coin', 380, 245),
    new CollectableObject('coin', 420, 205),
    new CollectableObject('coin', 420, 245),
    new CollectableObject('coin', 460, 205),
    new CollectableObject('coin', 460, 245),
    new CollectableObject('coin', 460, 165),
    new CollectableObject('coin', 460, 285),
    new CollectableObject('coin', 500, 185),
    new CollectableObject('coin', 500, 225),
    new CollectableObject('coin', 500, 265),
    new CollectableObject('coin', 540, 205),
    new CollectableObject('coin', 540, 245),
    new CollectableObject('coin', 580, 225),
    new CollectableObject('poison', 610, 195),
    new CollectableObject('coin', 1270, 238),
    new CollectableObject('coin', 1266, 269),
    new CollectableObject('coin', 1257, 298),
    new CollectableObject('coin', 1243, 326),
    new CollectableObject('coin', 1224, 352),
    new CollectableObject('coin', 1201, 375),
    new CollectableObject('coin', 1175, 395),
    new CollectableObject('coin', 1146, 411),
    new CollectableObject('coin', 1116, 423),
    new CollectableObject('coin', 1085, 430),
    new CollectableObject('coin', 1054, 433),
    new CollectableObject('coin', 1023, 432),
    new CollectableObject('coin', 992, 427),
    new CollectableObject('coin', 961, 418),
    new CollectableObject('coin', 933, 405),
    new CollectableObject('coin', 906, 388),
    new CollectableObject('coin', 881, 368),
    new CollectableObject('coin', 860, 345),
    new CollectableObject('coin', 842, 320),
    new CollectableObject('coin', 827, 293),
    new CollectableObject('coin', 817, 264),
    new CollectableObject('coin', 812, 234),
    new CollectableObject('coin', 812, 203),
    new CollectableObject('coin', 817, 173),
    new CollectableObject('coin', 827, 144),
    new CollectableObject('coin', 842, 117),
    new CollectableObject('coin', 860, 92),
    new CollectableObject('coin', 881, 69),
    new CollectableObject('coin', 906, 49),
    new CollectableObject('coin', 933, 32),
    new CollectableObject('coin', 961, 19),
    new CollectableObject('coin', 992, 10),
    new CollectableObject('coin', 1023, 5),
    new CollectableObject('coin', 1054, 5),
    new CollectableObject('coin', 1085, 8),
    new CollectableObject('coin', 1116, 15),
    new CollectableObject('coin', 1146, 27),
    new CollectableObject('coin', 1175, 43),
    new CollectableObject('coin', 1201, 63),
    new CollectableObject('coin', 1224, 86),
    new CollectableObject('coin', 1243, 112),
    new CollectableObject('coin', 1257, 144),
    new CollectableObject('coin', 1266, 173),
    new CollectableObject('coin', 1270, 205),

    new CollectableObject('coin', 1200, 280),  // Startpunkt, rechts außen
    new CollectableObject('coin', 1170, 300),
    new CollectableObject('coin', 1140, 310),
    new CollectableObject('coin', 1110, 320),
    new CollectableObject('coin', 1080, 325),
    new CollectableObject('coin', 1050, 330),  // Mittelpunkt unten
    new CollectableObject('coin', 1020, 325),
    new CollectableObject('coin', 990, 320),
    new CollectableObject('coin', 960, 310),
    new CollectableObject('coin', 930, 300),
    new CollectableObject('coin', 900, 280),  // Endpunkt, links außen
    // Endpunkt, links
    new CollectableObject('poison', 950, 115),
    new CollectableObject('poison', 1120, 115)

  ],

  [
    'assets/img/3. Background/Layers/5. Water/L1.png',
    'assets/img/3. Background/Layers/4.Fondo 2/D1.png',
    'assets/img/3. Background/Layers/3.Fondo 1/D1.png',
    'assets/img/3. Background/Layers/2. Floor/D1.png',
    'assets/img/3. Background/Layers/1. Light/1.png'
  ],

  [
    'assets/img/3. Background/Layers/5. Water/L2.png',
    'assets/img/3. Background/Layers/4.Fondo 2/D2.png',
    'assets/img/3. Background/Layers/3.Fondo 1/D2.png',
    'assets/img/3. Background/Layers/2. Floor/D2.png',
    'assets/img/3. Background/Layers/1. Light/2.png'
  ],

  [
    new Barrier(0 - 45, false),
    new Barrier(720 * 6 - 45, true)
  ]
);