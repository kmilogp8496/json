<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Escape and Trim',
})

useHead({
  title: 'Escape and Trim',
})

const handler = (value: string) => {
  const cosa = {
    content: JSON.stringify(JSON.parse(value)),
  }
  const stringified = JSON.stringify(cosa)
  const delimiter = '{"content":'
  const sliceIndex = stringified.indexOf(delimiter) + delimiter.length

  return stringified.slice(sliceIndex, stringified.length - 1)
}
</script>

<template>
  <JsonTransform
    title="JSON Escape and Trim"
    input-title="JSON Object"
    output-title="Output (Trimmed and Escaped)"
    handler-title="Escape and Trim"
    :handler
  />
</template>
