<script setup lang="ts">
defineProps<{
  content: string
  pathPrefix?: string
}>()

const emit = defineEmits<{ clear: [Event] }>()
</script>

<template>
  <UButtonGroup
    size="sm"
    orientation="vertical"
    class="absolute top-0 left-0 z-10"
  >
    <ToolbarCopyToClipboard :content />
    <ToolbarSaveContent :path-prefix />
    <ToolbarDeleteContent @click="emit('clear', $event)" />
  </UButtonGroup>
</template>
