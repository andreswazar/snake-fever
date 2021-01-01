<template>
    <nav>
        <v-app-bar dense flat class="mb-5">
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Snake</span>
                <span class="font-weight-bold">Fever</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <Popup />
        </v-app-bar>
    </nav>
</template>

<script>
import Popup from "./Popup.vue"

export default {
    components: { Popup },
}
</script>