<template>
  <div class="content">
    <h1>rspack_ssr_hydration_host_vue</h1>
    App Compponent: From Shell:
    <button @click="increment">Click me</button>
    <p>Counter: {{ counter }}</p>

    <RemoteAAppComponent />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RemoteAAppComponent from "./components/RemoteAAppComponent.vue";

const counter = ref(0);
const increment = () => {
  counter.value++;
  console.log("Counter Shell:", counter.value);
};
</script>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
