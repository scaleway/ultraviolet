import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const capitalizedText = style({ textTransform: 'capitalize' })
export const capitalizedTextDay = style([capitalizedText, { display: 'inline-block' }])

export const dayMonth = recipe({
  base: {
    color: theme.colors.neutral.textWeak,
    height: theme.sizing[312],
    padding: 0,
    selectors: {
      '&:disabled': {
        color: theme.colors.neutral.textDisabled,
      },
    },
    width: '100%',
  },
  variants: {
    variant: {
      selected: {
        color: theme.colors.neutral.textStronger,
      },
      'in-range': {
        backgroundColor: theme.colors.primary.background,
        color: theme.colors.primary.textHover,
        selectors: {
          '&:hover': {
            backgroundColor: theme.colors.primary.backgroundStrongHover,
            color: theme.colors.neutral.textStronger,
          },
        },
      },
      'not-current': {
        color: theme.colors.neutral.textDisabled,
      },
      neutral: {},
    },
  },
})
