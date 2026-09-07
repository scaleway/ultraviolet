import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const CONTAINER_SIZES = {
  large: 71.25,
  medium: 45,
  small: 45, // in rem
} as const

const IMAGE_SIZES = {
  large: 15,
  medium: 6,
  small: 4, // in rem
} as const

export type SizesTypes = keyof typeof CONTAINER_SIZES

const container = recipe({
  base: {
    margin: '0 auto',
    width: '100%',
  },
  defaultVariants: {
    bordered: false,
    size: 'large',
  },
  variants: {
    bordered: {
      true: {
        border: `1px solid ${theme.colors.neutral.border}`,
        borderRadius: theme.radii.default,
      },
    },
    size: {
      large: { maxWidth: `${CONTAINER_SIZES.large}rem`, padding: '0 8.75rem' },
      medium: { maxWidth: `${CONTAINER_SIZES.medium}rem` },
      small: {
        maxWidth: `${CONTAINER_SIZES.small}rem`,
      },
    },
  },
})

const paddedStack = style({ padding: theme.space[5] })

function createImageStyle(size: SizesTypes) {
  return {
    height: `${IMAGE_SIZES[size]}rem`,
    objectFit: 'contain' as const,
    width: `${IMAGE_SIZES[size]}rem`,
  }
}
const image = styleVariants({
  large: createImageStyle('large'),
  medium: createImageStyle('medium'),
  small: createImageStyle('small'),
})

export const emptyStateStyle = {
  container,
  paddedStack,
  image,
}
