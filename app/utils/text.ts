export interface TextSegment {
  text: string
  highlight: boolean
}

export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length
}

export function splitHighlight(text: string, term: string): TextSegment[] {
  const needle = normalizeText(term.trim())
  const haystack = normalizeText(text)

  if (!needle) return [{ text, highlight: false }]

  const segments: TextSegment[] = []
  let cursor = 0
  let match = haystack.indexOf(needle)

  while (match !== -1) {
    if (match > cursor) segments.push({ text: text.slice(cursor, match), highlight: false })

    segments.push({ text: text.slice(match, match + needle.length), highlight: true })

    cursor = match + needle.length
    match = haystack.indexOf(needle, cursor)
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor), highlight: false })

  return segments
}
