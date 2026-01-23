import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const rowWidth = createVar()

export const dl = style({
  alignItems: 'start',
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.typography.body.fontSize,
  lineHeight: theme.typography.body.lineHeight,
  margin: 0,
  width: '100%',
})

export const infoTableRow = style({
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

export const infoTableCell = style({
  selectors: {
    '&:not(:last-child)': {
      paddingRight: theme.space[2],
    },
  },
})

export const term = style({
  alignItems: 'center',
  color: theme.colors.neutral.textStrong,
  display: 'inline-flex',
  fontWeight: theme.typography.bodyStrong.weight,
  minWidth: 0,
})

export const desc = style({
  color: theme.colors.neutral.text,
  margin: 0,
  minWidth: 0,
  width: '100%',
})

export const cellText = style({
  display: 'inline-block',
  minWidth: 0,
  width: '100%',
})

globalStyle(`${cellText} > *`, {
  alignItems: 'center',
  display: 'inline-flex',
  marginRight: theme.space[1],
})
