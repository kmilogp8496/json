<script setup lang="ts">
import type { FooterLink, HeaderLink } from '#ui-pro/types'

useHead({
  titleTemplate: title => title ? `${title} - JSON Utilities` : 'JSON Utilities',
})

const route = useRoute()

useSeoMeta({
  description: route.meta.description as string || 'The ultimate JSON toolkit',
  ogTitle: route.meta.title as string || 'JSON Utilities',
  ogDescription: route.meta.description as string || 'The ultimate JSON toolkit',
  ogImage: '/og.svg',
  ogUrl: 'https://json.kmilo.dev',
  twitterTitle: route.meta.title as string || 'JSON Utilities',
  twitterDescription: route.meta.description as string || 'The ultimate JSON toolkit',
  twitterImage: '/og.svg',
  twitterCard: 'summary_large_image',
})

// defineOgImageComponent('OgImage', {
//   title: 'The ultimate JSON toolkit',
//   description: 'Format, escape, generate, and more with JSON Utilities',
//   theme: '#047857',
//   colorMode: 'dark',
//   siteLogo: '/logo.svg',
//   headline: 'JSON Utilities',
//   siteName: 'JSON Utilities',
// })

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})

const isLoginOpen = ref(false)

const router = useRouter()

const routes = router.getRoutes()

const jsonRoutes = routes.filter(route => route.path.startsWith('/json'))

const links: HeaderLink[] = jsonRoutes.map(route => ({
  label: route.meta.title as string,
  icon: route.meta.icon as string,
  to: route.path,
  description: route.meta.description as string,
}))

provide('linksContext', links)

provide('loginContext', {
  openLogin: () => {
    isLoginOpen.value = true
  },
  closeLogin: () => {
    isLoginOpen.value = false
  },
  isLoginOpen,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UModals />
</template>
