let canvas, world;
let keyPressed = {};
let keyboard = new Keyboard();


/**
 * Initializes the game.
 * Hides the start menu and shows the loader screen for 2.5 seconds.
 * Then, it hides the loader screen and shows the game overlay.
 * @function
 */
function init() {
  document.getElementById('loaderWindow').classList.toggle('d-none');
  document.getElementById('start').classList.add('d-none');
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  setTimeout(() => {
    document.getElementById('loaderWindow').classList.toggle('d-none');
    document.getElementById('overlay').classList.remove('d-none');
  }, 2500);
}

/**
 * Listens for key down events on the document.
 * @param {KeyboardEvent} event - The key down event.
 * @listens document:keydown
 */
window.addEventListener('keydown', (e) => {
  keyPressed[e.key] = true;
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
  keyboard.D = e.key === 'd' ? true : false;
  keyboard.ESC = e.key === 'Escape' ? true : false;
});


/**
 * Listens for key up events on the document.
 * @param {KeyboardEvent} event - The key up event.
 * @listens document:keyup
 */
window.addEventListener('keyup', (e) => {
  delete keyPressed[e.key];
  keyboard.RIGHTUP = (keyPressed['ArrowRight'] && e.key === 'ArrowUp') || (keyPressed['ArrowUp'] && e.key === 'ArrowRight') ? false : false;
  keyboard.RIGHTDOWN = (keyPressed['ArrowRight'] && e.key === 'ArrowDown') || (keyPressed['ArrowDown'] && e.key === 'ArrowRight') ? false : false;
  keyboard.LEFTUP = (keyPressed['ArrowLeft'] && e.key === 'ArrowUp') || (keyPressed['ArrowDown'] && e.key === 'ArrowLeft') ? false : false;
  keyboard.LEFTDOWN = (keyPressed['ArrowLeft'] && e.key === 'ArrowDown') || (keyPressed['ArrowDown'] && e.key === 'ArrowLeft') ? false : false;
  keyboard.LEFT = e.key === 'ArrowLeft' ? false : keyPressed['ArrowLeft'] ? true : false;
  keyboard.RIGHT = e.key === 'ArrowRight' ? false : keyPressed['ArrowRight'] ? true : false;
  keyboard.UP = e.key === 'ArrowUp' ? false : keyPressed['ArrowUp'] ? true : false;
  keyboard.DOWN = e.key === 'ArrowDown' ? false : keyPressed['ArrowDown'] ? true : false;
});


/**
 * Clears all currently set intervals.
 * @function
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
};


/**
 * Toggles a given class name for the element with the given id.
 * @param {string} id - The id of the element.
 * @param {string} className - The class name to be toggled.
 */
function toggleTranslate(id, className) {
  document.getElementById(id).classList.toggle(className);
  soundEffects[0].next.play();
}


/**
 * Sets the volume for either sound effects or music based on the value of the
 * element with the given id.
 * @param {string} id - The id of the element which contains the volume value.
 */
function setVolume(id) {
  let vol = document.getElementById(id).value;
  id === 'sound' ? soundEffects.forEach(effect => Object.values(effect).forEach(audio => audio.volume = vol)) : music.forEach(song => Object.values(song).forEach(audio => audio.volume = vol));
}


/**
 * Resets the current time of a sound effect to 0 and plays it.
 * @param {HTMLAudioElement} soundEffect - The sound effect to be played.
 */
function playSound(soundEffect) {
  soundEffect.currentTime = 0;
  soundEffect.play();
}


/**
 * Toggles the game pause menu and the paused state of the world.
 * If the ESC key is pressed or the function is called with a truthy value for
 * the click parameter, the game pause menu is toggled and the world's paused
 * state is set to the opposite of its current state.
 * The world's draw function is called if the world is unpaused.
 * The ESC key's value in the keyboard object is set to false.
 * @param {boolean} [click=false] - Whether the function was called due to a click
 * event.
 */
function gamePause(click = false) {
  if ((keyboard.ESC && world.isPaused) || (click && world.isPaused)) {
    document.getElementById('pauseMenu').classList.toggle('d-none');;
    world.isPaused = false;
    world.draw();
  } else if ((keyboard.ESC && !world.isPaused) || (click && !world.isPaused)) {
    document.getElementById('pauseMenu').classList.toggle('d-none');;
    world.isPaused = true;
  }
  keyboard.ESC = false;
};