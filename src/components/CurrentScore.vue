<template>
    <v-card elevation="1" shaped class="mb-4">
        <v-card-title id="score">Current Score: {{score}}</v-card-title>
    </v-card>
</template>

<script>
export default {
    computed: {
        score() {
            return this.$store.state.score
        }
    }
}
</script>

<style scoped>
    @media only screen and (min-width: 960px) {
        .v-card__title {
            font-size: 110%;
        }
    }

    @media only screen and (min-width: 1264px) {
        .v-card__title {
            font-size: 125%;
        }
    }
</style>