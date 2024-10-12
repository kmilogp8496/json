<script setup lang="ts">
import type { ButtonColor } from '#ui/types'

const { label, color } = defineProps<{
  label?: string
  color?: ButtonColor
}>()

const emit = defineEmits(['delete-content'])
</script>

<template>
  <UButton
    :color="color"
    icon="i-heroicons-trash"
    variant="soft"
    :label="label"
    @click="emit('delete-content', '')"
  />
</template>
