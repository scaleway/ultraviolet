/**
 * Shuffles the characters of a string using the Fisher-Yates algorithm.
 *
 * Emoji are treated as single characters. Strings of 1 character or less, or
 * strings where all characters are identical, are returned unchanged.
 *
 * @param input - The string to shuffle.
 * @param maxRetries - Maximum number of attempts to produce a string different from the input (default: 20).
 * @returns A shuffled string, or the input if it cannot be shuffled.
 */
export function shuffle(input: string, maxRetries = 10): string {
  const chars = [...input]

  if (chars.length <= 1) return input
  if (new Set(chars).size === 1) return input

  let result: string
  let attempts = 0

  do {
    const shuffled = [...chars]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    result = shuffled.join('')
    attempts++
  } while (result === input && attempts < maxRetries)

  return result
}
