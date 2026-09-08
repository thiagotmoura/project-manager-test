import { describe, expect, it } from 'vitest'
import type { ProjectInput } from '~/types/project'
import { VALIDATION_MESSAGES, validateProject } from '~/utils/validation'

function project(overrides: Partial<ProjectInput> = {}): ProjectInput {
  return {
    name: 'Projeto de Teste',
    client: 'Clicksign',
    startDate: '2026-01-10',
    endDate: '2026-02-20',
    coverImage: null,
    ...overrides,
  }
}

describe('validateProject', () => {
  it('has nothing to complain about when everything is filled in', () => {
    expect(validateProject(project())).toEqual({})
  })

  it('asks for at least two words in the name', () => {
    expect(validateProject(project({ name: 'Projeto' })).name).toBe(VALIDATION_MESSAGES.name)
    expect(validateProject(project({ name: '   ' })).name).toBe(VALIDATION_MESSAGES.name)
    expect(validateProject(project({ name: 'Projeto de Teste' })).name).toBeUndefined()
  })

  it('is fine with a one word client', () => {
    expect(validateProject(project({ client: 'Clicksign' })).client).toBeUndefined()
    expect(validateProject(project({ client: '' })).client).toBe(VALIDATION_MESSAGES.client)
  })

  it('catches dates that look valid but do not exist', () => {
    expect(validateProject(project({ startDate: '2026-02-31' })).startDate).toBe(VALIDATION_MESSAGES.date)
    expect(validateProject(project({ endDate: '' })).endDate).toBe(VALIDATION_MESSAGES.date)
  })

  it('does not let the project end before it starts', () => {
    const errors = validateProject(project({ startDate: '2026-03-10', endDate: '2026-03-01' }))
    expect(errors.endDate).toBe(VALIDATION_MESSAGES.endBeforeStart)
  })

  it('accepts a project that starts and ends on the same day', () => {
    expect(validateProject(project({ startDate: '2026-03-10', endDate: '2026-03-10' }))).toEqual({})
  })
})
