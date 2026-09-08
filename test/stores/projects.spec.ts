import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { ProjectInput } from '~/types/project'
import { useProjectsStore } from '~/stores/projects'

function input(overrides: Partial<ProjectInput> = {}): ProjectInput {
  return {
    name: 'Projeto de Teste',
    client: 'Clicksign',
    startDate: '2026-01-10',
    endDate: '2026-02-20',
    coverImage: null,
    ...overrides,
  }
}

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('projects store', () => {
  it('trims the name and the client before storing them', () => {
    const store = useProjectsStore()
    const project = store.create(input({ name: '  Projeto de Teste ', client: ' Clicksign ' }))

    expect(project.name).toBe('Projeto de Teste')
    expect(project.client).toBe('Clicksign')
  })

  it('keeps createdAt when the project is edited', () => {
    const store = useProjectsStore()
    const { id, createdAt } = store.create(input())

    store.update(id, input({ name: 'Projeto Novo' }))

    expect(store.getById(id)?.name).toBe('Projeto Novo')
    expect(store.getById(id)?.createdAt).toBe(createdAt)
  })

  it('does not lose the favorite flag on edit', () => {
    const store = useProjectsStore()
    const { id } = store.create(input())

    store.toggleFavorite(id)
    store.update(id, input({ client: 'Sysdev' }))

    expect(store.getById(id)?.favorite).toBe(true)
  })

  it('sorts alphabetically by default, ignoring accents', () => {
    const store = useProjectsStore()
    store.create(input({ name: 'Zaratus Max' }))
    store.create(input({ name: 'Projeto Beta' }))
    store.create(input({ name: 'Alpha Um' }))

    expect(store.visibleProjects.map(p => p.name)).toEqual(['Alpha Um', 'Projeto Beta', 'Zaratus Max'])
  })

  it('puts the closest deadline first', () => {
    const store = useProjectsStore()
    store.create(input({ name: 'Projeto Longo', endDate: '2026-12-01' }))
    store.create(input({ name: 'Projeto Curto', endDate: '2026-03-01' }))

    store.sortBy = 'deadline'

    expect(store.visibleProjects.map(p => p.name)).toEqual(['Projeto Curto', 'Projeto Longo'])
  })

  it('hides everything that is not a favorite when the filter is on', () => {
    const store = useProjectsStore()
    const { id } = store.create(input({ name: 'Projeto Um' }))
    store.create(input({ name: 'Projeto Dois' }))

    store.toggleFavorite(id)
    store.favoritesOnly = true

    expect(store.visibleProjects.map(p => p.name)).toEqual(['Projeto Um'])
    expect(store.total).toBe(2)
  })
})
