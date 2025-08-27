<script setup lang="ts">
useHead(useAppConfig())
</script>
<template>
  <div class="flex flex-col min-h-screen bg-dark">
    <AppNavbar />
    <main class="min-h-full flex-1 p-4">
      <NuxtApp>
        <NuxtPage />
      </NuxtApp>
    </main>
    <AppFooter />
  </div>
</template>
