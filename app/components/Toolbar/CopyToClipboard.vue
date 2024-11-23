<script setup lang="ts">
import type { ButtonColor } from '#ui/types'

const { content, color = 'primary' } = defineProps<{
  content: string
  color?: ButtonColor
  tooltipText?: string
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
  <UTooltip :text="tooltipText ?? 'Copy to clipboard'">
    <UButton
      :color
      variant="soft"
      icon="i-heroicons-clipboard-document"
      @click="onCopy"
    />
  </UTooltip>
</template>
