<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
const AppComponent = defineAsyncComponent(
  () => import("rspack_ssr_hydration_remote_vue/App")
);
</script>

<template>
  <div>
    <AppComponent />
  </div>
</template>
