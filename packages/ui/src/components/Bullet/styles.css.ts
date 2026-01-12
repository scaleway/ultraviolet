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
      background: theme.colors.neutral.background,
      border: `1px solid ${theme.colors.neutral.border}`,
      color:
        prominence === 'strong'
          ? theme.colors.neutral.textStrong
          : theme.colors.neutral.text,
    }
  }
  const text = `text${PROMINENCES[prominence]}` as const
  const background = `background${PROMINENCES[prominence]}` as const

  return {
    background: theme.colors[sentiment][background],
    border: `1px solid ${theme.colors[sentiment][background]}`,
    color: theme.colors[sentiment][text],
  }
}
export const bullet = recipe({
  base: {
    alignItems: 'center',
    borderRadius: theme.radii.circle,
    display: 'flex',
    justifyContent: 'center',
  },
  compoundVariants: Object.keys(PROMINENCES).flatMap(prominence =>
    SENTIMENTS.map(sentiment => ({
      style: getBulletStyle(sentiment, prominence as ProminenceType),
      variants: {
        disabled: false,
        prominence: prominence as ProminenceType,
        sentiment,
      },
    })),
  ),
  defaultVariants: {
    disabled: false,
    prominence: 'default',
    sentiment: 'neutral',
    size: 'medium',
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundStrong,
        border: 'none',
        color: theme.colors.neutral.textWeak,
      },
    },
    prominence: {
      default: {},
      strong: {},
    },
    sentiment: Object.fromEntries(
      Object.keys(SENTIMENTS).map(sentiment => [sentiment, {}]),
    ),
    size: Object.fromEntries(
      Object.keys(SIZES).map(size => [
        size,
        {
          fontSize:
            theme.typography[TEXT_VARIANT[size as keyof typeof TEXT_VARIANT]]
              .fontSize,
          height: theme.sizing[SIZES[size as keyof typeof SIZES]],
          width: theme.sizing[SIZES[size as keyof typeof SIZES]],
        },
      ]),
    ),
  },
})
