import { theme } from '@ultraviolet/themes'
import { globalStyle, keyframes, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SENTIMENTS } from '../../../theme'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'
import {
  listCellPadding,
  maxWidthCell,
  maxWidthChildrenCell,
  maxWidthHeaderCell,
  minWidthCell,
  minWidthChildrenCell,
  minWidthHeaderCell,
  paddingExpandableCell,
  widthCell,
  widthChildrenCell,
  widthHeaderCell,
} from './variables.css'

const colorChange = keyframes({
  '5%': {
    backgroundColor: theme.colors.primary.background,
  },
  '80%': {
    backgroundColor: theme.colors.primary.background,
  },
})

function makeRowStyleSentiment(sentiment: (typeof SENTIMENTS)[number]) {
  const color = theme.colors[sentiment]
  const borderHoverColor = sentiment === 'neutral' ? theme.colors.primary.border : color.border

  return {
    backgroundColor: color.background,
    borderColor: theme.colors.neutral.border,
    color: color.text,
    selectors: {
      '&:not([aria-disabled="true"]):is(:focus-within, :hover, [aria-expanded="true"], [data-highlight="true"])': {
        borderColor: borderHoverColor,
      },
      ...(sentiment === 'neutral'
        ? {
            '&:not([aria-disabled="true"]):hover': {
              boxShadow: theme.shadows.hoverPrimary,
            },
          }
        : {}),
    },
  }
}

const container = style({
  minWidth: '100%',
  overflowX: 'auto',
  width: '100%',
})

const list = style({
  borderSpacing: `0 ${theme.space[2]}`,
  boxSizing: 'content-box',
  gap: theme.space[1],
  position: 'relative',
  width: '100%',
})

const sortIcon = styleVariants({
  ascending: {
    transform: 'rotate(-180deg)',
    transition: 'transform 0.2s ease-in-out',
  },
  descending: {
    transition: 'transform 0.2s ease-in-out',
  },
})

const headerCell = style({
  color: theme.colors.neutral.text,
  display: 'table-cell',
  fontFamily: theme.typography.bodySmall.fontFamily,
  fontSize: theme.typography.bodySmall.fontSize,
  fontWeight: theme.typography.bodySmall.fontWeight,
  gap: theme.space[1],
  maxWidth: maxWidthHeaderCell,
  minWidth: minWidthHeaderCell,
  padding: `0 ${theme.space[2]}`,
  selectors: {
    '&[aria-sort]': {
      color: theme.colors.primary.text,
    },
    "&[role*='button']": {
      cursor: 'pointer',
      userSelect: 'none',
    },
  },
  textAlign: 'left',
  verticalAlign: 'middle',
  width: widthHeaderCell,
})

const headerRow = style({
  display: 'table-row,',
  padding: `0 ${theme.space[2]}`,
  verticalAlign: 'middle',
})

const noPaddingHeaderCell = style({
  maxWidth: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
  padding: 0,
  selectors: {
    '&:first-of-type': {
      paddingLeft: theme.space[2],
    },
  },
})

const expandableWrapper = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  cursor: 'auto',
  display: 'table-row',
  position: 'relative',
  transform: `translate3d(0, calc(-1 * ${theme.space[2]}), 0)`,
  verticalAlign: 'middle',
  width: '100%',
})

const checkboxInRange = style({})

const listRowBase = style({
  backgroundColor: theme.colors.neutral.background,
  boxShadow: 'none',
  columnGap: theme.space[2],
  display: 'table-row',
  fontSize: theme.typography.bodySmall.fontSize,
  position: 'relative',
  selectors: {
    "&[aria-disabled='true']": {
      backgroundColor: theme.colors.neutral.backgroundDisabled,
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
    "&[data-highlight='true']": {
      boxShadow: theme.shadows.hoverPrimary,
    },
    "&[role='button row']": {
      cursor: 'pointer',
    },
  },
  verticalAlign: 'middle',
})

const row = recipe({
  base: listRowBase,
  defaultVariants: {
    highlightAnimation: false,
    sentiment: 'neutral',
  },
  variants: {
    highlightAnimation: {
      true: {
        animation: `${colorChange} 3s linear`,
      },
    },
    sentiment: Object.fromEntries(SENTIMENTS.map(sentiment => [sentiment, makeRowStyleSentiment(sentiment) as object])),
  },
})

const cell = style({
  borderColor: 'inherit',
  borderStyle: 'solid',
  borderWidth: '1px 0',
  display: 'table-cell',
  height: theme.sizing[750],
  maxWidth: maxWidthCell,
  minWidth: minWidthCell,
  padding: `0 ${listCellPadding}`,
  selectors: {
    '&:first-child, &:last-child': {
      transition: 'box-shadow 200ms ease, border-color 200ms ease',
    },
    '&:last-child': {
      borderRadius: `0 ${theme.radii.default} ${theme.radii.default} 0`,
      borderRightWidth: '1px',
    },
    [`${listRowBase}[aria-expanded='true'] > &:last-child`]: {
      borderRadius: `0 ${theme.radii.default} 0 0`,
    },
    '&:first-child': {
      borderLeftWidth: '1px',
      borderRadius: ` ${theme.radii.default} 0 0 ${theme.radii.default}`,
    },
    [`${listRowBase}[aria-expanded='true'] > &:first-child`]: {
      borderRadius: `${theme.radii.default} 0 0 0`,
    },
    [`${listRowBase}[data-highlight='true'] > &:first-child`]: {
      borderRadius: `${theme.radii.default} 0 0 0`,
    },
  },
  transition: 'box-shadow 200ms ease, border-color 200ms ease',
  verticalAlign: 'middle',
  width: widthCell,
})

const cellStrict = style({})

globalStyle(`${cellStrict} > *`, {
  maxWidth: maxWidthChildrenCell,
  minWidth: minWidthChildrenCell,
  width: widthChildrenCell,
})

const checkboxContainer = style({ display: 'flex' })

const noPaddingCell = style({
  maxWidth: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
  padding: 0,
  selectors: {
    '&:first-of-type': {
      paddingLeft: theme.space[2],
    },
  },
})

const loadingRow = style({
  cursor: 'progress',
})

const skeleton = style({
  alignItems: 'flex-start',
  justifyContent: 'center',
  maxWidth: '100%',
  width: '80%',
})

const expandableButton = style({
  minWidth: theme.sizing[400],
})

const expandableCell = style({
  padding: paddingExpandableCell,
  selectors: {
    [`${expandableWrapper} > &, ${expandableWrapper} > &:first-child, ${expandableWrapper} > &:last-child`]: {
      transition: 'box-shadow 200ms ease, border-color 200ms ease',
    },
    [`${expandableWrapper} > &`]: {
      borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
      borderStyle: 'solid',
      borderWidth: '0 1px 1px',
    },
  },
})

const expandableRowSentiment = recipe({
  base: {
    borderColor: theme.colors.neutral.border,
  },
  defaultVariants: {
    sentiment: 'neutral',
  },
  variants: {
    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        {
          selectors: {
            [`${listRowBase}:not([aria-disabled='true']):is(:hover, [aria-expanded='true']) + &, &[data-highlight='true']`]:
              {
                borderColor: sentiment === 'neutral' ? theme.colors.primary.border : theme.colors[sentiment].border,
              },
          },
        },
      ]),
    ),
  },
})

export const listStyle = {
  container,
  list,
  sortIcon,
  headerCell,
  headerRow,
  expandableWrapper,
  expandableRowSentiment,
  checkboxInRange,
  row,
  cell,
  cellStrict,
  checkboxContainer,
  noPaddingCell,
  loadingRow,
  skeleton,
  expandableButton,
  expandableCell,
  noPaddingHeaderCell,
}
