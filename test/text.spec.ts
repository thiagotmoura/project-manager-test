import { describe, expect, it } from 'vitest'
import { splitHighlight } from '~/utils/text'

function marked(text: string, term: string): string {
  return splitHighlight(text, term)
    .map(part => (part.highlight ? `[${part.text}]` : part.text))
    .join('')
}

describe('splitHighlight', () => {
  it('wraps only the stretch that matched', () => {
    expect(marked('Projeto Clicksign', 'cli')).toBe('Projeto [Cli]cksign')
  })

  it('does not care about accents or case', () => {
    expect(marked('Projeto Três', 'tres')).toBe('Projeto [Três]')
    expect(marked('Projeto Tres', 'TRÊS')).toBe('Projeto [Tres]')
  })

  it('marks every occurrence, not just the first', () => {
    expect(marked('Projeto de projeto', 'projeto')).toBe('[Projeto] de [projeto]')
  })

  it('hands the text back untouched when there is no term', () => {
    expect(splitHighlight('Projeto Clicksign', '   ')).toEqual([
      { text: 'Projeto Clicksign', highlight: false },
    ])
  })
})
