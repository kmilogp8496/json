<script setup lang="ts">
import MultipleJson from '~/components/MultipleJson.vue'

definePageMeta({
  keepalive: true,
  title: 'Json Diff',
})

useHead({
  title: 'Diff',
})

function handler(a: string, b: string): { output: string, numberOfLines: number[] } {
  const firstInputNumberOfLines = a.split('\n').length
  const secondInputNumberOfLines = b.split('\n').length
  console.log(firstInputNumberOfLines, secondInputNumberOfLines)

  return {
    output: a,
    numberOfLines: [1, 2],
  }
}
</script>

<template>
  <MultipleJson
    title="JSON Diff"
    first-input-title="JSON Object 1"
    second-input-title="JSON Object 2"
    handler-title="Diff"
    :handler
  />
</template>
