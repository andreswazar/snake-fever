import {store} from "../../../store/store.js";

export function sendScoreToAPI(score = store.state.score) {
    fetch("http://localhost:8082/api/postScore", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            playerUsername: store.state.username, // Takes username from Vuex store
            pointsScored: score.toString() // Takes score from parameter, which is from a snake.js property
        })
    }).then((response) => {
        store.state.showAlertFunction("Score recorded successfully.", "success");
        return response.json;
    }).catch(() => {
        store.state.showAlertFunction("Failed to record score.", "error");
    });
}