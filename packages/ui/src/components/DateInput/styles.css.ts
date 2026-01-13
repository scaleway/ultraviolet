import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const dateinputContainer = style({ width: '100%' })

export const calendarContentWrapper = recipe({
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
