import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { APP_MAX_WIDTH } from '../constants'

export const borderedBox = style({
  display: 'grid',
  gridTemplateColumns: 'fit-content(20%) 3fr',
  gap: theme.space[2],
  height: 'auto',
  minWidth: 350,
})

export const copyBoxBase = style({
  background: theme.colors.neutral.backgroundStrong,
  padding: `${theme.space['2']} ${theme.space['3']}`,
  borderRadius: theme.radii.default,
})

globalStyle(`${copyBoxBase} span`, {
  background: theme.colors.neutral.backgroundStrong,
})

globalStyle(`${copyBoxBase} .react-syntax-highlighter-line-number`, {
  fontStyle: 'normal !important',
})

export const footer = style({
  boxShadow: '0 0 8px 2px rgba(178, 182, 195, 0.37)',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.space[4],
})

export const footerRow = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.space[4],
  flex: 1,
  maxWidth: `${APP_MAX_WIDTH}px`,
})

export const disclaimerContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[2],
  '@media': {
    '(max-width: 1280px)': {
      flexDirection: 'row-reverse',
    },
  },
})

export const header = style({
  minHeight: 60,
  height: 60,
  top: 0,
  backgroundColor: theme.colors.neutral.backgroundWeak,
  boxShadow: '0 0 8px 2px rgba(178, 182, 195, 0.37)',
  display: 'flex',
  alignItems: 'center',
  minWidth: 10,
  padding: '8px 10px',
  width: '100%',
  justifyContent: 'center',
  position: 'sticky',
  zIndex: 1,
})

export const horizontalStack = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
})

export const headerRow = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: `${APP_MAX_WIDTH}px`,
})

export const logo = style({
  fill: theme.colors.primary.text,
})
