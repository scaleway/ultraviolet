import { type RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { theme } from './theme.css'

export const button = recipe({
  base: {
    padding: theme.space[1],
    borderRadius: theme.radii.default,
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    // Target a specific data attribute for styling
    selectors: {
      '&[data-has-green-border]': {
        border: `4px solid green`,
      },
    },
  },
  variants: {
    sentiment: {
      primary: {},
      secondary: {},
      danger: {},
    },
    variant: {
      filled: {},
      outlined: {},
      ghost: {},
    },
    size: {
      small: {
        padding: theme.space[0],
        fontSize: theme.typography.bodySmallStrong.fontSize,
      },
      medium: {
        padding: theme.space[1],
        fontSize: theme.typography.bodyStrong.fontSize,
      },
      large: {
        padding: theme.space[2],
        fontSize: theme.typography.bodyStrong.fontSize,
      },
    },
    gap: Object.keys(theme.space).reduce(
      (acc, size) => ({
        ...acc,
        [size]: { gap: theme.space[size as keyof typeof theme.space] },
      }),
      {},
    ) as typeof theme.space,
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'fit-content',
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {},
    },
  },
  // Can be simplified using map but for clarity we keep it like so
  compoundVariants: [
    {
      variants: { variant: 'filled', sentiment: 'primary' },
      style: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        color: theme.colors.primary.textStrong,
        border: `1px solid ${theme.colors.primary.borderStrong}`,
        ':hover': {
          backgroundColor: theme.colors.primary.backgroundStrongHover,
          color: theme.colors.primary.textStrongHover,
        },
      },
    },
    {
      variants: { variant: 'filled', sentiment: 'secondary' },
      style: {
        backgroundColor: theme.colors.secondary.backgroundStrong,
        color: theme.colors.secondary.textStrong,
        border: `1px solid ${theme.colors.secondary.borderStrong}`,
        ':hover': {
          backgroundColor: theme.colors.secondary.backgroundStrongHover,
          color: theme.colors.secondary.textStrongHover,
        },
      },
    },
    {
      variants: { variant: 'filled', sentiment: 'danger' },
      style: {
        backgroundColor: theme.colors.danger.backgroundStrong,
        color: theme.colors.danger.textStrong,
        border: `1px solid ${theme.colors.danger.borderStrong}`,
        ':hover': {
          backgroundColor: theme.colors.danger.backgroundStrongHover,
          color: theme.colors.danger.textStrongHover,
        },
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'primary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.primary.text,
        border: `1px solid ${theme.colors.primary.borderStrong}`,
        ':hover': {
          backgroundColor: theme.colors.primary.backgroundHover,
          color: theme.colors.primary.textHover,
        },
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'secondary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.secondary.text,
        border: `1px solid ${theme.colors.secondary.borderStrong}`,
        ':hover': {
          backgroundColor: theme.colors.secondary.backgroundHover,
          color: theme.colors.secondary.textHover,
        },
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'danger' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.danger.text,
        border: `1px solid ${theme.colors.danger.borderStrong}`,
        ':hover': {
          backgroundColor: theme.colors.danger.backgroundHover,
          color: theme.colors.danger.textHover,
        },
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'primary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.primary.text,
        border: 'none',
        ':hover': {
          backgroundColor: theme.colors.primary.backgroundHover,
          color: theme.colors.primary.textHover,
        },
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'secondary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.secondary.text,
        border: 'none',
        ':hover': {
          backgroundColor: theme.colors.secondary.backgroundHover,
          color: theme.colors.secondary.textHover,
        },
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'danger' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.danger.text,
        border: 'none',
        ':hover': {
          backgroundColor: theme.colors.danger.backgroundHover,
          color: theme.colors.danger.textHover,
        },
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
})

type Variants = NonNullable<RecipeVariants<typeof button>>

type RequiredProps = {
  sentiment: NonNullable<Variants['sentiment']>
  variant: NonNullable<Variants['variant']>
}

export type ButtonVariants = Omit<Variants, 'sentiment' | 'variant'> &
  RequiredProps
