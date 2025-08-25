import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'

export const banner = recipe({
  base: {
    borderRadius: theme.radii.large,
  },
  variants: {
    size: {
      small: {
        padding: theme.space[2],
      },
      medium: {
        padding: theme.space[3],
      },
    },
    variant: {
      intro: {},
      promotional: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'intro', size: 'small' },
      style: {
        background: theme.colors.primary.background,
        backgroundPosition: 'left, right',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: 'contain, contain',
      },
    },
    {
      variants: { variant: 'intro', size: 'medium' },
      style: {
        background: theme.colors.primary.background,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
    },
    {
      variants: { variant: 'promotional', size: 'small' },
      style: {
        backgroundImage: theme.colors.other.gradients.background.linear.aqua,
        backgroundPosition: 'left, right',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: 'contain, contain',
      },
    },
    {
      variants: { variant: 'promotional', size: 'medium' },
      style: {
        backgroundImage: theme.colors.other.gradients.background.linear.aqua,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
    },
  ],

  defaultVariants: {
    variant: 'intro',
    size: 'medium',
  },
})

export const imageStackBanner = styleVariants({
  small: {
    width: '74px',
  },
  medium: {
    width: '140px',
  },
})

export const closeButtonBanner = style({
  background: 'none',
  selectors: {
    '&:hover': {
      background: 'none',
    },
  },
})

export type BannerVariants = NonNullable<RecipeVariants<typeof banner>>
