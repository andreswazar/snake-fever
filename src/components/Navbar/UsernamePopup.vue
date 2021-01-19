<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn text color="grey" dark v-on="on" @click="setGameUnplayable">
                    Change Username
                    <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline" primary-title>
                    Enter your username
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3" ref="form" onSubmit="return false;">
                        <v-text-field label="Username" v-model="username" prepend-icon="mdi-account" :rules="usernameRules"></v-text-field>
                        <div class="text-center">
                            <v-btn text class="error mr-5" @click="cancel" v-if="this.$store.state.username">Cancel</v-btn>
                            <v-btn text class="primary" @click="submit">Confirm</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: true,
            username: this.$store.state.username,
            usernameRules: [
                (value) => value.length >= 3 || "Username must be between 3 and 10 characters long",
                (value) => value.length <= 10 || "Username must be between 3 and 10 characters long",
                (value) => {
                    const pattern = /^[a-z0-9]+$/i;
                    return pattern.test(value) || "Username must only contain letters or numbers"
                }
            ]
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.dialog = false;
                this.$store.state.username = this.username;

                this.setGamePlayable();
            }
        },
        cancel() {
            this.dialog = false;

            this.setGamePlayable();
        },
        setGameUnplayable() {
            this.$store.state.gameIsPlayable = false;
        },
        setGamePlayable() {
            this.$store.state.gameIsPlayable = true;
        }
    },
    mounted() {
        this.$store.state.setGamePlayable = this.setGamePlayable;
        this.$store.state.setGameUnplayable = this.setGameUnplayable;
    }
}
</script>