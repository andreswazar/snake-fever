import {store} from "./../../store/store.js";

class apiCommunicator {
    static sendScoreToAPI(score) {
        fetch("http://localhost:8082/api/postScore", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                playerUsername: store.state.username, // Takes username from Vuex store
                pointsScored: score.toString() // Takes score from parameter, which is from a snake.js property
            })
        }).then((response) => {
            store.state.alertMessage = "Score recorded successfully."
            store.state.alertType = "success"
            store.state.showAlert = true;
            return response.json;
        }).catch(() => {
            store.state.alertMessage = "Failed to record score."
            store.state.alertType = "error"
            store.state.showAlert = true;
        });
    }
}

export default apiCommunicator;