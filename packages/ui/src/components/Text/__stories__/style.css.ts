// oxlint-disable typescript/no-unsafe-type-assertion
import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SENTIMENTS } from '../../../theme'
import { PROMINENCES } from '../constants'

export const oneLineContainer = style({
  background: theme.colors.info.background,
  marginBottom: theme.space[2],
  marginTop: theme.space[2],
  padding: theme.space[1],
  width: 200,
})

export const showCase = recipe({
  variants: {
    sentiment: Object.fromEntries([...SENTIMENTS, 'white', 'black'].map(sentiment => [sentiment, {}])),
    prominence: Object.fromEntries(Object.keys(PROMINENCES).map(prominence => [prominence, {}])),
  },
  defaultVariants: {
    sentiment: 'neutral',
    prominence: 'default',
  },
  compoundVariants: [...SENTIMENTS, 'white', 'black'].flatMap(sentiment =>
    Object.keys(PROMINENCES).map(prominence => {
      const prominenceString = PROMINENCES[prominence as keyof typeof PROMINENCES]
      const computedProminence = `background${prominenceString.charAt(0).toUpperCase() + prominenceString.slice(1)}`

      if (sentiment === 'black') {
        return {
          variants: {
            prominence,
            sentiment,
          },
          style: { background: 'white' },
        }
      }

      if (sentiment === 'white') {
        return {
          variants: {
            prominence,
            sentiment,
          },
          style: { background: 'black' },
        }
      }

      const backgroundValue = (theme.colors[sentiment as keyof typeof theme.colors] as typeof theme.colors.primary)[
        computedProminence as keyof typeof theme.colors.primary
      ]

      return {
        variants: {
          prominence,
          sentiment,
        },
        style: { background: backgroundValue },
      }
    }),
  ),
})
