<template>
    <div class="alert">
        <v-alert v-model="alertIsVisible" transition="fade-transition" v-bind:type="alertType">
            {{ alertMessage }}
        </v-alert>
    </div>
</template>

<script>
export default {
    computed: {
        alertIsVisible() {
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
        showAlert(alertMessage, alertType) {
            this.$store.state.alertMessage = alertMessage;
            this.$store.state.alertType = alertType;
            this.$store.state.showAlert = true;
        },
        hideAlert() {
            window.setTimeout(() => {
                this.$store.state.showAlert = false;
            }, 3000);
        }
    },
    mounted() {
        this.$store.state.showAlertFunction = this.showAlert;
        this.$store.state.hideAlertFunction = this.hideAlert;
    }
}
</script>

<style scoped>
    .alert {
        z-index: 100;
        position: absolute;
        top: -30px;
        left: 10px;
    }
</style>