import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { PROMINENCES, SENTIMENTS, SIZES } from './constants'
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
  sentiment?: (typeof SENTIMENTS)[number],
  disabled?: boolean,
) {
  if (!sentiment) {
    return 'currentColor'
  }

  const definedProminence =
    sentiment === 'neutral' ? capitalize(PROMINENCES[prominence]) : ''

  const themeColor = theme.colors[sentiment]
  const iconToken = `icon${definedProminence}${
    disabled ? 'Disabled' : ''
  }` as keyof typeof themeColor

  return themeColor[iconToken]
}

export const icon = recipe({
  base: {
    verticalAlign: 'middle',
    fill: 'currentcolor',
  },
  variants: {
    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [sentiment, {}]),
    ) as Record<(typeof SENTIMENTS)[number], object>,
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
    ) as Record<keyof typeof PROMINENCES, object>,
  },
  compoundVariants: [true, false].flatMap(disabled =>
    Object.keys(PROMINENCES).flatMap(prominence =>
      [...SENTIMENTS, undefined].map(sentiment => ({
        // We need to add undefined to have the variant where sentiment is undefined
        variants: {
          sentiment,
          prominence: prominence as keyof typeof PROMINENCES,
          disabled,
        },
        style: {
          fill: getIconColor(
            prominence as keyof typeof PROMINENCES,
            sentiment,
            disabled,
          ),
        },
      })),
    ),
  ),
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
