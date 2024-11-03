<script setup lang="ts">
const links = useLinksContext()

const loginContext = useLoginContext()

defineProps<{
  containerClass?: string
}>()
</script>

<template>
  <UHeader
    :ui="{ container: containerClass }"
    :links="links"
    title="JSON Utilities"
  >
    <template #logo>
      <NuxtImg
        src="/logo.svg"
        alt="JSON Utilities"
        width="26"
        height="26"
      />
      Utilities
    </template>
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
      <LoginButton v-model:open="loginContext.isLoginOpen.value" />
    </template>
  </UHeader>
</template>
