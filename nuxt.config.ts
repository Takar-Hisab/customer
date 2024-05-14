// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    public: {
        baseUrl: process.env.API_URL,
        appUrl: process.env.APP_URL
    },
  },
    app:{
        head:{
            title:"Customer Panel | Takar-Hisab | Tushar Imran | Creativetechpark",
        }
    },
})
