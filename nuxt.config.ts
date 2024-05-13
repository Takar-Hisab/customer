// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
        baseUrl: process.env.API_URL,
        appUrl: process.env.APP_URL
    },
  },
    app:{
        head:{
            title:"Takar-Hisab | Tushar Imran | Creativetechpark",
        }
    },
})
