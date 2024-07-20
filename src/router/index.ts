import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Song from "@/pages/Song.vue";
import Video from "@/pages/Video.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/song", name: "Song", component: Song },
  { path: "/video", name: "Video", component: Video },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
