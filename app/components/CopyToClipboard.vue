<script setup lang="ts">
import type { ButtonColor } from '#ui/types'

const { content } = defineProps<{
  content: string
  label?: string
  color?: ButtonColor
}>()

const clipboard = useClipboard()
const toast = useToast()

async function onCopy() {
  await clipboard.copy(content)
  toast.add({
    title: 'Copied',
    description: 'Content copied to clipboard',
  })
}
</script>

<template>
  <UButton
    :color
    icon="i-heroicons-clipboard-document"
    :label
    @click="onCopy"
  />
</template>
