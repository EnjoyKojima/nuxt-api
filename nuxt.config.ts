// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],

  imports: {
    dirs: ["schemas/**"],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  vite: {
    server: {
      hmr: {
        port: 5173,
        clientPort: 443,
        protocol: 'wss',
        path: 'hmr/',
      },
    },
  },

  hooks: {
    'vite:extendConfig'(viteInlineConfig, env) {
      viteInlineConfig.server = {
        ...viteInlineConfig.server,
        hmr: {
          port: 5173,
          clientPort: 443,
          protocol: 'wss',
          path: 'hmr/',
        },
      }
    },
  },

  compatibilityDate: '2024-07-17'
})