import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { calendarContentWrapper } from '../styles.css'

export const dateinputPopup = style([
  calendarContentWrapper(),
  {
    width: '100%',
    boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  },
])

export const capitalizedText = style({ textTransform: 'capitalize' })
export const capitalizedTextDay = style([
  capitalizedText,
  { display: 'inline-block' },
])

export const dayMonth = style({
  height: theme.sizing[312],
  width: '100%',
  padding: 0,
  color: theme.colors.neutral.textWeak,
  selectors: {
    "&[aria-label='in-range']": {
      color: theme.colors.primary.textHover,
      backgroundColor: theme.colors.primary.background,
    },
    '&[aria-label="in-range"]:hover': {
      color: theme.colors.neutral.textStronger,
      backgroundColor: theme.colors.primary.backgroundStrongHover,
    },
    '&[aria-label="not-current"], &:disabled': {
      color: theme.colors.neutral.textDisabled,
    },
    '&[aria-label="selected"]': {
      color: theme.colors.neutral.textStronger,
    },
  },
})
