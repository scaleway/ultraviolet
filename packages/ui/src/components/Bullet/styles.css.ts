import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { SENTIMENTS } from '../../theme'
import { PROMINENCES, SIZES } from './constants'

const TEXT_VARIANT = {
  medium: 'body',
  small: 'bodySmall',
  xsmall: 'caption',
  xxsmall: 'captionSmallStrong',
} as const

type ProminenceType = keyof typeof PROMINENCES

function getBulletStyle(
  sentiment: (typeof SENTIMENTS)[number],
  prominence: 'default' | 'strong',
) {
  if (sentiment === 'neutral') {
    return {
      color:
        prominence === 'strong'
          ? theme.colors.neutral.textStrong
          : theme.colors.neutral.text,
      background: theme.colors.neutral.background,
      border: `1px solid ${theme.colors.neutral.border}`,
    }
  }
  const text = `text${PROMINENCES[prominence]}` as const
  const background = `background${PROMINENCES[prominence]}` as const

  return {
    color: theme.colors[sentiment][text],
    background: theme.colors[sentiment][background],
    border: `1px solid ${theme.colors[sentiment][background]}`,
  }
}
export const bullet = recipe({
  base: {
    display: 'flex',
    borderRadius: theme.radii.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    size: Object.fromEntries(
      Object.keys(SIZES).map(size => [
        size,
        {
          width: theme.sizing[SIZES[size as keyof typeof SIZES]],
          height: theme.sizing[SIZES[size as keyof typeof SIZES]],
          fontSize:
            theme.typography[TEXT_VARIANT[size as keyof typeof TEXT_VARIANT]]
              .fontSize,
        },
      ]),
    ),
    sentiment: Object.fromEntries(
      Object.keys(SENTIMENTS).map(sentiment => [sentiment, {}]),
    ),
    prominence: {
      default: {},
      strong: {},
    },
    disabled: {
      true: {
        color: theme.colors.neutral.textWeak,
        backgroundColor: theme.colors.neutral.backgroundStrong,
        border: 'none',
      },
    },
  },
  compoundVariants: Object.keys(PROMINENCES).flatMap(prominence =>
    SENTIMENTS.map(sentiment => ({
      variants: {
        sentiment,
        prominence: prominence as ProminenceType,
        disabled: false,
      },
      style: getBulletStyle(sentiment, prominence as ProminenceType),
    })),
  ),
  defaultVariants: {
    disabled: false,
    sentiment: 'neutral',
    size: 'medium',
    prominence: 'default',
  },
})
