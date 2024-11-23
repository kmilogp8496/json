<script setup lang="ts">
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'shiki'
import { useShikiTheme } from '~/composables/useShikiTheme'

const { lang = 'json' } = defineProps<{
  lang?: string
}>()

const emit = defineEmits<{
  'update:original': [string]
  'update:modified': [string]
}>()

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
      enableSplitViewResizing: true,
      renderSideBySide: true,
      wordWrapColumn: 90,
      wordWrap: 'wordWrapColumn',
      wrappingIndent: 'same',
      originalEditable: true,
    })

    editor.value.getOriginalEditor().onDidChangeModelContent(() => {
      console.log(editor.value!.getOriginalEditor().getValue())

      emit('update:original', editor.value!.getOriginalEditor().getValue())
    })

    editor.value.getModifiedEditor().onDidChangeModelContent(() => {
      emit('update:modified', editor.value!.getModifiedEditor().getValue())
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
    original: monaco.editor.createModel('', lang),
    modified: monaco.editor.createModel('', lang),
  })
})
</script>

<template>
  <div
    ref="container"
    class="max-h-[600px] h-[600px]"
  />
</template>
