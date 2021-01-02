import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        score: 0,
        username: "",
        gameIsPlayable: false // Prevents user from clicking "Start Game" through the username modal
    }
});