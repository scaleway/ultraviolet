import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

export const SENTIMENTS = [
  'danger',
  'info',
  'neutral',
  'primary',
  'secondary',
  'success',
  'warning',
] as const

export const containerTag = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    borderRadius: theme.radii.default,
    padding: `0 ${theme.space[1]}`,
    gap: theme.space[1],
    width: 'fit-content',
    height: theme.sizing[300],
  },
  variants: {
    copiable: {
      true: {
        selectors: {
          '&:hover, &:active': {
            cursor: 'pointer',
          },
          '&:active': {
            boxShadow: theme.shadows.focusNeutral,
          },
        },
      },
    },

    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        {
          color: theme.colors[sentiment].text,
          background: theme.colors[sentiment].background,
          border: `solid 1px ${sentiment === 'neutral' ? theme.colors.neutral.border : theme.colors[sentiment].background}`,
        },
      ]),
    ),
    disabled: {
      true: {
        color: theme.colors.neutral.textDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
        cursor: 'not-allowed',
      },
    },
  },
  compoundVariants: SENTIMENTS.map(sentiment => ({
    variants: { copiable: true, sentiment },
    style: {
      selectors: {
        '&:hover, &:active': {
          background: theme.colors[sentiment].backgroundHover,
          borderColor:
            theme.colors[sentiment][
              sentiment === 'neutral' ? 'borderStrongHover' : 'borderHover'
            ],
        },
      },
    },
  })),
  defaultVariants: {
    copiable: false,
    disabled: false,
    sentiment: 'neutral',
  },
})

export const textTag = style({
  maxWidth: '14.5rem',
})

export const closeButtonTag = style({
  width: 'fit-content',
  height: 'fit-content',
  padding: theme.space['0.25'],
})
