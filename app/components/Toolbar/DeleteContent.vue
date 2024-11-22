<script setup lang="ts">
const emit = defineEmits<{ click: [Event] }>()
</script>

<template>
  <UTooltip text="Delete content">
    <UButton
      color="red"
      icon="i-heroicons-trash"
      variant="soft"
      @click="(event) => emit('click', event)"
    />
  </UTooltip>
</template>
