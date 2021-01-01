class uiUpdater {
    static updateScoreUI(score) {
        let scoreElement = document.querySelector("#score");
        scoreElement.textContent = `Current Score: ${score}`;
    }
}

export default uiUpdater;