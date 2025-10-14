import { createVar, style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const widthVar = createVar()

export const wrapper = style({
  position: 'relative',
  marginLeft: '-100px',
  marginRight: '-100px',
})

export const beforeScroll = style({
  position: 'absolute',
  width: '100px',
  height: '100%',
  content: "''",
  background: `linear-gradient(-90deg, transparent, ${theme.colors.neutral.background})`,
  cursor: 'w-resize',
  zIndex: 'auto',
})

export const scrollableWrapper = style({
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  display: 'flex',
  padding: '0 100px',
  gap: theme.space['2'],
})

export const afterScroll = style({
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: '100px',
  height: '100%',
  content: "''",
  cursor: 'e-resize',
  zIndex: 'auto',
  background: `linear-gradient(-90deg, ${theme.colors.neutral.background}, transparent)`,
})

export const borderWrapper = style({
  display: 'flex',
  alignItems: 'stretch',
  width: widthVar,
  maxWidth: widthVar,
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  height: 'auto',
  cursor: 'grab',
  flexShrink: '0',
})
