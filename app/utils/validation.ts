import type { ProjectFormErrors, ProjectInput } from '~/types/project'
import { compareISODates, isValidISODate } from '~/utils/date'
import { countWords } from '~/utils/text'

export const VALIDATION_MESSAGES = {
  name: 'Por favor, digite ao menos duas palavras',
  client: 'Por favor, digite ao menos uma palavra',
  date: 'Selecione uma data válida',
  endBeforeStart: 'A data final deve ser igual ou posterior à data de início',
} as const

export function validateProject(values: ProjectInput): ProjectFormErrors {
  const errors: ProjectFormErrors = {}

  if (countWords(values.name) < 2) errors.name = VALIDATION_MESSAGES.name
  if (countWords(values.client) < 1) errors.client = VALIDATION_MESSAGES.client

  const validStart = isValidISODate(values.startDate)
  const validEnd = isValidISODate(values.endDate)

  if (!validStart) errors.startDate = VALIDATION_MESSAGES.date
  if (!validEnd) errors.endDate = VALIDATION_MESSAGES.date

  if (validStart && validEnd && compareISODates(values.endDate, values.startDate) < 0) {
    errors.endDate = VALIDATION_MESSAGES.endBeforeStart
  }

  return errors
}
