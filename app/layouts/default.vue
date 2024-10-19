<script setup lang="ts">
import type { FooterLink, HeaderLink } from '#ui-pro/types'

useHead({
  titleTemplate: title => title ? `${title} - JSON Utilities` : 'JSON Utilities',
})

const { preferredTheme, availableThemes } = await useShikiTheme()

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

const links: (HeaderLink)[] = [
  ...jsonRoutes.map(route => ({
    label: route.meta.title as string,
    to: route.path,
  })),
  {
    label: 'Github',
    to: 'https://github.com/kmilogp8496/json',
    target: '_blank',
  },
  {
    label: 'Issue',
    to: 'https://github.com/kmilogp8496/json/issues',
    target: '_blank',
  },
]
</script>

<template>
  <div>
    <UHeader
      :links
      title="JSON Utilities"
    >
      <template #right>
        <ClientOnly>
          <USelectMenu
            v-model="preferredTheme"
            :options="availableThemes"
            option-attribute="label"
            value-attribute="value"
            class="w-40"
            size="xs"
          />
        </ClientOnly>
        <UColorModeToggle />
      </template>
    </UHeader>
    <UMain>
      <UContainer
        :ui="{ constrained: 'max-w-[1900px]' }"
        class="p-4"
      >
        <NuxtPage />
      </UContainer>
    </UMain>
    <UFooter :links="footerLinks" />
    <UNotifications />
  </div>
</template>
