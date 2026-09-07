export interface TextSegment {
  text: string
}

export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length
}
