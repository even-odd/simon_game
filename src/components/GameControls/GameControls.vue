<template>
  <div class="game--controls">

    <button class="game--new_game" @click="startNewGame">Начать новую игру</button>

    <div class="game--options">
      <div class="game--levels">
        <span class="game--level_title">Уровень сложности:</span>

        <div class="game--level game--level_easy">
          <label for="easy">Легкий</label>
          <input name="level" id="easy" type="radio" :value="levels.easy"  v-model="options.levelDifficulty"/>
        </div>

        <div class="game--level game--level_medium">
          <label for="medium">Средний</label>
          <input name="level" id="medium" type="radio" :value="levels.middle" v-model="options.levelDifficulty"/>
        </div>

        <div class="game--level game--level_hard">
          <label for="hard">Тяжелый</label>
          <input name="level" id="hard" type="radio" :value="levels.hard" v-model="options.levelDifficulty"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInitialOptions, LEVES_OF_DIFFICULTY } from '@/components/consts';

export default {
  name: 'GameControls',
  props: ['begin'],
  data() {
    return {
      options: { ...getInitialOptions() },
    };
  },
  computed: {
    levels() {
      return LEVES_OF_DIFFICULTY;
    }
  },
  methods: {
    startNewGame() {
      this.begin(this.options);
    },
  },
};
</script>

<style scoped>

</style>
