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