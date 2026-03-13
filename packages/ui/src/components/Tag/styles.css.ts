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

const container = recipe({
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
    isKey: {
      true: {
        borderRadius: `${theme.radii.default} 0 0 ${theme.radii.default}`,
      },
    },
    isValue: {
      true: {
        borderRadius: `0 ${theme.radii.default} ${theme.radii.default} 0`,
      },
    },
    isKeyValue: {
      true: {},
    },
  },
  defaultVariants: {
    copiable: false,
    disabled: false,
    sentiment: 'neutral',
    isValue: false,
    isKey: false,
    isKeyValue: false,
  },
  compoundVariants: [
    ...SENTIMENTS.map(sentiment => ({
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
      variants: { copiable: true, sentiment, disabled: false },
    })),
    ...SENTIMENTS.map(sentiment => ({
      style: {
        borderWidth: '1px 0 1px 1px',
      },
      variants: { isKey: true, sentiment },
    })),
    ...SENTIMENTS.map(sentiment => ({
      style: {
        borderColor: theme.colors[sentiment]['border'],
      },
      variants: { isKeyValue: true, sentiment, disabled: false },
    })),
    ...SENTIMENTS.map(sentiment => ({
      style: {
        background: theme.colors.neutral.backgroundDisabled,
        border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
        color: theme.colors.neutral.textDisabled,
      },
      variants: { disabled: true, sentiment },
    })),
    ...SENTIMENTS.map(sentiment => ({
      style: {
        borderWidth: '1px 0 1px 1px',
      },
      variants: { isKey: true, sentiment, disabled: true },
    })),
  ],
})

const text = style({
  maxWidth: '14.5rem',
})

const closeButton = style({
  height: 'fit-content',
  padding: theme.space['0.25'],
  width: 'fit-content',
})

export const tagStyle = { container, text, closeButton }
