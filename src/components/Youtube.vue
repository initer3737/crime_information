<script setup>
const props = defineProps(['url'])
</script>
<template>
  <div class="border-l-2 border-b-2 inline-block p-2 border-green-400 px-4 mx-4">
    <iframe
      v-if="props.url"
      width="315"
      height="576"
      :src="`https://www.youtube.com/embed/${props.url}`"
      title="YouTube embed"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

