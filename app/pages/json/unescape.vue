<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Unescape',
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
