import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES_WIDTH } from './constant'

function createSizesPopover(size: keyof typeof SIZES_WIDTH) {
  return {
    width: `${SIZES_WIDTH[size]}rem`,
  }
}
const popover = recipe({
  base: {
    padding: theme.space[2],
  },
  variants: {
    size: {
      large: createSizesPopover('large'),
      medium: createSizesPopover('medium'),
      small: createSizesPopover('small'),
    },
  },
})

export const popoverStyle = { popover }
