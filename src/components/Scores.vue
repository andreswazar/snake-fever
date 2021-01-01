<template>
    <v-card elevation="1" shaped height="488px">
        <v-card-title>
            High Scores
            <v-spacer></v-spacer>
            <v-btn text small dark color="primary" @click="getScoresFromApi">
                <v-icon>mdi-reload</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-list>
                <template v-for="score in scores">
                    <div :key="score.id">{{ score.PlayerUsername }}: {{ score.PointsScored }}</div>
                </template>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Scores",
    data: function () {
        return {
            scores: []
        }
    },
    methods: {
        getScoresFromApi() {
            console.log("Requested score from backend");

            fetch("http://localhost:8082/api/getAllScores", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            }).then(function (response) {
                return response.json();
            }).then((decodedResponse) => {
                this.scores = decodedResponse;
            });
        }
    },
    created() {
        this.getScoresFromApi();
    },
}
</script>

<style scoped>
    .v-card {
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .v-card__text {
        flex-grow: 1;
        overflow: auto;
    }
</style>