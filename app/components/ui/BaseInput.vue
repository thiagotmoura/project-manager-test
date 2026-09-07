<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  label: string
  type?: 'text' | 'date'
  required?: boolean
  error?: string
  min?: string
  max?: string
  autocomplete?: string
}>(), {
  type: 'text',
  required: false,
  error: '',
  min: undefined,
  max: undefined,
  autocomplete: 'off',
})

const emit = defineEmits<{
  blur: []
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="field"
    :class="{ 'field--error': !!error, 'field--date': type === 'date' }"
  >
    <label
      :for="id"
      class="form-label"
    >
      {{ label }}
      <span
        v-if="required"
        class="form-label__hint"
      >(Obrigatório)</span>
    </label>

    <div class="field__control">
      <input
        :id="id"
        v-model="model"
        :type="type"
        :min="min"
        :max="max"
        :autocomplete="autocomplete"
        :aria-invalid="!!error || undefined"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="field__input"
        @blur="emit('blur')"
      >
      <span
        v-if="$slots.icon"
        class="field__icon"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
    </div>

    <p
      v-if="error"
      :id="`${id}-error`"
      class="form-error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.field__control {
  position: relative;
}

.field__input {
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--color-text);
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text-dark);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(105, 92, 205, 0.2);
}

.field--date .field__input {
  padding-right: 48px;
}

.field--date .field__input::-webkit-calendar-picker-indicator {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.field__icon {
  position: absolute;
  top: 50%;
  right: 8px;
  display: flex;
  color: var(--color-text);
  pointer-events: none;
  transform: translateY(-50%);
}

.field--error .form-label {
  color: var(--color-error-dark);
}

.field--error .form-label__hint,
.field--error .field__icon {
  color: var(--color-error);
}

.field--error .field__input {
  border-color: var(--color-error);
  color: var(--color-error);
}

.field--error .field__input:focus {
  box-shadow: 0 0 0 3px rgba(196, 0, 0, 0.15);
}
</style>
