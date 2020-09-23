import Vue from 'vue';
import SimonGame from './SimonGame.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: (h) => h(SimonGame),
}).$mount('#game');
