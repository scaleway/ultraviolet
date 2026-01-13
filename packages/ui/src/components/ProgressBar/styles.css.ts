import { theme } from '@ultraviolet/themes'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { SENTIMENTS_WITHOUT_NEUTRAL } from '../../theme'
import { percentageValue } from './variables.css'

const shineAnimation = keyframes({
  from: { left: '-25%' },
  to: { left: '100%' },
})

export const progressContainer = style({
  backgroundColor: theme.colors.neutral.backgroundStrong,
  borderRadius: theme.radii.default,
  height: theme.sizing['050'],
  marginLeft: 0,
  marginRight: 0,
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
})

export const customText = style({
  width: 'max-content',
})

export const progressBar = style({
  animation: `${shineAnimation} 1s linear infinite`,
  background:
    'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
  bottom: 0,
  left: 0,
  opacity: 0.8,
  position: 'absolute',
  top: 0,
  width: '25%',
})

const base = style({
  borderRadius: theme.radii.default,
  bottom: 0,
  left: 0,
  position: 'absolute',
  top: 0,
  transition: '0.3s width',
  width: percentageValue,
})

export const filledBarSentiments = styleVariants(
  SENTIMENTS_WITHOUT_NEUTRAL.reduce(
    (acc, sentimentKey) => ({
      ...acc,
      [sentimentKey]: [
        base,
        {
          backgroundColor: theme.colors[sentimentKey]?.backgroundStrong,
        },
      ],
    }),
    {} as Record<
      (typeof SENTIMENTS_WITHOUT_NEUTRAL)[number],
      { backgroundColor: string }
    >,
  ),
)
