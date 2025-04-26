import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./assets/index.css";

export async function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  return { app };
}
