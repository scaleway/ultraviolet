import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const dateinputContainer = style({ width: '100%' })

export const calendarContentWrapper = recipe({
  base: {
    width: '16.5rem',
    color: theme.colors.neutral.text,
    padding: theme.space[2],
    borderRadius: theme.radii.default,
    backgroundColor: theme.colors.other.elevation.background.raised,
  },
  variants: {
    disabled: {
      true: { cursor: 'not-allowed' },
    },
  },
})
