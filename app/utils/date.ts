const longDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function parseISODate(value: string): Date | null {
  const [year, month, day] = String(value).split('-').map(Number)
  if (!year || !month || !day) return null

  const date = new Date(year, month - 1, day)
  return date.getMonth() === month - 1 ? date : null
}

export function isValidISODate(value: string): boolean {
  return parseISODate(value) !== null
}

export function compareISODates(a: string, b: string): number {
  return a.localeCompare(b)
}

export function formatLongDate(value: string): string {
  const date = parseISODate(value)
  return date ? longDateFormatter.format(date) : ''
}
