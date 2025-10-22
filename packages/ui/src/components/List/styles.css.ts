import { theme } from '@ultraviolet/themes'
import {
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'
import { recipe } from '@vanilla-extract/recipes'
import { SENTIMENTS } from '../../theme'
import {
  maxWidthCell,
  maxWidthHeaderCell,
  minWidthCell,
  minWidthHeaderCell,
  paddingExpandableCell,
  widthCell,
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
  const base = {
    color: color.text,
    borderColor: color.border,
    backgroundColor: color.background,
  }
  if (sentiment === 'neutral') {
    return {
      ...base,
      selectors: {
        '&[data-expandable-content]': {
          borderColor: color.border,
        },
        '&:not([aria-disabled="true"]):hover': {
          bordercolor: theme.colors.primary.border,
          boxShadow: theme.shadows.hoverPrimary,
        },
      },
    }
  }

  return {
    ...base,
    selectors: {
      '&[data-expandable-content]': {
        borderColor: color.border,
      },
    },
  }
}

export const listContainer = style({
  minWidth: '100%',
  width: '100%',
  overflowX: 'auto',
})

export const list = style({
  width: '100%',
  boxSizing: 'content-box',
  gap: theme.space[1],
  borderSpacing: `0 ${theme.space[2]}`,
  position: 'relative',
})

export const listSortIcon = styleVariants({
  ascending: {
    transform: 'rotate(-180deg)',
    transition: 'transform 0.2s ease-in-out',
  },
  descending: {
    transition: 'transform 0.2s ease-in-out',
  },
})

export const listHeaderCell = style({
  display: 'table-cell',
  textAlign: 'left',
  verticalAlign: 'middle',
  fontSize: theme.typography.bodySmall.fontSize,
  fontWeight: theme.typography.bodySmall.fontWeight,
  fontFamily: theme.typography.bodySmall.fontFamily,
  color: theme.colors.neutral.text,
  gap: theme.space[1],
  padding: `0 ${theme.space[2]}`,
  width: widthHeaderCell,
  maxWidth: maxWidthHeaderCell,
  minWidth: minWidthHeaderCell,
  selectors: {
    "&[role*='button']": {
      cursor: 'pointer',
      userSelect: 'none',
    },
    '&[aria-sort]': {
      color: theme.colors.primary.text,
    },
  },
})

export const listHeaderRow = style({
  display: 'table-row,',
  verticalAlign: 'middle',
  padding: `0 ${theme.space[2]}`,
})

export const listNoPaddingHeaderCell = style({
  padding: 0,
  maxWidth: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
  selectors: {
    '&:first-of-type': {
      paddingLeft: theme.space[2],
    },
  },
})

export const listExpandableWrapper = style({
  width: '100%',
  display: 'table-row',
  verticalAlign: 'middle',
  cursor: 'auto',
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  transform: `translate3d(0, calc(-1 * ${theme.space[2]}), 0)`,
  position: 'relative',
})

globalStyle(
  `${listExpandableWrapper} > td, ${listExpandableWrapper} > td:first-child, ${listExpandableWrapper} > td:last-child`,
  {
    transition: 'box-shadow 200ms ease, border-color 200ms ease',
  },
)

globalStyle(`${listExpandableWrapper} > td`, {
  border: `1px solid ${theme.colors.neutral.border}`,
  borderTop: 'none',
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
})

globalStyle(`${listExpandableWrapper}[data-highlight="true"] > td`, {
  borderColor: theme.colors.primary.border,
})

export const listCheckboxInRange = style({})

globalStyle(`${listCheckboxInRange} rect`, {
  fill: theme.colors.neutral.backgroundHover,
  stroke: theme.colors.neutral.borderHover,
})

const listRowBase = style({
  display: 'table-row',
  verticalAlign: 'middle',
  position: 'relative',
  boxShadow: 'none',
  backgroundColor: theme.colors.neutral.background,
  fontSize: theme.typography.bodySmall.fontSize,
  columnGap: theme.space[2],
  selectors: {
    "&[role='button row']": {
      cursor: 'pointer',
    },
    "&[data-highlight='true']": {
      boxShadow: theme.shadows.hoverPrimary,
    },
    "&[aria-disabled='true']": {
      backgroundColor: theme.colors.neutral.backgroundDisabled,
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
  },
})

export const listRow = recipe({
  base: listRowBase,
  variants: {
    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        makeRowStyleSentiment(sentiment) as object,
      ]),
    ),
    highlightAnimation: {
      true: {
        animation: `${colorChange} 3s linear`,
      },
    },
  },
  defaultVariants: {
    sentiment: 'neutral',
    highlightAnimation: false,
  },
})

export const listCell = style({
  display: 'table-cell',
  verticalAlign: 'middle',
  height: theme.sizing[750],
  padding: `0 ${theme.space[2]}`,
  transition: 'box-shadow 200ms ease, border-color 200ms ease',
  borderTop: `1px solid ${theme.colors.neutral.border}`,
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
  width: widthCell,
  maxWidth: maxWidthCell,
  minWidth: minWidthCell,
  selectors: {
    [`${listRowBase}[aria-expanded="true"] > &`]: {
      borderTopColor: theme.colors.primary.border,
    },
    '&:first-child, &:last-child': {
      transition: 'box-shadow 200ms ease, border-color 200ms ease',
    },
    [`${listRowBase}:not([aria-disabled='true']):hover + ${listExpandableWrapper} > &`]:
      {
        borderColor: theme.colors.primary.border,
      },
    [`${listRowBase}[aria-expanded='true'] > &`]: {
      borderBottomColor: theme.colors.primary.border,
    },
  },
})

globalStyle(`${listRowBase} > td:first-child`, {
  borderLeft: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: ` ${theme.radii.default} 0 0 ${theme.radii.default}`,
})

globalStyle(`${listRowBase} > td:last-child`, {
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: `0 ${theme.radii.default} ${theme.radii.default} 0`,
})

globalStyle(
  `${listRowBase}:not([aria-disabled='true']):hover > td, ${listRowBase}:not([aria-disabled='true']):hover > td:first-child, ${listRowBase}:not([aria-disabled='true']):hover > td:last-child`,
  {
    borderColor: theme.colors.primary.border,
  },
)

globalStyle(`${listRowBase}[aria-expanded='true'] > td:first-child`, {
  borderLeft: `1px solid ${theme.colors.primary.border}`,
  borderRadius: `${theme.radii.default} 0 0 0`,
})

globalStyle(`${listRowBase}[aria-expanded='true'] > td:last-child`, {
  borderRight: `1px solid ${theme.colors.primary.border}`,
  borderRadius: `0 ${theme.radii.default} 0 0`,
})

globalStyle(
  `${listRowBase}[data-highlight='true'] > td, ${listRowBase}[data-highlight='true'] > td:first-child, ${listRowBase}[data-highlight='true'] > td:last-child`,
  {
    borderColor: theme.colors.primary.border,
  },
)

export const listCheckboxContainer = style({ display: 'flex' })

export const listNoPaddingCell = style({
  padding: 0,
  maxWidth: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
  selectors: {
    '&:first-of-type': {
      paddingLeft: theme.space[2],
    },
  },
})

export const listExpandableCell = style({
  padding: paddingExpandableCell,
})

export const listLoadingRow = style({
  cursor: 'progress',
})

export const listSkeleton = style({
  width: '80%',
  maxWidth: '100%',
  alignItems: 'start',
  justifyContent: 'center',
})
