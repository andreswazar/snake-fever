<template>
    <v-footer dark padless>
        <v-card flat tile class="grey lighten-3 white--text text-center" width=100%>
            <v-card-text class="grey--text pt-0">
                <p>Background music from PlayOnLoop.com - Licensed under Creative Commons by Attribution 4.0</p>
                <p id="second-paragraph">Sound effects and font from kenney.nl</p>
            </v-card-text>

            <v-card-text id="company" class="grey--text">
                {{ new Date().getFullYear() }} — <strong>WazarTech</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    @media only screen and (min-width: 960px) and (max-width: 1300px) {
        #second-paragraph {
            margin-top: -10px;
        }

        #company {
            margin-top: -30px;
        }
    }
</style>