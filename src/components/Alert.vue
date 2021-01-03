<template>
    <div class="alert">
        <v-alert v-model="showAlert" transition="fade-transition" v-bind:type="alertType">
            {{ alertMessage }}
        </v-alert>
    </div>
</template>

<script>
export default {
    computed: {
        showAlert() {
            return this.$store.state.showAlert
        },
        alertType() {
            return this.$store.state.alertType
        },
        alertMessage() {
            return this.$store.state.alertMessage
        }
    },
    methods: {
        hideAlert() {
            window.setInterval(() => {
                this.$store.state.showAlert = false;
            }, 5000);
        }
    },
    mounted() {
        this.hideAlert();
    }
}
</script>

<style scoped>
    .alert {
        z-index: 100;
        position: absolute;
        top: -30px;
    }
</style>