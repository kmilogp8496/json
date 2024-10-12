<script setup lang="ts">
import type { FooterLink, HeaderLink } from '#ui-pro/types'

useHead({
  titleTemplate: title => title ? `${title} - JSON Utilities` : 'JSON Utilities',
})

const { preferredTheme, availableThemes } = useShikiTheme()

const router = useRouter()

const routes = router.getRoutes()

const jsonRoutes = routes.filter(route => route.path.startsWith('/json'))

const links: (HeaderLink)[] = jsonRoutes.map(route => ({
  label: route.meta.title as string,
  to: route.path,
}))

const footerLinks: FooterLink[] = [
  {
    label: 'Github',
    to: 'https://github.com/kmilogp8496/json',
    target: '_blank',
  },
  {
    label: 'Report an issue',
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
          <UColorModeSelect />
          <USelectMenu
            v-model="preferredTheme"
            :options="availableThemes"
            option-attribute="label"
            value-attribute="value"
            class="w-40"
          />
        </ClientOnly>
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
