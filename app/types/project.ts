export interface Project {
  id: string
  name: string
  client: string
  startDate: string
  endDate: string
  coverImage: string | null
  favorite: boolean
  createdAt: string
  updatedAt: string
}

export type ProjectInput = Omit<Project, 'id' | 'favorite' | 'createdAt' | 'updatedAt'>

export type ProjectFormErrors = Partial<Record<keyof ProjectInput, string>>

export type SortOption = 'alphabetical' | 'recent' | 'deadline'
