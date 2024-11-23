<script setup lang="ts">
definePageMeta({
  keepalive: true,
  title: 'Json Diff',
})

useHead({
  title: 'Diff',
})
</script>

<template>
  <JsonDiff
    title="JSON Diff"
    first-input-title="JSON Object"
  />
</template>
