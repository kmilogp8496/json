<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Minify',
  icon: 'i-iconoir-arrow-reduce-tag',
  description: 'Compress your JSON by removing unnecessary whitespace and formatting. This tool efficiently reduces JSON file size while maintaining data integrity, perfect for optimization and reducing payload sizes.',
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
