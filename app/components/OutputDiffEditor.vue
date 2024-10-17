<script setup lang="ts">
import { LazyBaseDiffEditor } from '#build/components'

const { lang = 'json' } = defineProps<{
  lang?: string
}>()

const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <div class="relative min-h-[600px]">
    <EditorToolbar
      :content="model"
      class="absolute top-0 left-0 z-10"
      @clear="model = ''"
    />
    <ClientOnly>
      <LazyBaseDiffEditor
        v-model="model"
        :lang
      />
    </ClientOnly>
  </div>
</template>
