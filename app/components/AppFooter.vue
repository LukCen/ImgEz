<script setup>
const iconList = ref([
  { name: '/icons/figma.svg', desc: 'Figma' },
  { name: '/icons/nuxt.svg', desc: 'Nuxt.js' },
  { name: '/icons/tailwindcss.svg', desc: 'Tailwind CSS' },
  { name: "/icons/typescript.svg", desc: 'TypeScript' }
])
</script>

<template>
  <footer class="relative bottom-full bg-dark backdrop-opacity-20 flex flex-col items-center gap-2 py-2">
    <h6 class="text-secondary font-bold text-xl">Built with love by <a class="text-primary underline"
        href="https://lcena.me">Łukasz
        Cena</a>.</h6>
    <ul class="flex gap-10 justify-center min-h-fit">
      <li v-for="i in iconList" class="flex flex-col items-center justify-center">
        <img :src="i.name" alt="" width="30" height="30">
        <span class="text-sm">{{ i.desc }}</span>
      </li>
    </ul>
    <small class="text-primary-300">Icons from <a class="underline" href="https://icon8.com">Icon8</a></small>
  </footer>
</template>
