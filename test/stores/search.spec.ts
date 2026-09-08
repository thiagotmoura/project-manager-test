import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSearchStore } from '~/stores/search'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('search store', () => {
  it('ignores anything shorter than three characters', () => {
    const search = useSearchStore()

    search.setTerm('pr')
    expect(search.term).toBe('')
    expect(search.isActive).toBe(false)

    search.setTerm('pro')
    expect(search.term).toBe('pro')
    expect(search.isActive).toBe(true)
  })

  it('drops a term that was typed and then erased', () => {
    const search = useSearchStore()

    search.setTerm('projeto')
    search.setTerm('pr')

    expect(search.term).toBe('')
  })

  it('keeps the five most recent searches, newest first', () => {
    const search = useSearchStore()

    for (const term of ['projeto', 'clicksign', 'editado', 'dois', 'novo', 'teste']) search.submit(term)

    expect(search.history).toEqual(['teste', 'novo', 'dois', 'editado', 'clicksign'])
  })

  it('moves a repeated search back to the top instead of duplicating it', () => {
    const search = useSearchStore()

    search.submit('projeto')
    search.submit('clicksign')
    search.submit('PROJETO')

    expect(search.history).toEqual(['PROJETO', 'clicksign'])
  })

  it('does not save searches that never reached three characters', () => {
    const search = useSearchStore()

    search.submit('pr')

    expect(search.history).toEqual([])
  })

  it('clears the term but leaves the history alone', () => {
    const search = useSearchStore()
    search.submit('projeto')

    search.clear()

    expect(search.term).toBe('')
    expect(search.draft).toBe('')
    expect(search.isOpen).toBe(false)
    expect(search.history).toEqual(['projeto'])
  })
})
