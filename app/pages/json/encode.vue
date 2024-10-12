<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Encode',
})

useHead({
  title: 'JSON Encode',
})

const handler = (value: string) => {
  const parsed = JSON.parse(value)
  return JSON.stringify(parsed)
}
</script>

<template>
  <JsonTransform
    title="JSON Encode"
    input-title="JSON Object"
    output-title="Output (Encoded)"
    handler-title="Encode"
    :handler
  />
</template>
