import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { calendarContentWrapper } from '../styles.css'

export const dateinputPopup = style([
  calendarContentWrapper(),
  {
    boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
    width: '100%',
  },
])

export const capitalizedText = style({ textTransform: 'capitalize' })
export const capitalizedTextDay = style([
  capitalizedText,
  { display: 'inline-block' },
])

export const dayMonth = style({
  color: theme.colors.neutral.textWeak,
  height: theme.sizing[312],
  padding: 0,
  selectors: {
    "&[aria-label='in-range']": {
      backgroundColor: theme.colors.primary.background,
      color: theme.colors.primary.textHover,
    },
    '&[aria-label="in-range"]:hover': {
      backgroundColor: theme.colors.primary.backgroundStrongHover,
      color: theme.colors.neutral.textStronger,
    },
    '&[aria-label="not-current"], &:disabled': {
      color: theme.colors.neutral.textDisabled,
    },
    '&[aria-label="selected"]': {
      color: theme.colors.neutral.textStronger,
    },
  },
  width: '100%',
})
