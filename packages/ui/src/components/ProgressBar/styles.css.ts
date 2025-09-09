import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'
import type { Color } from '../../theme'
import { percentageValue, sentiment } from './variables.css'

const shineAnimation = keyframes({
  from: { left: '-25%' },
  to: { left: '100%' },
})

export const progressContainer = style({
  overflow: 'hidden',
  position: 'relative',
  height: theme.sizing['050'],
  marginLeft: 0,
  marginRight: 0,
  borderRadius: theme.radii.default,
  backgroundColor: theme.colors.neutral.backgroundStrong,
  width: '100%',
})

export const customText = style({
  width: 'max-content',
})

export const progressBar = style({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: '25%',
  opacity: 0.8,
  background:
    'linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
  animation: `${shineAnimation} 1s linear infinite`,
})

export const filledBar = style({
  borderRadius: theme.radii.default,
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  transition: '0.3s width',
  backgroundColor:
    theme.colors[sentiment as Color]?.backgroundStrong ?? 'inherit',
  width: percentageValue,
})

export const filledBarSentiments = styleVariants(
  Object.keys(theme.colors).reduce(
    (acc, sentimentKey) => ({
      ...acc,
      [sentimentKey]: { backgroundColor: theme.colors.danger.backgroundStrong },
    }),
    {} as Record<keyof typeof theme.colors, { backgroundColor: string }>,
  ),
)
