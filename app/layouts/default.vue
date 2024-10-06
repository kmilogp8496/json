<script setup lang="ts">
import type { FooterLink, HeaderLink } from '#ui-pro/types'

useHead({
  titleTemplate: title => title ? `${title} - JSON Utilities` : 'JSON Utilities',
})

const links: (HeaderLink & {icon: string})[] = [
  {
    label: 'JSON Generate',
    icon: 'i-carbon-schematics',
    to: '/generate',
  },
  {
    label: 'JSON Minify',
    icon: 'i-carbon-shrink-screen',
    to: '/minify',
  },
  {
    label: 'JSON Format',
    icon: 'i-heroicons-paint-brush-solid',
    to: '/format',
  },
  {
    label: 'JSON Escape',
    icon: 'i-carbon-text-clear-format',
    to: '/escape',
  },
] as const

const footerLinks: FooterLink[] = [
  {
    label: 'Github',
    to: 'https://github.com/kmilogp8496/json',
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
