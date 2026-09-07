<script setup lang="ts" generic="T extends string">
export interface SelectOption<V extends string = string> {
  value: V
  label: string
}

const props = defineProps<{
  options: ReadonlyArray<SelectOption<T>>
  ariaLabel?: string
}>()

const model = defineModel<T>({ required: true })

const root = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const activeIndex = ref(-1)
const listId = useId()

const selected = computed(() => props.options.find(option => option.value === model.value))

function open() {
  isOpen.value = true
  activeIndex.value = Math.max(0, props.options.findIndex(option => option.value === model.value))
}

function close() {
  isOpen.value = false
  activeIndex.value = -1
}

function toggle() {
  if (isOpen.value) close()
  else open()
}

function choose(option: SelectOption<T>) {
  model.value = option.value
  close()
}

function moveActive(delta: number) {
  if (!isOpen.value) {
    open()
    return
  }
  const count = props.options.length
  activeIndex.value = (activeIndex.value + delta + count) % count
}

function onKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveActive(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActive(-1)
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (isOpen.value && props.options[activeIndex.value]) choose(props.options[activeIndex.value]!)
      else toggle()
      break
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        close()
      }
      break
    case 'Tab':
      close()
      break
  }
}
</script>

<template>
  <div
    ref="root"
    class="select"
    :class="{ 'select--open': isOpen }"
    @keydown="onKeydown"
  >
    <button
      type="button"
      class="select__trigger"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-controls="listId"
      :aria-label="ariaLabel"
      @click="toggle"
    >
      <span class="select__value">{{ selected?.label }}</span>
      <IconChevronDown class="select__chevron" />
    </button>

    <ul
      v-show="isOpen"
      :id="listId"
      class="select__list"
      role="listbox"
      :aria-label="ariaLabel"
    >
      <li
        v-for="(option, index) in options"
        :key="option.value"
        class="select__option"
        :class="{
          'select__option--active': index === activeIndex,
          'select__option--selected': option.value === model,
        }"
        role="option"
        :aria-selected="option.value === model"
        @click="choose(option)"
        @mousemove="activeIndex = index"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select {
  position: relative;
  width: 296px;
  max-width: 100%;
}

.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--color-text);
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  font-size: 16px;
  line-height: 18px;
  color: var(--color-text-dark);
  text-align: left;
  transition: border-color 0.15s ease;
}

.select--open .select__trigger {
  border-color: var(--color-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.select__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select__chevron {
  flex-shrink: 0;
  color: var(--color-text);
  transition: transform 0.2s ease;
}

.select--open .select__chevron {
  transform: rotate(180deg);
}

.select__list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  overflow: hidden;
  border: 1px solid var(--color-primary);
  border-top: 0;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.select__option {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-divider);
  font-size: 16px;
  line-height: 16px;
  color: var(--color-text-dark);
  cursor: pointer;
}

.select__option:last-child {
  border-bottom: 0;
}

.select__option--active {
  background-color: var(--color-bg);
}

.select__option--selected {
  color: var(--color-primary);
}
</style>
