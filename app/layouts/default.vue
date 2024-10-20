<script setup lang="ts">
import type { FooterLink, HeaderLink } from '#ui-pro/types'

useHead({
  titleTemplate: title => title ? `${title} - JSON Utilities` : 'JSON Utilities',
})

const router = useRouter()

const routes = router.getRoutes()

const jsonRoutes = routes.filter(route => route.path.startsWith('/json'))

const footerLinks: FooterLink[] = [
  {
    label: 'Github',
    to: 'https://github.com/kmilogp8496/json',
    target: '_blank',
  },
  {
    label: 'Found an issue?',
    to: 'https://github.com/kmilogp8496/json/issues',
    target: '_blank',
  },
]

const links: (HeaderLink)[] = jsonRoutes.map(route => ({
  label: route.meta.title as string,
  to: route.path,
}))
</script>

<template>
  <div>
    <UHeader
      :links
      title="JSON Utilities"
    >
      <template #right>
        <UColorModeButton
          color="white"
          variant="solid"
        />
        <UButton
          icon="i-simple-icons-github"
          color="white"
          variant="solid"
          to="https://github.com/kmilogp8496/json"
          target="_blank"
        />
        <LoginButton />
      </template>
    </UHeader>
    <UMain class="flex flex-col">
      <UContainer
        :ui="{ constrained: 'max-w-[1900px] w-full' }"
        class="p-4"
      >
        <NuxtPage />
      </UContainer>
      <UFooter
        :links="footerLinks"
        class="mt-auto"
      />
    </UMain>
    <UNotifications />
    <UModals />
  </div>
</template>
