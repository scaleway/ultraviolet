import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { pingVanillaExtract } from '../../utils'
import { SENTIMENTS } from './constant'

const HEIGHT = '10px'
const WIDTH = '10px'

const baseCircle = {
  width: WIDTH,
  height: HEIGHT,
  borderRadius: theme.radii.circle,
}

const sentimentsCircleStatus = Object.fromEntries(
  SENTIMENTS.map(sentiment => [
    sentiment,
    {
      backgroundColor:
        sentiment === 'neutral'
          ? theme.colors.neutral.backgroundStronger
          : theme.colors[sentiment].backgroundStrong,
    },
  ]),
)

export const circleStatus = recipe({
  base: {
    ...baseCircle,
    display: 'inline-block',
  },
  variants: {
    sentiment: sentimentsCircleStatus,
  },
})

export const animatedCircleStatus = recipe({
  base: {
    ...baseCircle,
    position: 'absolute',
    opacity: 0.75,
    animation: `${pingVanillaExtract} 1.1s cubic-bezier(0, 0, 0.2, 1) infinite`,
  },
  variants: {
    sentiment: sentimentsCircleStatus,
  },
})

export const status = recipe({
  base: {
    display: 'flex',
    width: WIDTH,
    height: HEIGHT,
  },
  variants: {
    notification: {
      true: {
        position: 'absolute',
        top: theme.space['0.5'],
        right: theme.space['0.5'],
      },
    },
  },
})
