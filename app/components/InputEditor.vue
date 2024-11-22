<script setup lang="ts">
const { lang = 'json' } = defineProps<{
  lang?: string
  pathPrefix?: string
}>()

const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <div
    class="relative min-h-[600px]"
    data-testid="input-editor"
  >
    <EditorToolbar
      :content="model"
      :path-prefix
      class="absolute top-0 left-0 z-10"
      @clear="model = ''"
      @load="model = $event"
    />
    <ClientOnly>
      <LazyBaseEditor
        v-model="model"
        :lang
      />
    </ClientOnly>
  </div>
</template>
