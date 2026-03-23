import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import {
  capitalizedText,
  capitalizedTextDay,
  dayMonth,
} from './components/styles.css'

const container = style({ width: '100%' })

const calendarContentWrapper = recipe({
  base: {
    backgroundColor: theme.colors.other.elevation.background.raised,
    borderRadius: theme.radii.default,
    color: theme.colors.neutral.text,
    padding: theme.space[2],
    width: '16.5rem',
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
    boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
    width: '100%',
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
