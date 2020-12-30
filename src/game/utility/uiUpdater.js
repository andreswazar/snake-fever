class uiUpdater {
    static updateScoreUI(score) {
        let scoreElement = document.querySelector("#score");
        scoreElement.textContent = `Score: ${score}`;
    }
}

export default uiUpdater;