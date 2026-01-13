import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { ping } from '../../utils'
import { SENTIMENTS } from './constant'

const HEIGHT = '10px'
const WIDTH = '10px'

const baseCircle = {
  borderRadius: theme.radii.circle,
  height: HEIGHT,
  width: WIDTH,
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
    animation: `${ping} 1.1s cubic-bezier(0, 0, 0.2, 1) infinite`,
    opacity: 0.75,
    position: 'absolute',
  },
  variants: {
    sentiment: sentimentsCircleStatus,
  },
})

export const status = recipe({
  base: {
    display: 'flex',
    height: HEIGHT,
    width: WIDTH,
  },
  variants: {
    notification: {
      true: {
        position: 'absolute',
        right: theme.space['0.5'],
        top: theme.space['0.5'],
      },
    },
  },
})
