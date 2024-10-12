<script setup lang="ts">
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'shiki'
import { useShikiTheme } from '~/composables/useShikiTheme'

const { modelValue, lang = 'json' } = defineProps<{
  modelValue: string
  lang?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null)

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

    editor.value = monaco.editor.create(container.value!, {
      value: modelValue,
      language: lang,
      theme: preferredTheme.value,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      wordWrapColumn: 90,
      wordWrap: 'wordWrapColumn',
      wrappingIndent: 'same',
    })

    editor.value.onDidChangeModelContent(() => {
      emit('update:modelValue', editor.value!.getValue())
    })
  }
})

watch(preferredTheme, () => {
  if (editor.value) {
    monaco.editor.setTheme(preferredTheme.value)
  }
})

watch(
  () => modelValue,
  (newValue) => {
    if (editor.value && editor.value.getValue() !== newValue) {
      editor.value.setValue(newValue)
    }
  },
)
</script>

<template>
  <div
    ref="container"
    class="max-h-[600px] h-[600px]"
  />
</template>
