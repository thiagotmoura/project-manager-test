<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

withDefaults(defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  block?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  to?: RouteLocationRaw
}>(), {
  variant: 'primary',
  size: 'lg',
  block: false,
  type: 'button',
  disabled: false,
  to: undefined,
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.btn--lg {
  height: 52px;
  padding: 0 32px;
  font-size: 20px;
}

.btn--md {
  height: 40px;
  padding: 0 24px;
  font-size: 16px;
  line-height: 24px;
}

.btn--block {
  width: 100%;
}

.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.btn--primary:disabled {
  background-color: var(--color-primary-light);
}

.btn--secondary {
  background-color: var(--color-white);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn--secondary:hover:not(:disabled) {
  background-color: var(--color-bg);
}

.btn--secondary:disabled {
  opacity: 0.6;
}
</style>
