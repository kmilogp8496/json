<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Unescape',
  icon: 'i-material-symbols-light-format-quote-off-outline-rounded',
  description: 'Convert escaped JSON strings back into their original JSON format. This tool helps decode escaped JSON strings into properly formatted JSON objects, making them readable and usable again.',
})

useHead({
  title: 'Unescape JSON',
})

const handler = (value: string) => {
  const content = `{"cosa":${value}}`
  const parsed = JSON.parse(JSON.parse(content).cosa)
  return prettifyJson(parsed)
}
</script>

<template>
  <JsonTransform
    title="Unescape JSON"
    input-title="Escaped JSON Object"
    output-title="Output (Unescaped)"
    handler-title="Unescape"
    :handler
  />
</template>
