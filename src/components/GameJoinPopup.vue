<template>
    <div class="text-center">
        <v-dialog persistent v-model="popupIsVisible" width="500">
            <v-card>
                <v-card-title class="headline" primary-title>
                    Enter game code
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3" ref="form" onSubmit="return false;">
                        <v-text-field label="Game code" v-model="gameCode" prepend-icon="mdi-identifier" :rules="gameCodeRules"></v-text-field>
                        <div class="text-center">
                            <v-btn text class="error mr-5" @click="hideGameCodePopupFunction">Cancel</v-btn>
                            <v-btn text class="primary" @click="submit">Confirm</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { emitJoinGame } from "./../game/utility/socket/Socket.js";

export default {
    data() {
        return {
            gameCode: "",
            gameCodeRules: [
                (value) => value.length == 5 || "Game code must be 5 digits long",
                (value) => {
                    const pattern = /^[A-Z]+$/i;
                    return pattern.test(value) || "Game code must only contain uppercase letters"
                }
            ]
        }
    },
    computed: {
        popupIsVisible() {
            return this.$store.state.showGameCodePopup;
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                emitJoinGame(this.gameCode);
                this.hideGameCodePopupFunction();
            }
        },
        showGameCodePopupFunction() {
            this.$store.state.showGameCodePopup = true;
            this.$store.state.setGameUnplayable();
        },
        hideGameCodePopupFunction() {
            this.$store.state.showGameCodePopup = false;
            this.$store.state.setGamePlayable();
        }
    },
    mounted() {
        this.$store.state.showGameCodePopupFunction = this.showGameCodePopupFunction;
        this.$store.state.hideGameCodePopupFunction = this.hideGameCodePopupFunction;
    }
}
</script>