<template>
    <v-app>
        <Navbar />  
        <v-main>
            <Alert />
            <v-container>
                <v-row>
                    <v-col order="2" cols="12" md="3" class="order-md-1">
                        <HowToPlay />
                    </v-col>

                    <v-col order="1" cols="12" md="6" class="order-md-2">
                        <div class="text-center">
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
        <Footer />
    </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Alert from "./components/Alert.vue";
import HowToPlay from "./components/HowToPlay.vue";
import Game from "./components/Game.vue";
import Scores from "./components/Scores.vue";
import CurrentScore from "./components/CurrentScore.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',

  components: {
      Navbar,
      Alert,
      HowToPlay,
      Game,
      Scores,
      CurrentScore,
      Footer
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
            /* height: 445px; */
            height: 400px;
        }
    }
</style>