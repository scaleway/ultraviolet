import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const orderSummaryContainer = style({
  backgroundColor: theme.colors.neutral.backgroundWeak,
  height: '100%',
  minWidth: '20rem',
  '@media': {
    '(min-width: 1440px)': {
      minWidth: '27.5rem',
    },
  },
})

const orderSummaryHeaderContainerBase = style({
  height: theme.sizing[900],
  padding: theme.space[3],
  paddingBottom: theme.space[2],
})

export const orderSummaryHeaderContainer = styleVariants({
  hideDetails: [orderSummaryHeaderContainerBase],
  showDetails: [
    orderSummaryHeaderContainerBase,
    { borderBottom: `1px solid ${theme.colors.neutral.border}` },
  ],
})

export const orderSummaryStackBackground = style({
  backgroundColor: theme.colors.neutral.background,
})

export const orderSummaryNonScrollableContainer = style({
  padding: theme.space[3],
  borderTop: `1px solid ${theme.colors.neutral.border}`,
})

export const orderSummaryNumberInput = style({
  maxWidth: '12.5rem',
  backgroundColor: theme.colors.neutral.background,
})

export const orderSummaryScrollableContainer = style({
  overflowY: 'scroll',
  padding: theme.space[3],
  minHeight: '10rem',
  height: '100%',
})

export const orderSummaryDetails = style({
  paddingLeft: theme.space[1],
})

export const orderSummaryCategory = style({
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.neutral.border}`,
      paddingBottom: theme.space[3],
    },
  },
})

export const orderSummaryAnchor = style({
  color: 'inherit',
  textDecoration: 'inherit',
  transition: 'color 250ms ease-out',
  selectors: {
    '&:hover': {
      color: theme.colors.info.text,
    },
  },
})

export const orderSummaryAnchorIcon = recipe({
  base: {
    position: 'absolute',
    opacity: 0,
    transform: `translateX(calc(-1 *${theme.space[2]}))`,

    transition: 'opacity 250ms ease-in-out',
    selectors: {
      [`${orderSummaryAnchor}:hover > &`]: {
        opacity: 1,
      },
    },
  },
  variants: {
    size: {
      small: {
        marginTop: theme.space['0.25'],
      },
      medium: {
        marginTop: theme.space['0.5'],
      },
    },
  },
})
