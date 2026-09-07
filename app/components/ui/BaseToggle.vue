<script setup lang="ts">
defineProps<{
  label?: string
}>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="toggle">
    <input
      v-model="model"
      type="checkbox"
      role="switch"
      class="toggle__input"
      :aria-checked="model"
    >
    <span
      class="toggle__track"
      aria-hidden="true"
    />
    <span
      v-if="label"
      class="toggle__label"
    >{{ label }}</span>
  </label>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.toggle__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.toggle__track {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background-color: var(--color-toggle-off);
  transition: background-color 0.2s ease;
}

.toggle__track::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-white);
  transform: translateY(-50%);
  transition: transform 0.2s ease;
}

.toggle__input:checked + .toggle__track {
  background-color: var(--color-accent);
}

.toggle__input:checked + .toggle__track::after {
  transform: translate(24px, -50%);
}

.toggle__input:focus-visible + .toggle__track {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.toggle__label {
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text-strong);
  white-space: nowrap;
}
</style>
