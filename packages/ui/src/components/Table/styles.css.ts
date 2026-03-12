import { theme } from '@ultraviolet/themes'
import { keyframes, style } from '@vanilla-extract/css'
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

const table = style({
  borderCollapse: 'collapse',
  boxSizing: 'content-box',
  width: '100%',
})

const stripped = style({})
const bordered = style({})

const cell = recipe({
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

const header = recipe({
  base: {
    borderBottom: `1px solid ${theme.colors.neutral.border}`,
  },
  variants: {
    highlighted: {
      true: {
        background: theme.colors.neutral.backgroundWeak,
      },
    },
  },
  defaultVariants: {
    highlighted: false,
  },
})

const headerCell = recipe({
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

const headerCellText = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: theme.space[1],
})

const expandableWrapper = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: `0 0 ${theme.radii.default} ${theme.radii.default}`,
  borderTop: `1px solid ${theme.colors.neutral.border}`,
  cursor: 'auto',
  display: 'table-row',
  padding: theme.space[1],
  verticalAlign: 'middle',
  width: '100%',
})

const checkboxContainer = style({
  display: 'flex',
  width: theme.sizing[SELECTABLE_CHECKBOX_SIZE],
})

const trAnimation = style({
  animation: `${colorChange} 3s linear`,
})

const skeletonRow = style({ cursor: 'progress' })
const skeleton = style({ maxWidth: '100%', width: '80%' })
const row = style({
  selectors: {
    [`${stripped} tbody &:nth-of-type(even)`]: {
      background: theme.colors.neutral.backgroundWeak,
    },
    [`${bordered} tbody &`]: {
      borderBottom: `1px solid ${theme.colors.neutral.borderWeak}`,
    },
  },
})

export const tableStyle = {
  stripped,
  table,
  bordered,
  cell,
  header,
  headerCell,
  headerCellText,
  expandableWrapper,
  checkboxContainer,
  trAnimation,
  skeletonRow,
  skeleton,
  row,
}
