<template>
  <v-card class="my-2">
    <v-card-title>{{ props.title }}</v-card-title>
    <v-card-text>
      <audio ref="audio" :src="audioFile" controls></audio>

      <div class="time-section">
        <div class="time-label">Start Time:</div>
        <div class="time-display clickable" @click="editStartTime = true">
          <span v-if="!editStartTime">{{ startTimeFormatted }}</span>
          <div v-else class="time-select" @click.stop>
            <v-select
              v-model="startMinutes"
              :items="minutesOptions"
              label="Minutes"
              @change="updateStartTime"
            ></v-select>
            <v-select
              v-model="startSeconds"
              :items="secondsOptions"
              label="Seconds"
              @change="updateStartTime"
            ></v-select>
            <v-icon @click="confirmStartTime" class="confirm-icon"
              >mdi-check</v-icon
            >
          </div>
        </div>
      </div>

      <div class="time-section">
        <div class="time-label">End Time:</div>
        <div class="time-display clickable" @click="editEndTime = true">
          <span v-if="!editEndTime">{{ endTimeFormatted }}</span>
          <div v-else class="time-select" @click.stop>
            <v-select
              v-model="endMinutes"
              :items="minutesOptions"
              label="Minutes"
              @change="updateEndTime"
            ></v-select>
            <v-select
              v-model="endSeconds"
              :items="secondsOptions"
              label="Seconds"
              @change="updateEndTime"
            ></v-select>
            <v-icon @click="confirmEndTime" class="confirm-icon"
              >mdi-check</v-icon
            >
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import audioFile from "@/assets/jax.mp3";

const props = defineProps({
  initialStartTime: {
    type: Number,
    default: 0,
  },
  initialEndTime: {
    type: Number,
    default: 30,
  },
  title: {
    type: String,
    default: "Audio Player",
  },
});

const startTime = ref(props.initialStartTime);
const endTime = ref(props.initialEndTime);
const progress = ref(0);
const audio = ref<HTMLAudioElement | null>(null);

const editStartTime = ref(false);
const editEndTime = ref(false);

// Generate options for minutes and seconds
const minutesOptions = Array.from({ length: 60 }, (_, i) => i);
const secondsOptions = Array.from({ length: 60 }, (_, i) => i);

// Derive initial minutes and seconds from start and end times
const startMinutes = ref(Math.floor(startTime.value / 60));
const startSeconds = ref(startTime.value % 60);
const endMinutes = ref(Math.floor(endTime.value / 60));
const endSeconds = ref(endTime.value % 60);

const startTimeFormatted = ref(formatTime(startTime.value));
const endTimeFormatted = ref(formatTime(endTime.value));

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function parseTime(timeString: string): number {
  const [minutes, seconds] = timeString.split(":").map(Number);
  return minutes * 60 + seconds;
}

const updateStartTime = () => {
  startTime.value = startMinutes.value * 60 + startSeconds.value;
  startTimeFormatted.value = formatTime(startTime.value);
  console.log("Updating start time:", startTime.value);
};

const updateEndTime = () => {
  endTime.value = endMinutes.value * 60 + endSeconds.value;
  endTimeFormatted.value = formatTime(endTime.value);
  console.log("Updating end time:", endTime.value);
};

const confirmStartTime = () => {
  updateStartTime();
  editStartTime.value = false;
};

const confirmEndTime = () => {
  updateEndTime();
  editEndTime.value = false;
};

const onPlay = () => {
  if (audio.value) {
    audio.value.currentTime = startTime.value;
  }
};

const onPause = () => {
  if (audio.value && audio.value.currentTime >= endTime.value) {
    audio.value.currentTime = startTime.value;
    progress.value = 0;
  }
};

const onTimeUpdate = () => {
  if (audio.value) {
    if (audio.value.currentTime >= endTime.value) {
      audio.value.pause();
      audio.value.currentTime = startTime.value;
    }
    progress.value =
      ((audio.value.currentTime - startTime.value) /
        (endTime.value - startTime.value)) *
      100;
  }
};

watch([startTime, endTime], ([newStartTime, newEndTime]) => {
  console.log("watch triggered", newStartTime, newEndTime);
  if (audio.value && audio.value.currentTime >= endTime.value) {
    audio.value.currentTime = startTime.value;
    progress.value = 0;
  }
  startTimeFormatted.value = formatTime(startTime.value);
  endTimeFormatted.value = formatTime(endTime.value);
});

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
.time-section {
  margin-bottom: 10px;
}
.time-label {
  font-weight: bold;
}
.time-display {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}
.time-display:hover {
  background-color: #f0f0f043;
}
.time-select {
  display: flex;
  gap: 10px;
  align-items: center;
}
.confirm-icon {
  cursor: pointer;
  margin-left: 10px;
}
</style>
