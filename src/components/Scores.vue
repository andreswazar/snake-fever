<template>
    <v-card elevation="1">
        <v-card-title>
            High Scores
            <v-spacer></v-spacer>
            <v-btn text small dark color="primary" @click="getScoresFromApi">
                <v-icon>mdi-reload</v-icon>
            </v-btn>

            <v-container class="text-center mb-n6 subtitle-1">
                <v-row>
                    <v-col>
                        <p>Username</p>
                    </v-col>
                    <v-col>
                        <p>Score</p>
                    </v-col>
                </v-row>
            </v-container>

        </v-card-title>
        <v-card-text>
            <v-container class="text-center mt-n6">
                <v-list>
                    <template v-for="score in scores">
                        <v-row :key="score.id">
                            <v-col class="pl-5">
                                <p>{{ score.PlayerUsername }}</p>
                            </v-col>
                            <v-col class="pl-6">
                                <p class="pl-5">{{ score.PointsScored }}</p>
                            </v-col>
                        </v-row>
                    </template>
                </v-list>
            </v-container>
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
            fetch("http://localhost:8082/api/getAllScores", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            }).then((response) => {
                return response.json();
            }).then((decodedResponse) => {
                this.scores = decodedResponse;
                this.$store.state.showAlertFunction("High scores retrieved successfully.", "success");
            }).catch(() => {
                this.$store.state.showAlertFunction("Failed to retrieve high scores.", "error");
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
        height: 265px;
    }

    .v-card__text {
        flex-grow: 1;
        overflow: auto;
    }

    p {
        font-size: 100%;
    }

    @media only screen and (min-width: 960px) {
        .v-card {
            height: 335px;
        }

        .v-card__title {
            font-size: 110%;
        }

        p {
            font-size: 80%;
        }
    }

    @media only screen and (min-width: 1264px) {
        .v-card__title {
            font-size: 125%;
        }

        p {
            font-size: 100%;
        }
    }
</style>