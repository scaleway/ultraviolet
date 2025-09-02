import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { SIZES_WIDTH } from './constant'

function createSizesPopover(size: keyof typeof SIZES_WIDTH) {
  return {
    width: `${SIZES_WIDTH[size]}rem`,
    maxWidth: `${SIZES_WIDTH[size]}rem`,
  }
}
export const popover = recipe({
  base: {
    padding: theme.space[2],
    textAlign: 'initial',
    boxShadow: theme.shadows.popover,
  },
  variants: {
    sentiment: {
      neutral: {
        backgroundColor: theme.colors.neutral.background,
        selectors: {
          '&::after': {
            borderColor: `${theme.colors.neutral.background} transparent transparent transparent`,
          },
        },
      },
      primary: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        selectors: {
          '&::after': {
            borderColor: `${theme.colors.primary.backgroundStrong} transparent transparent transparent`,
          },
        },
      },
    },
    size: {
      large: createSizesPopover('large'),
      medium: createSizesPopover('medium'),
      small: createSizesPopover('small'),
    },
  },
})

export const stackPopover = style({
  color: theme.colors.neutral.text,
})
