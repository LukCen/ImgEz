import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  css: ["~/assets/css/main.css"],
  ui: {
    prefix: 'Nuxt',
    fonts: true
  }
})
