import { theme } from '@ultraviolet/themes'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SENTIMENTS_WITHOUT_NEUTRAL } from '../../../theme'
import { percentageValue } from './variables.css'

const shineAnimation = keyframes({
  from: { left: '-25%' },
  to: { left: '100%' },
})

const container = recipe({
  base: {
    backgroundColor: theme.colors.neutral.backgroundStrong,
    borderRadius: theme.radii.default,
    marginLeft: 0,
    marginRight: 0,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  variants: {
    size: {
      small: { height: theme.sizing['025'] },
      medium: { height: theme.sizing['050'] },
      large: { height: theme.sizing['100'] },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const customText = styleVariants({
  withSuffix: {
    minWidth: theme.sizing[500],
    width: 'max-content',
  },
  noSuffix: {
    minWidth: theme.sizing[300],
    width: 'max-content',
  },
})

const progressBar = style({
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

const filledBarSentiments = styleVariants(
  Object.fromEntries(
    SENTIMENTS_WITHOUT_NEUTRAL.map(sentimentKey => [
      sentimentKey,
      [
        base,
        {
          backgroundColor: theme.colors[sentimentKey].text,
        },
      ],
    ]),
  ),
)

export const progressBarStyle = {
  container,
  customText,
  progressBar,
  filledBarSentiments,
}
