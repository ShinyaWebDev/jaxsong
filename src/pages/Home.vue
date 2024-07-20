<template>
  <v-container class="home">
    <v-row justify="center" align="center">
      <v-col class="text-center">
        <h1 class="display-1 font-weight-bold mb-4 funky-animation">JAX</h1>
        <div class="parent">
          <img src="@/assets/jax.jpg" alt="Dance Group" />
        </div>
        <!-- <v-btn color="primary" @click="animate">Let's Dance!</v-btn> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const animate = () => {
  // Add your animation logic here
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 15vh;
}

body {
  min-height: 100vh;
  background: #222;
  display: grid;
  place-items: center;
}

@property --w {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 32%;
}

@property --p1 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 70%;
}

@property --p2 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 32%;
}

@property --p3 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 32%;
}

@property --p4 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 70%;
}

.parent {
  position: relative;
  width: 400px;
  height: 400px;
  box-shadow: 0px 0px 0px 20px #222, 0px 0px 20px 40px rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  overflow: hidden;
}

img {
  --p1: 70%;
  --p2: 32%;
  --p3: 32%;
  --p4: 70%;
  --w: 25%;
  width: 400px;
  border-radius: 50%;
  aspect-ratio: 1;
  mask: radial-gradient(
      300px at var(--p1) var(--p2),
      black var(--w),
      transparent var(--w) 100%
    ),
    radial-gradient(
      300px at var(--p3) var(--p4),
      black var(--w),
      transparent var(--w) 100%
    );
  -webkit-mask: radial-gradient(
      300px at var(--p1) var(--p2),
      black var(--w),
      transparent var(--w) 100%
    ),
    radial-gradient(
      300px at var(--p3) var(--p4),
      black var(--w),
      transparent var(--w) 100%
    );
  cursor: pointer;
  transition: transform 0.5s ease;
}

img:not(:hover) {
  animation: out 0.3s linear both;
}

img:hover {
  transform: scale(1.1);
  animation: move 1.5s ease both, big 1s 0.9s ease forwards;
}

@keyframes big {
  from {
    --w: 25%;
  }
  to {
    --w: 100%;
  }
}

@keyframes out {
  from {
    --w: 100%;
  }
  to {
    --w: 25%;
  }
}

@keyframes move {
  0%,
  100% {
    --p1: 70%;
    --p2: 32%;
    --p3: 32%;
    --p4: 70%;
  }
  35% {
    --p1: 32%;
    --p2: 70%;
    --p3: 70%;
    --p4: 32%;
  }
  50% {
    --p1: 70%;
    --p2: 60%;
    --p3: 32%;
    --p4: 30%;
  }
  100% {
    --p1: 50%;
    --p2: 50%;
    --p3: 50%;
    --p4: 50%;
  }
}

/* Funky animation for JAX text */
.funky-animation {
  display: inline-block;
  animation: funky 2s forwards, stay 1s 2s forwards;
}

@keyframes funky {
  0%,
  100% {
    color: #ff69b4;
    transform: scale(1) rotate(0deg);
  }
  25% {
    color: #00ff00;
    transform: scale(1.2) rotate(10deg);
  }
  50% {
    color: #1e90ff;
    transform: scale(1.5) rotate(-10deg);
  }
  75% {
    color: #ff4500;
    transform: scale(1.2) rotate(10deg);
  }
}

@keyframes stay {
  0% {
    color: inherit;
  }
  100% {
    color: darkorange;
    transform: scale(1) rotate(0deg);
  }
}
</style>
