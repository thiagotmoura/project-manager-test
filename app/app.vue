<script setup lang="ts">
useHead({
  titleTemplate: title => (title ? `${title} | Gerenciador de Projetos` : 'Gerenciador de Projetos'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
