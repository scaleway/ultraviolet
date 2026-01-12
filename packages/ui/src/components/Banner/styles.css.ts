import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'

export const banner = recipe({
  base: {
    borderRadius: theme.radii.large,
  },
  compoundVariants: [
    {
      style: {
        background: theme.colors.primary.background,
        backgroundPosition: 'left, right',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: 'contain, contain',
      },
      variants: { size: 'small', variant: 'intro' },
    },
    {
      style: {
        background: theme.colors.primary.background,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
      variants: { size: 'medium', variant: 'intro' },
    },
    {
      style: {
        backgroundImage: theme.colors.other.gradients.background.linear.aqua,
        backgroundPosition: 'left, right',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: 'contain, contain',
      },
      variants: { size: 'small', variant: 'promotional' },
    },
    {
      style: {
        backgroundImage: theme.colors.other.gradients.background.linear.aqua,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
      variants: { size: 'medium', variant: 'promotional' },
    },
  ],

  defaultVariants: {
    size: 'medium',
    variant: 'intro',
  },
  variants: {
    size: {
      medium: {
        padding: theme.space[3],
      },
      small: {
        padding: theme.space[2],
      },
    },
    variant: {
      intro: {},
      promotional: {},
    },
  },
})

export const imageStackBanner = styleVariants({
  medium: {
    width: '140px',
  },
  small: {
    width: '74px',
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
