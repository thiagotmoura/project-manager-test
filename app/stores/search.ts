import { defineStore } from 'pinia'
import { loadSearchHistory, saveSearchHistory } from '~/repositories/search-history.repository'

export const SEARCH_MIN_LENGTH = 3
export const SEARCH_HISTORY_LIMIT = 5

export const useSearchStore = defineStore('search', () => {
  const isOpen = ref(false)
  const draft = ref('')
  const term = ref('')
  const history = ref<string[]>(loadSearchHistory())

  const isActive = computed(() => term.value.length >= SEARCH_MIN_LENGTH)

  function addToHistory(value: string) {
    const withoutDuplicate = history.value.filter(
      item => item.toLowerCase() !== value.toLowerCase(),
    )
    history.value = [value, ...withoutDuplicate].slice(0, SEARCH_HISTORY_LIMIT)
    saveSearchHistory(history.value)
  }

  function removeFromHistory(value: string) {
    history.value = history.value.filter(item => item !== value)
    saveSearchHistory(history.value)
  }

  function setTerm(value: string) {
    const trimmed = value.trim()
    term.value = trimmed.length >= SEARCH_MIN_LENGTH ? trimmed : ''
  }

  function submit(value: string) {
    draft.value = value
    setTerm(value)
    if (isActive.value) addToHistory(term.value)
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    draft.value = term.value

    if (isActive.value) addToHistory(term.value)
  }

  function clear() {
    isOpen.value = false
    draft.value = ''
    term.value = ''
  }

  return {
    isOpen,
    draft,
    term,
    history,
    isActive,
    open,
    close,
    clear,
    setTerm,
    submit,
    removeFromHistory,
  }
})
