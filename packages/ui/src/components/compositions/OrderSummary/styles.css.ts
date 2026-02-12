import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const orderSummaryContainer = style({
  '@media': {
    '(min-width: 1440px)': {
      minWidth: '27.5rem',
    },
  },
  backgroundColor: theme.colors.neutral.backgroundWeak,
  height: '100%',
  minWidth: '20rem',
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
  borderTop: `1px solid ${theme.colors.neutral.border}`,
  padding: theme.space[3],
})

export const orderSummaryNumberInput = style({
  backgroundColor: theme.colors.neutral.background,
  maxWidth: '12.5rem',
})

export const orderSummaryScrollableContainer = style({
  height: '100%',
  minHeight: '10rem',
  overflowY: 'scroll',
  padding: theme.space[3],
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
  selectors: {
    '&:hover': {
      color: theme.colors.info.text,
    },
  },
  textDecoration: 'inherit',
  transition: 'color 250ms ease-out',
})

export const orderSummaryAnchorIcon = recipe({
  base: {
    opacity: 0,
    position: 'absolute',
    selectors: {
      [`${orderSummaryAnchor}:hover > &`]: {
        opacity: 1,
      },
    },
    transform: `translateX(calc(-1 *${theme.space[2]}))`,

    transition: 'opacity 250ms ease-in-out',
  },
  variants: {
    size: {
      medium: {
        marginTop: theme.space['0.5'],
      },
      small: {
        marginTop: theme.space['0.25'],
      },
    },
  },
})

export const orderSummaryTotalPrice = styleVariants({
  priceInformation: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[1],
  },
  default: {},
})
