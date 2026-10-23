import { toCharacterArray } from './toCharacterArray'

/**
 * Reverses the characters of a string.
 *
 * Emoji and other multi-code-point graphemes are treated as single
 * characters, so they stay intact. Nullish values are treated as an empty
 * string.
 *
 * @param input - The string to reverse.
 * @returns The reversed string, or an empty string for nullish values.
 */
export function reverseString(input: string | null | undefined): string {
  return toCharacterArray(input).toReversed().join('')
}
