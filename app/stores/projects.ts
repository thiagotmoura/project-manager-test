import { defineStore } from 'pinia'
import type { Project, ProjectInput, SortOption } from '~/types/project'
import { loadProjects, saveProjects } from '~/repositories/projects.repository'
import { sortProjects, filterProjectsByName } from '~/utils/projects'
import { useSearchStore } from '~/stores/search'

function normalize(input: ProjectInput): ProjectInput {
  return {
    ...input,
    name: input.name.trim(),
    client: input.client.trim(),
    coverImage: input.coverImage || null,
  }
}

export const useProjectsStore = defineStore('projects', () => {
  const searchStore = useSearchStore()

  const projects = ref<Project[]>(loadProjects())
  const favoritesOnly = ref(false)
  const sortBy = ref<SortOption>('alphabetical')

  const total = computed(() => projects.value.length)
  const hasProjects = computed(() => total.value > 0)

  const visibleProjects = computed(() => {
    let list = projects.value

    if (searchStore.isActive) list = filterProjectsByName(list, searchStore.term)
    if (favoritesOnly.value) list = list.filter(project => project.favorite)

    return sortProjects(list, sortBy.value)
  })

  function getById(id: string) {
    return projects.value.find(project => project.id === id)
  }

  function persist(next: Project[]) {
    const previous = projects.value
    projects.value = next

    try {
      saveProjects(next)
    }
    catch (error) {
      projects.value = previous
      throw error
    }
  }

  function create(input: ProjectInput) {
    const now = new Date().toISOString()

    const project: Project = {
      id: crypto.randomUUID(),
      favorite: false,
      createdAt: now,
      updatedAt: now,
      ...normalize(input),
    }
  
    persist([...projects.value, project])
    return project
  }

  function update(id: string, input: ProjectInput) {
    persist(projects.value.map(project =>
      project.id === id
        ? { ...project, ...normalize(input), updatedAt: new Date().toISOString() }
        : project,
    ))
    return getById(id)
  }

  function remove(id: string) {
    persist(projects.value.filter(project => project.id !== id))
  }

  function toggleFavorite(id: string) {
    persist(projects.value.map(project =>
      project.id === id ? { ...project, favorite: !project.favorite } : project,
    ))
  }

  return {
    projects,
    favoritesOnly,
    sortBy,
    total,
    hasProjects,
    visibleProjects,
    getById,
    create,
    update,
    remove,
    toggleFavorite,
  }
})
