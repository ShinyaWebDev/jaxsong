<template>
  <v-footer height="auto" app>
    <v-bottom-navigation grow>
      <v-btn :to="{ name: 'Home' }" replace>
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
      </v-btn>
      <v-btn :to="{ name: 'Song' }" replace>
        <v-icon>mdi-music-note</v-icon>
        <span>Song</span>
      </v-btn>
      <v-btn :to="{ name: 'Video' }" replace>
        <v-icon>mdi-video</v-icon>
        <span>Video</span>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>

<script setup></script>

<style scoped>
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
