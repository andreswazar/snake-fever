import {store} from "./../../store/store.js";

class apiCommunicator {
    static sendScoreToAPI(score) {
        fetch("http://localhost:8082/api/postScore", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                playerUsername: store.state.username, // Takes username from Vuex store
                pointsScored: score.toString() // Takes score from parameter, which is from snake.js property
            })
        }).then(function (response) {
            console.log("Sent score to backend");
            return response.json;
        });
    }
}

export default apiCommunicator;