class apiCommunicator {
    static sendScoreToAPI(score) {
        fetch("http://localhost:8081/api/postScore", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                playerUsername: "Test 3",
                pointsScored: score.toString()
            })
        }).then(function (response) {
            console.log("Sent score to backend");
            return response.json;
        });
    }
}

export default apiCommunicator;