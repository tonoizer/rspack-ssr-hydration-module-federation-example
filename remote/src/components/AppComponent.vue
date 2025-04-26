<script setup lang="ts">
import { onMounted } from "vue";
import { createApp } from "../main";

onMounted(async () => {
  const { app } = await createApp();
  app.mount("#remote-app-container");
});
</script>

<template>
  <div id="remote-app-container"></div>
</template>
