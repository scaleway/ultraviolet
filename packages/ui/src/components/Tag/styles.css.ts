import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const SENTIMENTS = ['danger', 'info', 'neutral', 'primary', 'secondary', 'success', 'warning'] as const

const wrapper = styleVariants({
  copiable: {},
  notCopiable: {},
})

const separator = style({})
const content = styleVariants({
  copiable: {},
  notCopiable: {},
})

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
    maxWidth: '100%',
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
    closable: {
      true: {
        gap: theme.space[0.5],
        borderRadius: `${theme.radii.default} 0 0 ${theme.radii.default}`,
      },
    },

    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        {
          background: theme.colors[sentiment].background,
          border: `solid 1px ${theme.colors[sentiment].border}`,
          color: theme.colors[sentiment].text,
        },
      ]),
    ),
    isButton: {
      true: {
        borderRadius: `0 ${theme.radii.default} ${theme.radii.default} 0`,
        width: theme.sizing[300],
        marginLeft: -1,
      },
      false: {
        selectors: {
          [`${wrapper.copiable}:hover &:not(:hover), ${wrapper.copiable}:focus-visible &:not(:focus-visible), ${wrapper.notCopiable}:hover &:not(:hover), ${wrapper.notCopiable}:focus-visible &:not(:focus-visible)`]:
            {
              borderRightColor: 'transparent',
            },
        },
      },
    },
  },
  defaultVariants: {
    copiable: false,
    disabled: false,
    sentiment: 'neutral',
    isButton: false,
    closable: false,
  },
  compoundVariants: [
    ...SENTIMENTS.map(sentiment => ({
      style: {
        selectors: {
          '&:hover, &:active, &:focus-visible': {
            background: theme.colors[sentiment].backgroundHover,
            borderColor: theme.colors[sentiment].borderHover,
          },
          '&:active': {
            boxShadow: theme.shadows[
              `focus${sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}` as keyof typeof theme.shadows
            ] as string,
          },
        },
      },
      variants: { copiable: true, sentiment, disabled: false },
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
        background: theme.colors[sentiment].background,
        cursor: 'pointer',
        selectors: {
          '&:hover, &:focus-visible': {
            background: theme.colors[sentiment].backgroundHover,
            border: `1px solid ${theme.colors[sentiment].borderHover}`,
          },
          [`${wrapper.copiable}:hover &:not(:hover), ${wrapper.copiable}:focus-visible &:not(:focus-visible)`]: {
            borderLeft: `1px solid ${theme.colors[sentiment].borderHover}`,
          },
        },
      },
      variants: { isButton: true, sentiment, disabled: false },
    })),
  ],
})

const text = style({
  maxWidth: '14.5rem',
})

export const tagStyle = { container, text, separator, wrapper, content }
