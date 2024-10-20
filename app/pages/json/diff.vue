<script setup lang="ts">
import MultipleJson from '~/components/MultipleJson.vue'

definePageMeta({
  keepalive: true,
  title: 'Json Diff',
})

useHead({
  title: 'Diff',
})

function handler(a: string, b: string): { original: string, modified: string } {
  return {
    original: a,
    modified: b,
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
