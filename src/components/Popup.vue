<template>
    <div class="text-center">
        <v-dialog width="500">
            <template v-slot:activator="{ on }">
                <v-btn text color="grey" dark v-on="on">
                    Change Username
                    <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline" primary-title>
                    Enter your username
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3">
                        <v-text-field label="Username" v-model="username" prepend-icon="mdi-account"></v-text-field>
                        <div class="text-center">
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
            username: ""
        }
    }
}
</script>