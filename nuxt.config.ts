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
    '@nuxt/test-utils/module',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-link-checker',
    'nuxt-seo-utils',
  ],
  runtimeConfig: {
    public: {
      siteName: 'JSON Utilities',
      siteDescription: 'The ultimate JSON toolkit',
    },
  },
  routeRules: {
    '/api/**': {
      cors: true,
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
    prerender: {
      routes: [
        '/sitemap.xml',
        '/robots.txt',
      ],
    },
  },
  hub: {
    database: true,
    blob: true,
  },
  typescript: {
    typeCheck: process.env.NODE_ENV !== 'development',
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        blockSpacing: false,
      },
    },
  },
  image: {
    cloudflare: {
      baseURL: 'https://json.kmilo.dev',
    },
  },
})
