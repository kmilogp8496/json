<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Minify',
})

useHead({
  title: 'Minify',
})

const handler = (value: string) => {
  const trimmed = JSON.parse(value)
  return JSON.stringify(trimmed)
}
</script>

<template>
  <JsonTransform
    title="JSON Minify"
    input-title="JSON Object"
    output-title="Output (Minified)"
    handler-title="Minify"
    :handler
  />
</template>
