<template>
  <v-app>
    <Navbar />
    <v-main>
        <v-container>
            <v-row>
                <v-col order="2" cols="12" md="3" class="order-md-1">
                    <HowToPlay />
                </v-col>

                <v-col order="1" cols="12" md="6" class="order-md-2">
                    <div id="Game" class="text-center">
                        <Game />
                    </div>  
                </v-col>

                <v-col order="3" cols="12" md="3" class="order-md-3">
                    <CurrentScore />
                    <Scores />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import HowToPlay from "./components/HowToPlay.vue";
import Scores from "./components/Scores.vue";
import CurrentScore from "./components/CurrentScore.vue";
import Game from "./components/Game.vue";

export default {
  name: 'App',

  components: {
      Navbar,
      HowToPlay,
      Game,
      Scores,
      CurrentScore
  },

  data: () => ({
    //
  }),
};
</script>

<style>
    canvas {
        border: solid 2px gray;
    }

    @media only screen and (min-width: 960px) {
        canvas {
            border: solid 2px gray;
            height: 445px;
        }
    }
</style>