<script setup lang="ts">
defineProps<{
  content: string
  pathPrefix?: string
}>()

const emit = defineEmits<{
  clear: [Event]
  load: [string]
}>()
</script>

<template>
  <UButtonGroup
    size="sm"
    orientation="vertical"
    class="absolute top-0 left-0 z-10"
  >
    <ToolbarCopyToClipboard :content />
    <ToolbarSaveContent
      :path-prefix
      :content
    />
    <ToolbarLoadContent
      :path-prefix
      :content
      @load="emit('load', $event)"
    />
    <ToolbarDeleteContent @click="emit('clear', $event)" />
  </UButtonGroup>
</template>
