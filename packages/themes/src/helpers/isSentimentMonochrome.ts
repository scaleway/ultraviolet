import type { ExtendedColor } from '../constants'

export const isSentimentMonochrome = (
  sentiment?: ExtendedColor,
): sentiment is 'black' | 'white' => {
  if (sentiment) {
    return ['black', 'white'].includes(sentiment)
  }

  return false
}
