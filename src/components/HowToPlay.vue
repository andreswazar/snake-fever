<template>
    <v-card elevation="1">
        <v-card-title>
            How to Play
        </v-card-title>
        <v-card-text>
            <p>Prevent the snake from going out of the screen or crashing against its own body!</p>

            <p>Press the arrow keys to move the head of the snake.</p> 

            <p>Green apples will increase your score and increase your size.</p>
            
            <p>Red apples will decrease your size.</p>

            <p>Gray obstacles must be dodged!</p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .v-card {
        height: 265px;
    }

    @media only screen and (min-width: 960px) {
        .v-card {
            height: 415px;
        }

        .v-card__text {
            font-size: 80%;
            margin-top: -7px;
        }
    }

    @media only screen and (min-width: 1264px) {
        .v-card__text {
            font-size: 90%;
        }
    }
</style>