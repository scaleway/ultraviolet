import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { POPUP_WIDTH } from './constants'
import { capitalizedText, capitalizedTextDay, dayMonth } from './components/styles.css'

const container = style({
  width: '100%',
  height: 'fit-content',
})

const calendarContentWrapper = recipe({
  base: {
    selectors: {
      '&&': {
        backgroundColor: theme.colors.other.elevation.background.raised,
        padding: theme.space[2],
        width: '16.5rem',
      },
    },
  },
  variants: {
    disabled: {
      true: { cursor: 'not-allowed' },
    },
  },
})
const popup = style([
  calendarContentWrapper(),
  {
    width: '100%',
    maxWidth: POPUP_WIDTH,
  },
])

export const dateInputStyle = {
  container,
  calendarContentWrapper,
  popup,
  capitalizedText,
  capitalizedTextDay,
  dayMonth,
}
