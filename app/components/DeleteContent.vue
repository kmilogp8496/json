<script setup lang="ts">
import type { ButtonColor } from '#ui/types'

const { label, color } = defineProps<{
  label?: string
  color?: ButtonColor
}>()

const emit = defineEmits<{ click: [Event] }>()
</script>

<template>
  <UButton
    :color
    icon="i-heroicons-trash"
    variant="soft"
    :label
    @click="(event) => emit('click', event)"
  />
</template>
