<script setup lang="ts">
import { SEARCH_MIN_LENGTH } from '~/stores/search'

const SEARCH_DEBOUNCE_MS = 350

const emit = defineEmits<{
  close: []
}>()

const search = useSearchStore()

const input = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const showHistory = computed(() => isFocused.value && search.history.length > 0)
const hint = computed(() => {
  const length = search.draft.trim().length
  return length > 0 && length < SEARCH_MIN_LENGTH
    ? `Digite ao menos ${SEARCH_MIN_LENGTH} caracteres para buscar`
    : ''
})

let debounceTimer: ReturnType<typeof setTimeout> | undefined

watch(() => search.draft, (value) => {
  clearTimeout(debounceTimer)
  if (value.trim().length < SEARCH_MIN_LENGTH) {
    search.setTerm('')
    return
  }
  debounceTimer = setTimeout(() => search.setTerm(value), SEARCH_DEBOUNCE_MS)
})

function submit() {
  clearTimeout(debounceTimer)
  search.submit(search.draft)
  input.value?.blur()
}

function selectHistoryItem(item: string) {
  clearTimeout(debounceTimer)
  search.submit(item)
  isFocused.value = false
}

function close() {
  clearTimeout(debounceTimer)
  emit('close')
}

onMounted(() => {
  input.value?.focus()
})

onBeforeUnmount(() => clearTimeout(debounceTimer))
</script>

<template>
  <div
    class="search-bar"
    :class="{ 'search-bar--focused': isFocused }"
  >
    <form
      class="search-bar__form"
      role="search"
      @submit.prevent="submit"
    >
      <IconSearch class="search-bar__icon" />
      <input
        ref="input"
        v-model="search.draft"
        type="text"
        class="search-bar__input"
        placeholder="Digite o nome do projeto..."
        aria-label="Buscar projetos pelo nome"
        autocomplete="off"
        spellcheck="false"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown.esc.prevent="close"
      >
      <span
        v-if="hint"
        class="search-bar__hint"
        aria-live="polite"
      >{{ hint }}</span>
    </form>

    <ul
      v-if="showHistory"
      class="search-bar__history"
      aria-label="Buscas recentes"
    >
      <li
        v-for="item in search.history"
        :key="item"
        class="search-bar__history-item"
      >
        <button
          type="button"
          class="search-bar__history-select"
          @mousedown.prevent
          @click="selectHistoryItem(item)"
        >
          <IconHistory />
          <span>{{ item }}</span>
        </button>
        <button
          type="button"
          class="search-bar__history-remove"
          :aria-label="`Remover “${item}” do histórico`"
          @mousedown.prevent
          @click="search.removeFromHistory(item)"
        >
          <IconClose />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-bar {
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: var(--color-white);
}

.search-bar__form {
  position: relative;
  height: 100%;
}

.search-bar__icon {
  position: absolute;
  top: 50%;
  left: 32px;
  color: var(--color-primary);
  transform: translateY(-50%);
  pointer-events: none;
}

.search-bar__input {
  width: 100%;
  height: 100%;
  padding: 0 32px 0 74px;
  border: 2px solid transparent;
  background-color: transparent;
  font-size: 18px;
  line-height: 24px;
  color: var(--color-text-dark);
  transition: border-color 0.15s ease;
}

.search-bar__input::placeholder {
  color: var(--color-text);
}

.search-bar__input:focus {
  outline: none;
}

.search-bar--focused .search-bar__input {
  border-color: var(--color-primary);
}

.search-bar__hint {
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 14px;
  color: var(--color-text);
  transform: translateY(-50%);
  pointer-events: none;
}

.search-bar__history {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  border: 2px solid var(--color-primary);
  border-top: 0;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.search-bar__history-item {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-bg);
  transition: background-color 0.15s ease;
}

.search-bar__history-item:hover {
  background-color: var(--color-bg);
}

.search-bar__history-select {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 18px;
  min-width: 0;
  padding: 17px 22px;
  font-size: 16px;
  line-height: 16px;
  color: var(--color-text);
  text-align: left;
}

.search-bar__history-select span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-bar__history-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  margin-right: 22px;
  border-radius: 50%;
  color: var(--color-text);
}

.search-bar__history-remove:hover {
  color: var(--color-text-dark);
}

@media (max-width: 768px) {
  .search-bar__icon {
    left: 20px;
  }

  .search-bar__input {
    padding: 0 20px 0 56px;
  }

  .search-bar__hint {
    display: none;
  }
}
</style>
