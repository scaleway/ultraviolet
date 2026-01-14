import type { ExtendedColor } from '../constants'

export const isSentimentMonochrome = (
  sentiment: ExtendedColor,
): sentiment is 'black' | 'white' => ['black', 'white'].includes(sentiment)
