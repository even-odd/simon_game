export const EASY_LEVEL = 1.5;
export const MIDDLE_LEVEL = 1;
export const HARD_LEVEL = 0.4;

export const LEVES_OF_DIFFICULTY = {
  easy: EASY_LEVEL,
  middle: MIDDLE_LEVEL,
  hard: HARD_LEVEL,
};

export function getInitialOptions() {
  return {
    levelDifficulty: HARD_LEVEL,
  };
}

export const BUTTONS = [
  {
    color: 'blue',
    // sound: makeSound('1')
  }, {
    color: 'red',
    // sound: makeSound('../../sounds/2.mp3')
  },
  {
    color: 'yellow',
    // sound: makeSound('../../sounds/3.mp3')
  },
  {
    color: 'green',
    // sound: makeSound('../../sounds/4.mp3')
  }
];
//
// function makeSound(url) {
//   let sound = new Audio(url);
//   // sound.type = 'audio/mp3';
//
//   return sound;
// }
