import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { MAX_CELL_WIDTH, PRICE_MAX_CELL_WIDTH } from './constants'

export const paddingLeftCell = createVar()
export const overlayMarginVar = createVar()

export const estimateCostImage = style({
  marginRight: theme.space[1],
  width: 15,
})

const estimateCostTableBase = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  width: '100%',
})

export const estimateCostTable = styleVariants({
  noTotal: [estimateCostTableBase, { borderRadius: '4px' }],
  total: [estimateCostTableBase, { borderRadius: '4px 4px 0 4px' }],
})

export const estimateCostFeesTable = style([
  estimateCostTableBase,
  { borderRadius: '4px', marginTop: theme.space[2] },
])

export const estimateCostPriceColumn = style({
  backgroundColor: theme.colors.neutral.background,
})

export const estimateCostPriceCell = style({
  backgroundColor: theme.colors.neutral.backgroundWeak,
  borderLeft: `1px solid ${theme.colors.neutral.border}`,
  minWidth: 126,
  width: PRICE_MAX_CELL_WIDTH,
})

export const estimateCostCell = recipe({
  base: {
    minWidth: 230,
    paddingLeft: paddingLeftCell,
    paddingRight: theme.space[2],
    position: 'relative',
    width: MAX_CELL_WIDTH,
  },
  variants: {
    hasBorder: {
      true: {
        selectors: {
          '&:before': {
            borderBottom: `1px solid ${theme.colors.neutral.border}`,
            bottom: 0,
            content: "''",
            height: 1,
            left: 0,
            marginLeft: theme.space[2],
            position: 'absolute',
            width: 'calc(100% - 32px)',
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
  backgroundColor: theme.colors.primary.background,
  borderColor: theme.colors.neutral.border,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderRight: 'none',
  borderStyle: 'solid',
  borderWidth: '0 1px 1px 1px',
  height: theme.sizing[700],
  minWidth: 126,
  width: PRICE_MAX_CELL_WIDTH,
})

export const estimateCostEmptyTable = style({
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  margin: 0,
  width: '100%',
})

export const estimateCostTitle = style({
  alignItems: 'center',
  color: theme.colors.neutral.text,
  display: 'flex',
  fontSize: 18,
  fontWeight: 500,
  margin: 0,
  padding: theme.space[2],
})

export const estimateCostEmptyCell = style({ width: MAX_CELL_WIDTH })

export const estimateCostTimeCell = style({
  alignItems: 'start',
  float: 'right',
  maxWidth: 200,
  padding: theme.space[2],
  textAlign: 'left',
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
    borderLeft: `1px solid ${theme.colors.neutral.border}`,
    minWidth: 200,
    padding: '0 24px',
    selectors: {
      '&:first-of-type, &:last-child': {
        border: 0,
      },
    },
  },
  variants: {
    hideFromOverlay: {
      true: {
        display: 'none',
      },
    },
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
  },
})

export const estimateCostBadge = style({
  display: 'inline-block',
  fontSize: 12,
  height: theme.sizing[300],
  lineHeight: 18,
  marginRight: theme.space[1],
})

export const estimatecostFeesText = style({
  marginTop: theme.space[3],
})

export const estimateCostText = styleVariants({
  beta: {
    marginLeft: theme.space[2],
    textAlign: 'right',
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
    backgroundColor: theme.colors.neutral.background,
    display: 'flex',
    height: 120,
    justifyContent: 'center',
    left: 0,
    margin: overlayMarginVar,
    position: 'fixed',
    right: 0,
    transition: 'bottom 0.3s, box-shadow 0.3s',
    zIndex: 1,
  },
  variants: {
    inView: {
      false: {
        bottom: 0,
        boxShadow: theme.shadows.defaultShadow,
      },
      true: {
        bottom: '-120px',
        boxShadow: '0',
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
  minWidth: 158,
  padding: '12px 0',
})

export const estimateCostContent = styleVariants({
  compact: {
    display: 'none',
  },
  default: {},
})

export const estimateCostCompact = style({
  background: theme.colors.neutral.backgroundWeak,
  padding: theme.space[2],
})

export const estimateCostCompactText = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.space[1],
  justifyContent: 'center',
})
