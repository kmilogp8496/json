<script setup lang="ts">
const emit = defineEmits<{ click: [Event] }>()
</script>

<template>
  <UButton
    color="red"
    icon="i-heroicons-trash"
    variant="soft"
    @click="(event) => emit('click', event)"
  />
</template>
