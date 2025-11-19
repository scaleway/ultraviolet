import { styleVariants } from '@vanilla-extract/css'
import { SENTIMENTS } from '../../../theme'

export const showCase = styleVariants(
  Object.fromEntries(
    [...SENTIMENTS, 'white', 'black'].map(sentiment => {
      if (sentiment === 'white') {
        return [sentiment, { background: 'black' }]
      }
      if (sentiment === 'black') {
        return [sentiment, { background: 'white' }]
      }

      return [sentiment, { background: 'none' }]
    }),
  ),
)
