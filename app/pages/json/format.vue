<script lang="ts" setup>
definePageMeta({
  keepalive: true,
  title: 'Format',
})

useHead({
  title: 'Format',
})

const handler = (value: string) => {
  const parsed = JSON.parse(value)
  return JSON.stringify(parsed, null, 4)
}
</script>

<template>
  <JsonTransform
    title="JSON Format"
    input-title="JSON Object"
    output-title="Output (Formatted)"
    handler-title="Format"
    :handler
  />
</template>
