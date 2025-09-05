import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES, PROMINENCES, SENTIMENTS } from './constants'
import capitalize from '../../utils/capitalize'
import { globalStyle } from '@vanilla-extract/css'

function generateSizeStyle(size: keyof typeof SIZES) {
  return {
    height: theme.sizing[SIZES[size]],
    width: theme.sizing[SIZES[size]],
    minWidth: theme.sizing[SIZES[size]],
    minHeight: theme.sizing[SIZES[size]],
  }
}

function getIconColor(
  prominence: keyof typeof PROMINENCES,
  sentiment: (typeof SENTIMENTS)[number],
  disabled?: boolean,
) {
  const definedProminence =
    (sentiment !== 'neutral' && prominence === 'stronger') ||
    prominence === 'weak'
      ? capitalize(PROMINENCES.default)
      : capitalize(PROMINENCES[prominence])

  const themeColor = theme.colors[sentiment]
  const iconToken = `icon${definedProminence}${
    disabled ? 'Disabled' : ''
  }` as keyof typeof themeColor

  return theme.colors?.[sentiment]?.[iconToken] || sentiment
}

export const icon = recipe({
  base: {
    verticalAlign: 'middle',
    fill: 'currentcolor',
  },
  variants: {
    sentiment: Object.fromEntries(SENTIMENTS.map(sentiment => [sentiment, {}])),
    size: Object.fromEntries(
      Object.keys(SIZES).map(size => [
        size,
        generateSizeStyle(size as keyof typeof SIZES),
      ]),
    ),
    disabled: {
      true: {},
      false: {},
    },
    prominence: Object.fromEntries(
      Object.keys(PROMINENCES).map(prominence => [prominence, {}]),
    ),
  },
  compoundVariants: [
    ...Object.keys(PROMINENCES).flatMap(prominence =>
      SENTIMENTS.map(sentiment => ({
        variants: {
          sentiment,
          prominence: prominence as keyof typeof PROMINENCES,
          disabled: false,
        },
        style: {
          fill: getIconColor(prominence as keyof typeof PROMINENCES, sentiment),
        },
      })),
    ),

    ...Object.keys(PROMINENCES).flatMap(prominence =>
      SENTIMENTS.map(sentiment => ({
        variants: {
          sentiment,
          prominence: prominence as keyof typeof PROMINENCES,
          disabled: true,
        },
        style: {
          fill: getIconColor(prominence as keyof typeof PROMINENCES, sentiment),
        },
      })),
    ),
  ],
  defaultVariants: {
    prominence: 'default',
    disabled: false,
  },
})

Object.keys(PROMINENCES).forEach(prominence =>
  SENTIMENTS.forEach(sentiment => {
    globalStyle(
      `${icon({ sentiment, prominence: prominence as keyof typeof PROMINENCES })} .fillStroke`,
      {
        fill: 'none',
        stroke: getIconColor(prominence as keyof typeof PROMINENCES, sentiment),
      },
    )
  }),
)
