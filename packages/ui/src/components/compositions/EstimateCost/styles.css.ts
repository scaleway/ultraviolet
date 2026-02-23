import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import {
  badgeItem,
  div,
  estimateCostImage,
  estimateCostMaxWidthText,
  itemResourceName,
  leftSide,
  lineThrough,
  maxWidthText,
  numberInput,
  regular,
  resourceName,
  strong,
  textItem,
  tooltip,
  tr,
} from './Components/components.css'
import { MAX_CELL_WIDTH, PRICE_MAX_CELL_WIDTH } from './constants'

export const paddingLeftCell = createVar()
export const overlayMarginVar = createVar()

const image = style({
  marginRight: theme.space[1],
  width: 15,
})

const tableBase = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  width: '100%',
})

const table = styleVariants({
  noTotal: [tableBase, { borderRadius: '4px' }],
  total: [tableBase, { borderRadius: '4px 4px 0 4px' }],
})

const feesTable = style([
  tableBase,
  { borderRadius: '4px', marginTop: theme.space[2] },
])

const priceColumn = style({
  backgroundColor: theme.colors.neutral.background,
})

const priceCell = style({
  backgroundColor: theme.colors.neutral.backgroundWeak,
  borderLeft: `1px solid ${theme.colors.neutral.border}`,
  minWidth: 126,
  width: PRICE_MAX_CELL_WIDTH,
})

const cell = recipe({
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

const totalPriceCell = style({
  backgroundColor: theme.colors.primary.background,
  borderColor: theme.colors.neutral.border,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderRight: 'none',
  borderStyle: 'solid',
  borderWidth: '0 0 1px 1px',
  height: theme.sizing[700],
  minWidth: 126,
  width: PRICE_MAX_CELL_WIDTH,
})

const emptyTable = style({
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  margin: 0,
  width: '100%',
})

const title = style({
  alignItems: 'center',
  color: theme.colors.neutral.text,
  display: 'flex',
  fontSize: 18,
  fontWeight: 500,
  margin: 0,
  padding: theme.space[2],
})

const emptyCell = style({ width: MAX_CELL_WIDTH })

const timeCell = style({
  alignItems: 'flex-start',
  float: 'right',
  maxWidth: 200,
  padding: theme.space[2],
  textAlign: 'left',
})

const badgeBetaBase = style({
  position: 'absolute',
  top: 'calc(50% - 16px)',
})

const badgeBeta = styleVariants({
  long: [badgeBetaBase, { marginLeft: '-185px' }],
  short: [badgeBetaBase, { marginLeft: '-115px' }],
})

const overlayRow = recipe({
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

const badge = style({
  display: 'inline-block',
  fontSize: 12,
  height: theme.sizing[300],
  lineHeight: 18,
  marginRight: theme.space[1],
})

const feesText = style({
  marginTop: theme.space[3],
})

const text = recipe({
  base: {
    textAlign: 'right',
  },
  variants: {
    beta: {
      true: {
        marginLeft: theme.space[2],
      },
    },
  },
})

const calculatorIcon = style({ marginRight: theme.space[1] })

const priceCellContent = style({
  padding: 0,
})

const overlayContainer = recipe({
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

const list = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  listStyle: 'none',
  margin: 0,
  padding: `${theme.space[3]} 0`,
})

const sideItem = style({
  display: 'flex',
  minWidth: 158,
  padding: '12px 0',
})

const content = styleVariants({
  compact: {
    display: 'none',
  },
  default: {},
})

const compact = style({
  background: theme.colors.neutral.backgroundWeak,
  padding: theme.space[2],
})

const compactText = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.space[1],
  justifyContent: 'center',
})

export const estimateCostStyle = {
  image,
  tableBase,
  table,
  feesTable,
  priceColumn,
  priceCell,
  cell,
  totalPriceCell,
  emptyTable,
  title,
  emptyCell,
  timeCell,
  badgeBeta,
  overlayRow,
  badge,
  feesText,
  text,
  calculatorIcon,
  priceCellContent,
  overlayContainer,
  list,
  sideItem,
  content,
  compact,
  compactText,
  maxWidthText,
  estimateCostImage,
  tr,
  div,
  leftSide,
  itemResourceName,
  resourceName,
  badgeItem,
  textItem,
  estimateCostMaxWidthText,
  tooltip,
  lineThrough,
  regular,
  strong,
  numberInput,
}
