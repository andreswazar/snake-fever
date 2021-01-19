<template>
    <nav>
        <v-app-bar dense flat class="mb-5">
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Snake</span>
                <span class="font-weight-bold">Fever</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <UsernamePopup />
        </v-app-bar>
    </nav>
</template>

<script>
import UsernamePopup from "./UsernamePopup.vue"

export default {
    components: { UsernamePopup },
}
</script>