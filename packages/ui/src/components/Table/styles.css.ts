import { theme } from '@ultraviolet/themes'
import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import {
  headerCellMaxWidth,
  headerCellMinWidth,
  headerCellWidth,
  maxWidthCell,
  minWidthCell,
  widthCell,
} from './variables.css'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'

const colorChange = keyframes({
  '5%': {
    backgroundColor: theme.colors.primary.background,
  },
  '80%': {
    backgroundColor: theme.colors.primary.background,
  },
})

export const table = style({
  width: '100%',
  boxSizing: 'content-box',
  borderCollapse: 'collapse',
})

export const tableStripped = style({})
export const tableBordered = style({})

globalStyle(`${tableStripped} tbody tr:nth-of-type(even)`, {
  background: theme.colors.neutral.backgroundWeak,
})

globalStyle(`${tableBordered} tbody tr`, {
  borderBottom: `1px solid ${theme.colors.neutral.borderWeak}`,
})

export const tableCell = recipe({
  base: {
    display: 'table-cell',
    verticalAlign: 'middle',
    padding: theme.space[1],
    fontSize: theme.typography.bodySmall.fontSize,
    maxWidth: maxWidthCell,
    minWidth: minWidthCell,
    width: widthCell,
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    sentiment: {
      primary: {
        backgroundColor: theme.colors.primary.background,
      },
      secondary: { backgroundColor: theme.colors.secondary.background },
      danger: { backgroundColor: theme.colors.danger.background },
      info: { backgroundColor: theme.colors.info.background },
      success: { backgroundColor: theme.colors.success.background },
      warning: { backgroundColor: theme.colors.warning.background },
      neutral: { backgroundColor: theme.colors.neutral.background },
    },
  },
})

export const tableHeader = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
})

export const tableHeaderCell = recipe({
  base: {
    display: 'table-cell',
    verticalAlign: 'middle',
    padding: theme.space[1],
    width: headerCellWidth,
    maxWidth: headerCellMaxWidth,
    minWidth: headerCellMinWidth,
    selectors: {
      "&[role*='button']": {
        cursor: 'pointer',
        userSelect: 'none',
      },
    },
  },
  variants: {
    checked: {
      true: {
        selectors: {
          '&:first-of-type': {
            paddingLeft: theme.space[2],
          },
        },
      },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
  },
})

export const headerCellText = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.space[1],
})

export const tableExpandableWrapper = style({
  width: '100%',
  display: 'table-row',
  verticalAlign: 'middle',
  borderTop: `1px solid ${theme.colors.neutral.border}`,
  padding: theme.space[1],
  cursor: 'auto',
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
})

export const tableCheckboxContainer = style({
  display: 'flex',
  width: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
})

export const tableTrAnimation = style({
  animation: `${colorChange} 3s linear`,
})

export const tableSkeletonRow = style({ cursor: 'progress' })
export const tableSkeleton = style({ width: '80%', maxWidth: '100%' })
