import type { Project, SortOption } from '~/types/project'
import { compareISODates } from '~/utils/date'

export const SORT_OPTIONS: ReadonlyArray<{ value: SortOption, label: string }> = [
  { value: 'alphabetical', label: 'Ordem alfabética' },
  { value: 'recent', label: 'Iniciados mais recentes' },
  { value: 'deadline', label: 'Prazo mais próximo' },
]

const collator = new Intl.Collator('pt-BR', { sensitivity: 'base' })

function byName(a: Project, b: Project): number {
  return collator.compare(a.name, b.name)
}

const comparators: Record<SortOption, (a: Project, b: Project) => number> = {
  alphabetical: byName,
  recent: (a, b) => compareISODates(b.startDate, a.startDate) || byName(a, b),
  deadline: (a, b) => compareISODates(a.endDate, b.endDate) || byName(a, b),
}

export function sortProjects(projects: Project[], sortBy: SortOption): Project[] {
  return [...projects].sort(comparators[sortBy])
}
