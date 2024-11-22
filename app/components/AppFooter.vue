<script setup lang="ts">
import type { FooterLink } from '@nuxt/ui-pro/types'

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
</script>

<template>
  <UFooter
    :links="footerLinks"
  />
</template>
