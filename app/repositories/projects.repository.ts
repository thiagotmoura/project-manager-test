import type { Project } from '~/types/project'

const STORAGE_KEY = 'gerenciador-projetos:projects'
const FULL_STORAGE_MESSAGE = 'Não foi possível salvar: o armazenamento do navegador está cheio. Tente usar uma imagem menor.'

export function loadProjects(): Project[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  }
  catch {
    return []
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }
  catch {
    throw new Error(FULL_STORAGE_MESSAGE)
  }
}
