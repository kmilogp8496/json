// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    // 'nuxt-og-image',
  ],
  runtimeConfig: {
    public: {
      siteName: 'JSON Utilities',
      siteDescription: 'The ultimate JSON toolkit',
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    clientFallback: true,
  },
  compatibilityDate: '2024-04-03',
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  hub: {
    database: true,
    blob: true,
  },
  typescript: {
    typeCheck: true,
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
