<script setup lang="ts">
import navLogo from "/assets/imgez_logo.webp"
</script>
<template>
  <nav class="flex justify-around items-center">
    <img :src="navLogo" alt="">
    <span class="text-3xl">EzImage - upload with no hassle!</span>
  </nav>
</template>
<style scoped>
nav {
  font-family: 'Joti One', sans-serif;
}
</style>
