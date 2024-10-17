<script setup lang="ts">
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'shiki'
import { useShikiTheme } from '~/composables/useShikiTheme'

const { lang = 'json' } = defineProps<{
  lang?: string
}>()

const firstModel = defineModel<string>('firstMode', {
  default: '',
})

const secondModel = defineModel<string>('secondModel', {
  default: '',
})

const editor = shallowRef<monaco.editor.IStandaloneDiffEditor | null>(null)

const { preferredTheme, availableThemes } = await useShikiTheme()

// Create the highlighter, it can be reused
const highlighter = await createHighlighter({
  themes: availableThemes.map(theme => theme.value),
  langs: [
    'json',
  ],
})

const container = useTemplateRef('container')

onMounted(() => {
  if (import.meta.client) {
    monaco.languages.register({ id: 'json' })
    shikiToMonaco(highlighter, monaco)

    editor.value = monaco.editor.createDiffEditor(container.value!, {
      theme: preferredTheme.value,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      enableSplitViewResizing: false,
      renderSideBySide: true,
      wordWrapColumn: 90,
      wordWrap: 'wordWrapColumn',
      wrappingIndent: 'same',
    })
  }
})

watch(preferredTheme, () => {
  if (editor.value) {
    monaco.editor.setTheme(preferredTheme.value)
  }
})

watchEffect(() => {
  if (!editor.value) {
    return
  }

  editor.value.setModel({
    original: monaco.editor.createModel(firstModel.value, lang),
    modified: monaco.editor.createModel(secondModel.value, lang),
  })
})
</script>

<template>
  <div
    ref="container"
    class="max-h-[600px] h-[600px]"
  />
</template>
