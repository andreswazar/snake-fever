<template>
    <div :id="containerId" v-if="downloaded"/>
    <div class="placeholder text-center" v-else>
        <v-progress-circular class="pt-5 loading" :size="80" :width="7" color="gray" indeterminate></v-progress-circular>
    </div>    
</template>

<script>
export default {
    name: "Game",
    data() {
        return {
            downloaded: false,
            containerId: "game-container"
        }
    },
    async mounted() {
        const game = await import("./../game/game.js");
        this.downloaded = true;
        this.$nextTick(() => {
            // Needed to have a reference to the game that can be used in socket handlers
            this.$store.state.game = game.launch(this.containerId);
        });
    },
}
</script>

<style scoped>
    .loading {
        position: absolute;
        top: 20%;
        left: 47%;
    }

    @media only screen and (max-width: 960px) {
        .placeholder {
            width: 640px;
            height: 640px;
        }
    }
</style>