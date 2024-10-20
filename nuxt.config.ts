// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  experimental: {
    clientFallback: true,
  },
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
  ],
  future: {
    compatibilityVersion: 4,
  },
  hub: {
    database: true,
    blob: true,
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        blockSpacing: false,
      },
    },
  },
})
