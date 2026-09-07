<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

withDefaults(defineProps<{
  to?: RouteLocationRaw
  label?: string
}>(), {
  to: undefined,
  label: 'Voltar',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="back-link"
  >
    <IconArrowLeft />
    {{ label }}
  </NuxtLink>
  <button
    v-else
    type="button"
    class="back-link"
    @click="emit('click')"
  >
    <IconArrowLeft />
    {{ label }}
  </button>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-primary);
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--color-primary-dark);
}
</style>
