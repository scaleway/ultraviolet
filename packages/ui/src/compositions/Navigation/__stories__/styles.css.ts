import { recipe } from '@vanilla-extract/recipes'

import { ANIMATION_DURATION, ANIMATION_EASING } from '../constants'

export const logoStyle = recipe({
  base: {
    objectFit: 'cover',
    objectPosition: 'left',
  },
  variants: {
    expanded: {
      false: {
        transition: `opacity ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`,
        opacity: 0,
      },
      true: {
        opacity: 1,
      },
    },
  },
})
