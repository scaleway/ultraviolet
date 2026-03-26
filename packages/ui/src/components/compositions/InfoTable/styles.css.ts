import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const rowWidth = createVar()

const dl = style({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.typography.body.fontSize,
  lineHeight: theme.typography.body.lineHeight,
  margin: 0,
  width: '100%',
})

const row = style({
  borderBottom: `1px ${theme.colors.neutral.border} solid`,
  paddingBlock: theme.space[2],
  selectors: {
    '&:first-of-type': {
      paddingTop: 0,
    },
    '&:last-of-type': {
      borderBottomColor: 'transparent',
      paddingBottom: 0,
    },
  },
  width: rowWidth,
})

const cell = style({
  selectors: {
    '&:not(:last-child)': {
      paddingRight: theme.space[2],
    },
  },
})

const term = style({
  alignItems: 'center',
  minWidth: 0,
  display: 'inline-flex',
  gap: theme.space[1],
})

const desc = style({
  color: theme.colors.neutral.text,
  margin: 0,
  minWidth: 0,
  width: '100%',
  maxWidth: '100%',
})

const descFlex = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.space[0.25],
})

const cellWithCopyButton = style({
  maxWidth: '100%',
  width: '100%',
  minWidth: 0,
})

globalStyle(`${desc} > *`, {
  marginRight: theme.space[1],
  minWidth: 0,
  maxWidth: '100%',
  width: 'fit-content',
  alignItems: 'center',
})

export const infoTableStyle = {
  dl,
  row,
  cell,
  term,
  desc,
  descFlex,
  cellWithCopyButton,
}
