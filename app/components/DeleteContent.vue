<script setup lang="ts">
import type { ButtonColor } from '#ui/types'

const { color = 'red' } = defineProps<{
  color?: ButtonColor
}>()

const emit = defineEmits<{ click: [Event] }>()
</script>

<template>
  <UButton
    :color
    icon="i-heroicons-trash"
    variant="soft"
    @click="(event) => emit('click', event)"
  />
</template>
