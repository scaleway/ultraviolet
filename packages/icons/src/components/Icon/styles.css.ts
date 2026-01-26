import { theme } from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import { globalStyle } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { PROMINENCES, SENTIMENTS, SIZES } from './constants'

function generateSizeStyle(size: keyof typeof SIZES) {
  return {
    height: theme.sizing[SIZES[size]],
    minHeight: theme.sizing[SIZES[size]],
    minWidth: theme.sizing[SIZES[size]],
    width: theme.sizing[SIZES[size]],
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
    fill: 'currentcolor',
    verticalAlign: 'middle',
  },
  compoundVariants: [true, false].flatMap(disabled =>
    Object.keys(PROMINENCES).flatMap(prominence =>
      [...SENTIMENTS, undefined].map(sentiment => ({
        style: {
          fill: getIconColor(
            prominence as keyof typeof PROMINENCES,
            sentiment,
            disabled,
          ),
        },
        // We need to add undefined to have the variant where sentiment is undefined
        variants: {
          disabled,
          prominence: prominence as keyof typeof PROMINENCES,
          sentiment,
        },
      })),
    ),
  ),
  defaultVariants: {
    disabled: false,
    prominence: 'default',
  },
  variants: {
    disabled: {
      false: {},
      true: {},
    },
    prominence: Object.fromEntries(
      Object.keys(PROMINENCES).map(prominence => [prominence, {}]),
    ) as Record<keyof typeof PROMINENCES, object>,
    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [sentiment, {}]),
    ) as Record<(typeof SENTIMENTS)[number], object>,
    size: Object.fromEntries(
      Object.keys(SIZES).map(size => [
        size,
        generateSizeStyle(size as keyof typeof SIZES),
      ]),
    ),
  },
})

for (const prominence of Object.keys(PROMINENCES)) {
  for (const sentiment of SENTIMENTS) {
    globalStyle(
      `${icon({ prominence: prominence as keyof typeof PROMINENCES, sentiment })} .fillStroke`,
      {
        fill: 'none',
        stroke: getIconColor(prominence as keyof typeof PROMINENCES, sentiment),
      },
    )
  }
}
