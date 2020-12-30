<template>
  <v-app>
    <Navbar />
    <v-main>
        <v-container>
            <v-row>
                <v-col cols="3">

                </v-col>
                <v-col cols="6">
                    <div id="Game">
                        <Game />
                    </div>  
                </v-col>
                <v-col cols="3">
                    <CurrentScore />
                    <Scores />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CurrentScore from "./components/CurrentScore.vue";
import Scores from "./components/Scores.vue";
import Navbar from "./components/Navbar.vue";
import Game from "./components/Game.vue";

export default {
  name: 'App',

  components: {
      Navbar,
      Game,
      Scores,
      CurrentScore
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
    #Game {
        width: 100%;
    }
</style>