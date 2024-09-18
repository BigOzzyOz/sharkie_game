const level1 = new Level(
  [
    new Pufferfish(undefined, 720, 100),
    new Pufferfish(undefined, 720, 150),
    new Jellyfish(undefined, 960),
    new Jellyfish(undefined, 1080),
    new Boss(5000)
  ],

  [
    new CollectableObject('coin', 200, 100),
    new CollectableObject('poison', 200, 200)
  ],

  [
    'assets/img/3. Background/Layers/5. Water/L1.png',
    'assets/img/3. Background/Layers/4.Fondo 2/L1.png',
    'assets/img/3. Background/Layers/3.Fondo 1/L1.png',
    'assets/img/3. Background/Layers/2. Floor/L1.png',
    'assets/img/3. Background/Layers/1. Light/1.png'
  ],

  [
    'assets/img/3. Background/Layers/5. Water/L2.png',
    'assets/img/3. Background/Layers/4.Fondo 2/L2.png',
    'assets/img/3. Background/Layers/3.Fondo 1/L2.png',
    'assets/img/3. Background/Layers/2. Floor/L2.png',
    'assets/img/3. Background/Layers/1. Light/2.png'
  ]
);