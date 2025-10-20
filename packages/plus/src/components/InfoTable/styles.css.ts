import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const rowWidth = createVar()

export const dl = style({
  display: 'flex',
  fontSize: theme.typography.body.fontSize,
  lineHeight: theme.typography.body.lineHeight,
  flexDirection: 'column',
  alignItems: 'start',
  margin: 0,
  width: '100%',
})

export const infoTableRow = style({
  width: rowWidth,
  borderBottom: `1px ${theme.colors.neutral.border} solid`,
  paddingBlock: theme.space[2],
  selectors: {
    '&:first-of-type': {
      paddingTop: 0,
    },
    '&:last-of-type': {
      paddingBottom: 0,
      borderBottomColor: 'transparent',
    },
  },
})

globalStyle(`${infoTableRow} > *:not(:last-child)`, {
  paddingRight: theme.space[2],
})

export const term = style({
  fontWeight: theme.typography.bodyStrong.weight,
  color: theme.colors.neutral.textStrong,
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 0,
})

export const desc = style({
  color: theme.colors.neutral.text,
  margin: 0,
  minWidth: 0,
  width: '100%',
})

export const cellText = style({
  display: 'block',
  minWidth: 0,
  width: '100%',
})

globalStyle(`${cellText} > *`, {
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: theme.space[1],
})
