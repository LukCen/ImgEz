<script setup lang="ts">
import { NuxtNavigationMenu } from '#components';
import type { NavigationMenuItem } from '@nuxt/ui'
const items = ref<NavigationMenuItem[]>([
  {
    icon: 'i-lucide-book-open'
  }

])
</script>
<template>
  <NuxtNavigationMenu :items="items" class="bg-black" />
</template>
