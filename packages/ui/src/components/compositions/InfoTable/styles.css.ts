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
  color: theme.colors.neutral.textStrong,
  display: 'inline-flex',
  fontWeight: theme.typography.bodyStrong.weight,
  minWidth: 0,
})

const desc = style({
  color: theme.colors.neutral.text,
  margin: 0,
  minWidth: 0,
  width: '100%',
})

const cellText = style({
  display: 'inline-block',
  minWidth: 0,
  width: '100%',
})

globalStyle(`${cellText} > *`, {
  alignItems: 'center',
  display: 'inline-flex',
  marginRight: theme.space[1],
})

export const infoTableStyle = {
  dl,
  row,
  cell,
  term,
  desc,
  cellText,
}
