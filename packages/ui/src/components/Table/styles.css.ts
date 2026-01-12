import { theme } from '@ultraviolet/themes'
import { globalStyle, keyframes, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'
import {
  headerCellMaxWidth,
  headerCellMinWidth,
  headerCellWidth,
  maxWidthCell,
  minWidthCell,
  widthCell,
} from './variables.css'

const colorChange = keyframes({
  '5%': {
    backgroundColor: theme.colors.primary.background,
  },
  '80%': {
    backgroundColor: theme.colors.primary.background,
  },
})

export const table = style({
  borderCollapse: 'collapse',
  boxSizing: 'content-box',
  width: '100%',
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
    fontSize: theme.typography.bodySmall.fontSize,
    maxWidth: maxWidthCell,
    minWidth: minWidthCell,
    padding: theme.space[1],
    verticalAlign: 'middle',
    width: widthCell,
  },
  variants: {
    align: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
    },
    sentiment: {
      danger: { backgroundColor: theme.colors.danger.background },
      info: { backgroundColor: theme.colors.info.background },
      neutral: { backgroundColor: theme.colors.neutral.background },
      primary: {
        backgroundColor: theme.colors.primary.background,
      },
      secondary: { backgroundColor: theme.colors.secondary.background },
      success: { backgroundColor: theme.colors.success.background },
      warning: { backgroundColor: theme.colors.warning.background },
    },
  },
})

export const tableHeader = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
})

export const tableHeaderCell = recipe({
  base: {
    display: 'table-cell',
    maxWidth: headerCellMaxWidth,
    minWidth: headerCellMinWidth,
    padding: theme.space[1],
    selectors: {
      "&[role*='button']": {
        cursor: 'pointer',
        userSelect: 'none',
      },
    },
    verticalAlign: 'middle',
    width: headerCellWidth,
  },
  variants: {
    align: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
    },
    checked: {
      true: {
        selectors: {
          '&:first-of-type': {
            paddingLeft: theme.space[2],
          },
        },
      },
    },
  },
})

export const headerCellText = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.space[1],
})

export const tableExpandableWrapper = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderTop: `1px solid ${theme.colors.neutral.border}`,
  cursor: 'auto',
  display: 'table-row',
  padding: theme.space[1],
  verticalAlign: 'middle',
  width: '100%',
})

export const tableCheckboxContainer = style({
  display: 'flex',
  width: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
})

export const tableTrAnimation = style({
  animation: `${colorChange} 3s linear`,
})

export const tableSkeletonRow = style({ cursor: 'progress' })
export const tableSkeleton = style({ maxWidth: '100%', width: '80%' })
