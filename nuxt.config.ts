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
  },
  runtimeConfig: {
    blobToken: process.env.NUXT_BLOB_READ_WRITE_TOKEN,
    public: {
      apiBase: '/server/api',
      blobToken: process.env.NUXT_BLOB_READ_WRITE_TOKEN
    }
  }
})
