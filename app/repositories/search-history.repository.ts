const STORAGE_KEY = 'gerenciador-projetos:search-history'

export function loadSearchHistory(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  }
  catch {
    return []
  }
}

export function saveSearchHistory(history: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }
  catch {
    localStorage.removeItem(STORAGE_KEY)
  }
}
