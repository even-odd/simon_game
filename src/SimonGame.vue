<template>
  <div class="game">

    <div>
      <game-controls :begin="begin"/>
      <div class="game--round">
        <b>Раунд:</b> {{ round }}
      </div>
    </div>


    <div class="game--board">
      <button v-for="(btn, index) in buttons"
           :key="index"
           :class="['game--btn', `game--btn-${btn.color}`, {'active': isActive(index)}]"
           :disabled="highlighting || purely"
           @click="handleClick(index)"
      ></button>
    </div>

  </div>
</template>

<script>
import GameControls from '@/components/GameControls/GameControls.vue';

import { BUTTONS, getInitialOptions, } from '@/components/consts';
import { getRandomInt } from '@/components/helpers';

export default {
  name: 'SimonGame',
  components: {
    GameControls,
  },
  data() {
    return {
      options: { ...getInitialOptions() },
      sequence: [],
      active: '',
      highlighting: false,
      round: 0,
      counter: 0,
      timer: null,
      purely: true,

      saveCounter: 0, // for debug
    };
  },
  computed: {
    buttons() {
      return BUTTONS;
    },
  },
  methods: {
    begin(options) {
      console.debug('begin game: options', { ...options });
      this.clearTrash();
      this.purely = false;

      this.options = { ...options };
      this.round = 1;

      this.updateSequence();
      this.highlightSequence();
    },

    handleClick(index) {
      // this.playSound(index);
      this.checkSequence(index);
    },

    // playSound(index) {
    //   console.debug('playSound: index', index)
    //
    //   let btn = this.buttons[index];
    //   btn.sound.play();
    // },

    checkSequence(index) {
      console.debug('check sequence');
      if (this.purely) {
        this.begin(this.options);
        return;
      }

      if (this.highlighting) return;
      this.highlighting = true;

      let { sequence, round, counter } = this;
      if (index !== sequence[counter]) {
        this.end(`Игра окончилась на раунде №"${round}"`);
        return;
      }

      if (counter === round - 1) {
        this.counter = 0;
        this.round = round + 1;

        this.updateSequence();
        this.highlightSequence();
        this.highlighting = false;
        return;
      }

      ++this.counter;
      this.highlighting = false;
    },

    updateSequence() {
      console.debug('update sequence');
      let newValue = getRandomInt(4);
      this.sequence.push(newValue);
    },

    highlightSequence() {
      let { sequence } = this;
      let timeout = this.options.levelDifficulty * 1000;
      console.debug('------------------------')
      console.debug('highlight: sequence', sequence);

      this.highlightColor(sequence, 0, this.highlightColor.bind(this), timeout);
      // this.saveCounter = 0; // for debug
      console.debug('------------------------')
    },

    highlightColor(sequence, btnIndex, callback, timeout) {
        setTimeout( () => {
          if (btnIndex === sequence.length) {
            this.active = '';
            return;
          }

          let btn = sequence[btnIndex];
          this.active = btn;
          setTimeout(() => this.active = '', 350);

          callback(sequence, btnIndex + 1, callback, timeout);
        }, timeout);
    },

    end(msg) {
      console.debug('end game');
      this.clearTrash();

      alert(msg);
    },

    isActive(index) {
      // console.debug('is active: index', index, 'currActive', this.active);
      return index === this.active;
    },

    clearTrash() {
      console.debug('clear trash');
      if (this.purely) return;

      this.sequence = [];
      this.active = '';
      this.highlighting = false;
      this.round = 0;
      this.counter = 0;
      this.timer = null;

      this.purely = true;
    },
  },
};
</script>

<style>
.game {
  display: flex;
  justify-content: center;
}

.game--board {
  display: flex;

  flex-wrap: wrap;
  min-width: 204px;
  height: 204px;
  border: 2px solid black;
}
.game--btn {
  width: 50%;
  height: 50%;
  border: 3px solid transparent;

  margin: 0;
  padding: 0;
}

.game--btn.active {
  border: 2px dashed white;
  opacity: 70%;
}

.game--btn:active {
  border: 2px solid black;
  opacity: 70%;
}

.game--btn-red {
  background-color: brown;
  border-top-right-radius: 95%;
}

.game--btn-blue {
  background-color: lightseagreen;
  border-top-left-radius: 95%;
}

.game--btn-green {
  background-color: olivedrab;
  border-bottom-right-radius: 95%;
}

.game--btn-yellow {
  background-color: darkorange;
  border-bottom-left-radius: 95%;
}
</style>
