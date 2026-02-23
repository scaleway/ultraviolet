import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const widthVar = createVar()

const wrapper = style({
  marginLeft: '-100px',
  marginRight: '-100px',
  position: 'relative',
  width: '100%',
})

const beforeScroll = style({
  background: `linear-gradient(-90deg, transparent, ${theme.colors.neutral.background})`,
  content: "''",
  cursor: 'w-resize',
  height: '100%',
  position: 'absolute',
  width: '100px',
  zIndex: 'auto',
})

const scrollableWrapper = style({
  display: 'flex',
  gap: theme.space['2'],
  overflowX: 'scroll',
  overflowY: 'hidden',
  padding: '0 100px',
  whiteSpace: 'nowrap',
})

const afterScroll = style({
  background: `linear-gradient(-90deg, ${theme.colors.neutral.background}, transparent)`,
  bottom: '0',
  content: "''",
  cursor: 'e-resize',
  height: '100%',
  position: 'absolute',
  right: '0',
  width: '100px',
  zIndex: 'auto',
})

const borderWrapper = style({
  alignItems: 'stretch',
  cursor: 'grab',
  display: 'flex',
  flexShrink: '0',
  height: 'auto',
  maxWidth: widthVar,
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  width: widthVar,
})

export const carouselStyle = {
  wrapper,
  beforeScroll,
  scrollableWrapper,
  afterScroll,
  borderWrapper,
}
