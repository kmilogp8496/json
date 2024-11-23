<script setup lang="ts">
const { lang = 'json' } = defineProps<{
  lang?: string
}>()

const original = ref<string>('')

const modified = ref<string>('')
</script>

<template>
  <div class="relative min-h-[600px]">
    <EditorToolbar
      :content="original"
      :content-diff="modified"
      @clear="original = ''"
      @load="original = $event"
    />
    <ClientOnly>
      <LazyBaseDiffEditor
        :lang
        @update:original="original = $event"
        @update:modified="modified = $event"
      />
    </ClientOnly>
  </div>
</template>
