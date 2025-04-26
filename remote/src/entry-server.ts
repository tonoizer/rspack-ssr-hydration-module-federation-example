import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render() {
  try {
    const { app } = await createApp();
    const appHtml = await renderToString(app);

    return {
      appHtml,
    };
  } catch (error) {
    console.error("SSR Render Fehler:", error);
    throw error;
  }
}
