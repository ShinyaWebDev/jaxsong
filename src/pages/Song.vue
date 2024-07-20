<template>
  <v-container class="song" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h2 class="headline">Time Stamp</h2>
        <!-- <v-btn class="my-4" color="primary" @click="showDialog = true"
          >Upload Song</v-btn
        > -->
      </v-col>
    </v-row>

    <!-- Second Song -->
    <v-row justify="center" align="center" class="song-section">
      <v-col cols="12" class="text-center">
        <h2>2nd Song</h2>
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Everyone 4 x 8"
          :initialStartTime="171"
          :initialEndTime="194"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Shinya solo 4 x 8"
          :initialStartTime="194"
          :initialEndTime="211"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Yuya solo 4 x 8?"
          :initialStartTime="212"
          :initialEndTime="231"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Shinys block 2 x 8"
          :initialStartTime="267"
          :initialEndTime="277"
        />
      </v-col>
    </v-row>

    <!-- Third Song -->
    <v-row justify="center" align="center" class="song-section">
      <v-col cols="12" class="text-center">
        <h2>3rd Song</h2>
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Everyone 2 x 8"
          :initialStartTime="314"
          :initialEndTime="321"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Individual 2 x 8"
          :initialStartTime="321"
          :initialEndTime="328"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Shingo Dog 2 x 8"
          :initialStartTime="328"
          :initialEndTime="336"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Gumma(2) 2 x 8"
          :initialStartTime="336"
          :initialEndTime="343"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AudioPlayer
          title="Shingo solo 4 x 8"
          :initialStartTime="342"
          :initialEndTime="358"
        />
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-text class="mt-2">ごめんよ、ちょっと待ってね😘</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showDialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import AudioPlayer from "@/components/AudioPlayer.vue";

const showDialog = ref(false);
const progress = ref(0);
const audio = ref<HTMLAudioElement | null>(null);

const startTime = 40; // start time in seconds
const endTime = 60; // end time in seconds

const onPlay = () => {
  console.log("onPlay");
  if (audio.value) {
    audio.value.currentTime = startTime;
  }
};

const onPause = () => {
  console.log("onPause");
  if (audio.value && audio.value.currentTime >= endTime) {
    audio.value.currentTime = startTime;
    progress.value = 0;
  }
};

const onTimeUpdate = () => {
  if (audio.value) {
    console.log("onTimeUpdate", audio.value.currentTime);
    if (audio.value.currentTime >= endTime) {
      audio.value.pause();
      audio.value.currentTime = startTime;
    }
    progress.value =
      ((audio.value.currentTime - startTime) / (endTime - startTime)) * 100;
  }
};

onMounted(() => {
  if (audio.value) {
    console.log("onMounted audio", audio.value);
    audio.value.addEventListener("play", onPlay);
    audio.value.addEventListener("pause", onPause);
    audio.value.addEventListener("timeupdate", onTimeUpdate);
  }
});

onBeforeUnmount(() => {
  if (audio.value) {
    audio.value.removeEventListener("play", onPlay);
    audio.value.removeEventListener("pause", onPause);
    audio.value.removeEventListener("timeupdate", onTimeUpdate);
  }
});
</script>

<style scoped>
.song {
  text-align: center;
  margin-top: 10vh;
}
.v-responsive {
  margin: 20px 0;
}
.song-section {
  margin-bottom: 30px;
}
</style>
