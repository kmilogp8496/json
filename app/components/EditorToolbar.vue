<script setup lang="ts">
defineProps<{
  content: string
}>()

const emit = defineEmits<{ clear: [Event] }>()
</script>

<template>
  <UButtonGroup
    size="sm"
    orientation="vertical"
    class="absolute top-0 left-0 z-10"
  >
    <CopyToClipboard :content />
    <DeleteContent @click="emit('clear', $event)" />
  </UButtonGroup>
</template>
