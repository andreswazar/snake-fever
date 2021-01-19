import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        // Related to game
        game: {},
        score: 0,
        username: "",
        gameIsPlayable: false, // Prevents user from clicking "Start Game" through the modals
        setGamePlayable: {},
        setGameUnplayable: {},

        // Related to multiplayer
        playerNumber: 0,
        
        // Related to alerts
        showAlert: false,
        alertType: "error",
        alertMessage: "",
        showAlertFunction: {},

        // Related to game code popup
        showGameCodePopup: false,
        showGameCodePopupFunction: {},
        hideGameCodePopupFunction: {},
    }
});