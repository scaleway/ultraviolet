import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

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
    alignItems: 'center',
    borderRadius: theme.radii.default,
    display: 'inline-flex',
    gap: theme.space[1],
    height: theme.sizing[300],
    justifyContent: 'center',
    padding: `0 ${theme.space[1]}`,
    whiteSpace: 'nowrap',
    width: 'fit-content',
  },
  compoundVariants: SENTIMENTS.map(sentiment => ({
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
    variants: { copiable: true, sentiment },
  })),
  defaultVariants: {
    copiable: false,
    disabled: false,
    sentiment: 'neutral',
  },
  variants: {
    copiable: {
      true: {
        selectors: {
          '&:active': {
            boxShadow: theme.shadows.focusNeutral,
          },
          '&:hover, &:active': {
            cursor: 'pointer',
          },
        },
      },
    },
    disabled: {
      true: {
        background: theme.colors.neutral.backgroundDisabled,
        border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
        color: theme.colors.neutral.textDisabled,
        cursor: 'not-allowed',
      },
    },

    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        {
          background: theme.colors[sentiment].background,
          border: `solid 1px ${sentiment === 'neutral' ? theme.colors.neutral.border : theme.colors[sentiment].background}`,
          color: theme.colors[sentiment].text,
        },
      ]),
    ),
  },
})

export const textTag = style({
  maxWidth: '14.5rem',
})

export const closeButtonTag = style({
  height: 'fit-content',
  padding: theme.space['0.25'],
  width: 'fit-content',
})
