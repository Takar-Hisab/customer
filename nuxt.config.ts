// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt'
  ],
  runtimeConfig: {
    public: {
        baseUrl: process.env.API_URL,
        appUrl: process.env.APP_URL
    },
  },
    ui: {
        notifications: {
            position: 'top-0 bottom-auto',
            timeout:3000
        }
    },
    app:{
        head:{
            title:"Customer Panel | Takar-Hisab | Tushar Imran | Creativetechpark",
        }
    },
})
