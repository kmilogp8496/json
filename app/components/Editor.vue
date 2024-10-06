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

// Create the highlighter, it can be reused
const highlighter = await createHighlighter({
  themes: [
    'vitesse-dark',
    'vitesse-light',
  ],
  langs: [
    'json',
  ],
})

monaco.languages.register({ id: 'json' })

shikiToMonaco(highlighter, monaco)

const container = useTemplateRef('container')

const { theme } = useShikiTheme()

onMounted(() => {
  editor.value = monaco.editor.create(container.value!, {
    value: modelValue,
    language: lang,
    theme: theme.value,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  })

  editor.value.onDidChangeModelContent(() => {
    emit('update:modelValue', editor.value!.getValue())
  })
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
    class="max-h-[700px] h-[700px]"
  />
</template>
