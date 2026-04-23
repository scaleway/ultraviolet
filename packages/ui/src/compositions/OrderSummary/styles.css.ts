import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const container = recipe({
  base: {
    '@media': {
      '(min-width: 1440px)': {
        minWidth: '27.5rem',
      },
    },
    height: '100%',
    minWidth: '20rem',
  },
  variants: {
    backgroundProminence: {
      default: {
        backgroundColor: theme.colors.neutral.backgroundWeak,
      },
      strong: {
        backgroundColor: theme.colors.neutral.background,
      },
    },
  },
  defaultVariants: {
    backgroundProminence: 'default',
  },
})

const orderSummaryHeaderContainerBase = style({
  height: theme.sizing[900],
  padding: theme.space[3],
  paddingBottom: theme.space[2],
})

const headerContainer = styleVariants({
  hideDetails: [orderSummaryHeaderContainerBase],
  showDetails: [
    orderSummaryHeaderContainerBase,
    { borderBottom: `1px solid ${theme.colors.neutral.border}` },
  ],
})

const stackBackground = style({
  backgroundColor: theme.colors.neutral.background,
})

const nonScrollableContainer = recipe({
  variants: {
    compact: {
      false: {
        borderTop: `1px solid ${theme.colors.neutral.border}`,
        padding: theme.space[3],
      },
      true: {
        padding: theme.space[2],
      },
    },
  },
})

const numberInput = style({
  backgroundColor: theme.colors.neutral.background,
  maxWidth: '12.5rem',
})

const scrollableContainer = style({
  height: '100%',
  minHeight: '10rem',
  overflowY: 'scroll',
  padding: theme.space[3],
})

const details = style({
  paddingLeft: theme.space[1],
})

const category = style({
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.neutral.border}`,
      paddingBottom: theme.space[3],
    },
  },
})

const anchor = style({
  color: 'inherit',
  selectors: {
    '&:hover': {
      color: theme.colors.info.text,
    },
  },
  textDecoration: 'inherit',
  transition: 'color 250ms ease-out',
})

const anchorIcon = recipe({
  base: {
    opacity: 0,
    position: 'absolute',
    selectors: {
      [`${anchor}:hover > &`]: {
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

const totalPrice = styleVariants({
  priceInformation: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[1],
  },
  default: {},
})

const compactTotalPrice = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
})

export const orderSummaryStyle = {
  anchorIcon,
  container,
  headerContainer,
  stackBackground,
  nonScrollableContainer,
  scrollableContainer,
  details,
  category,
  anchor,
  totalPrice,
  numberInput,
  compactTotalPrice,
}
