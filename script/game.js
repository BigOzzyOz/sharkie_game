let canvas, world;
let keyPressed = {};
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
  // console.log(e);
  keyPressed[e.key] = true;
  // console.log(keyPressed);
  if ((e.key === 'ArrowLeft' && keyPressed['ArrowRight']) || (e.key === 'ArrowRight' && keyPressed['ArrowLeft']) || (e.key === 'ArrowUp' && keyPressed['ArrowDown']) || (e.key === 'ArrowDown' && keyPressed['ArrowUp'])) {
    return;
  };
  keyboard.RIGHTUP = (keyPressed['ArrowRight'] && e.key === 'ArrowUp') || (keyPressed['ArrowUp'] && e.key === 'ArrowRight') ? true : false;
  keyboard.RIGHTDOWN = (keyPressed['ArrowRight'] && e.key === 'ArrowDown') || (keyPressed['ArrowDown'] && e.key === 'ArrowRight') ? true : false;
  keyboard.LEFTUP = (keyPressed['ArrowLeft'] && e.key === 'ArrowUp') || (keyPressed['ArrowUp'] && e.key == 'ArrowLeft') ? true : false;
  keyboard.LEFTDOWN = (keyPressed['ArrowLeft'] && e.key === 'ArrowDown') || (keyPressed['ArrowDown'] && e.key == 'ArrowLeft') ? true : false;
  keyboard.SPACE = e.key === ' ' ? true : false;
  keyboard.LEFT = e.key === 'ArrowLeft' ? keyPressed.length > 1 ? false : true : false;
  keyboard.RIGHT = e.key === 'ArrowRight' ? keyPressed.length > 1 ? false : true : false;
  keyboard.UP = e.key === 'ArrowUp' ? keyPressed.length > 1 ? false : true : false;
  keyboard.DOWN = e.key === 'ArrowDown' ? keyPressed.length > 1 ? false : true : false;
});


window.addEventListener('keyup', (e) => {
  // console.log(e);
  delete keyPressed[e.key];
  // console.log(keyPressed);
  keyboard.RIGHTUP = (keyPressed['ArrowRight'] && e.key === 'ArrowUp') || (keyPressed['ArrowUp'] && e.key === 'ArrowRight') ? false : false;
  keyboard.RIGHTDOWN = (keyPressed['ArrowRight'] && e.key === 'ArrowDown') || (keyPressed['ArrowDown'] && e.key === 'ArrowRight') ? false : false;
  keyboard.LEFTUP = (keyPressed['ArrowLeft'] && e.key === 'ArrowUp') || (keyPressed['ArrowDown'] && e.key === 'ArrowLeft') ? false : false;
  keyboard.LEFTDOWN = (keyPressed['ArrowLeft'] && e.key === 'ArrowDown') || (keyPressed['ArrowDown'] && e.key === 'ArrowLeft') ? false : false;
  keyboard.SPACE = e.key === ' ' ? false : keyPressed[' '] ? true : false;
  keyboard.LEFT = e.key === 'ArrowLeft' ? false : keyPressed['ArrowLeft'] ? true : false;
  keyboard.RIGHT = e.key === 'ArrowRight' ? false : keyPressed['ArrowRight'] ? true : false;
  keyboard.UP = e.key === 'ArrowUp' ? false : keyPressed['ArrowUp'] ? true : false;
  keyboard.DOWN = e.key === 'ArrowDown' ? false : keyPressed['ArrowDown'] ? true : false;
});

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
};
