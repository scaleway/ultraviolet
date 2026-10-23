import { isNullOrUndefined } from './isNullOrUndefined'

/**
 * Splits a string into an array of user-perceived characters (graphemes).
 *
 * Keep emoji, combining marks and other multi-code-point graphemes intact,
 * e.g. `'👩‍❤️‍👩'` is returned as a single element.
 *
 * @param str - The string to split. Nullish values yield an empty array.
 * @returns An array of characters, each a full grapheme cluster.
 */
export function toCharacterArray(str: string | null | undefined): string[] {
  if (isNullOrUndefined(str)) {
    return []
  }

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(str), s => s.segment)
  }

  // oxlint-disable-next-line typescript/no-misused-spread
  return [...str]
}
