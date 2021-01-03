import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        // Related to game
        score: 0,
        username: "",
        gameIsPlayable: false, // Prevents user from clicking "Start Game" through the username modal
        
        // Related to alerts
        showAlert: false,
        alertType: "error",
        alertMessage: "",
        showAlertFunction: {},
        hideAlertFunction: {}
    }
});