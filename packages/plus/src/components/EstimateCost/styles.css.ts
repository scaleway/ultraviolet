import { theme } from '@ultraviolet/themes'
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { MAX_CELL_WIDTH, PRICE_MAX_CELL_WIDTH } from './constants'
import { recipe } from '@vanilla-extract/recipes'

export const paddingLeftCell = createVar()
export const overlayMarginVar = createVar()

export const estimateCostImage = style({
  width: 15,
  marginRight: theme.space[1],
})

const estimateCostTableBase = style({
  width: '100%',
  border: `1px solid ${theme.colors.neutral.border}`,
})

export const estimateCostTable = styleVariants({
  total: [estimateCostTableBase, { borderRadius: '4px 4px 0 4px' }],
  noTotal: [estimateCostTableBase, { borderRadius: '4px' }],
})

export const estimateCostFeesTable = style([
  estimateCostTableBase,
  { borderRadius: '4px', marginTop: theme.space[2] },
])

globalStyle(`${estimateCostTableBase} > *`, {
  marginTop: 0,
})

globalStyle(`${estimateCostTableBase} > * + *`, {
  marginTop: theme.space[2],
})

export const estimateCostPriceColumn = style({
  backgroundColor: theme.colors.neutral.background,
})

export const estimateCostPriceCell = style({
  borderLeft: `1px solid ${theme.colors.neutral.border}`,
  backgroundColor: theme.colors.neutral.backgroundWeak,
  width: PRICE_MAX_CELL_WIDTH,
  minWidth: 126,
})

export const estimateCostCell = recipe({
  base: {
    paddingRight: theme.space[2],
    position: 'relative',
    width: MAX_CELL_WIDTH,
    minWidth: 230,
    paddingLeft: paddingLeftCell,
  },
  variants: {
    hasBorder: {
      true: {
        selectors: {
          '&:before': {
            content: "''",
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 1,
            width: 'calc(100% - 32px)',
            marginLeft: theme.space[2],
            borderBottom: `1px solid ${theme.colors.neutral.border}`,
          },
        },
      },
    },
    primary: {
      true: {
        background: theme.colors.primary.background,
      },
    },
  },
})

export const estimateCostTotalPriceCell = style({
  borderColor: theme.colors.neutral.border,
  borderStyle: 'solid',
  borderWidth: '0 1px 1px 1px',
  borderRight: 'none',
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  height: theme.sizing[700],
  backgroundColor: theme.colors.primary.background,
  width: PRICE_MAX_CELL_WIDTH,
  minWidth: 126,
})

export const estimateCostEmptyTable = style({
  margin: 0,
  width: '100%',
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
})

export const estimateCostTitle = style({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  fontSize: 18,
  color: theme.colors.neutral.text,
  fontWeight: 500,
  padding: theme.space[2],
})

export const estimateCostEmptyCell = style({ width: MAX_CELL_WIDTH })

export const estimateCostTimeCell = style({
  maxWidth: 200,
  padding: theme.space[2],
  alignItems: 'start',
  textAlign: 'left',
  float: 'right',
})

const estimateCostBadgeBetaBase = style({
  position: 'absolute',
  top: 'calc(50% - 16px)',
})
export const estimateCostBadgeBeta = styleVariants({
  long: [estimateCostBadgeBetaBase, { marginLeft: '-185px' }],
  short: [estimateCostBadgeBetaBase, { marginLeft: '-115px' }],
})

export const estimateCostOverlayRow = recipe({
  base: {
    minWidth: 200,
    padding: '0 24px',
    borderLeft: `1px solid ${theme.colors.neutral.border}`,
    selectors: {
      '&:first-of-type, &:last-child': {
        border: 0,
      },
    },
  },
  variants: {
    isFirstElement: {
      true: {
        border: 0,
      },
    },
    shouldBeHidden: {
      true: {
        '@media': {
          '(max-width: 1800px)': { display: 'none' },
        },
      },
    },
    hideFromOverlay: {
      true: {
        display: 'none',
      },
    },
  },
})

export const estimateCostBadge = style({
  display: 'inline-block',
  height: theme.sizing[300],
  lineHeight: 18,
  fontSize: 12,
  marginRight: theme.space[1],
})

export const estimatecostFeesText = style({
  marginTop: theme.space[3],
})

export const estimateCostText = styleVariants({
  beta: {
    textAlign: 'right',
    marginLeft: theme.space[2],
  },
  notBeta: {
    textAlign: 'right',
  },
})

export const estimateCostCalculatorIcon = style({ marginRight: theme.space[1] })

export const estimateCostPriceCellContent = style({
  padding: 0,
})

export const estimateCostOverlayContainer = recipe({
  base: {
    position: 'fixed',
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: theme.colors.neutral.background,
    margin: overlayMarginVar,
    display: 'flex',
    justifyContent: 'center',
    transition: 'bottom 0.3s, box-shadow 0.3s',
    zIndex: 1,
  },
  variants: {
    inView: {
      true: {
        bottom: '-120px',
        boxShadow: '0',
      },
      false: {
        bottom: 0,
        boxShadow: theme.shadows.defaultShadow,
      },
    },
  },
})

export const estimateCostList = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  listStyle: 'none',
  margin: 0,
  padding: `${theme.space[3]} 0`,
})

export const estimateCostSideItem = style({
  display: 'flex',
  padding: '12px 0',
  minWidth: 158,
})
