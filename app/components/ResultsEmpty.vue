<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div
    class="results-empty"
    role="status"
  >
    <h2 class="results-empty__title">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="results-empty__text"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<style scoped>
.results-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 64px 24px;
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  text-align: center;
}

.results-empty__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  color: var(--color-primary-dark);
}

.results-empty__text {
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text);
}
</style>
