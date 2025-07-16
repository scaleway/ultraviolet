import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { theme } from './theme.css'

export const button = recipe({
  base: {
    padding: theme.space[1],
    borderRadius: theme.radii.default,
  },
  variants: {
    sentiment: {
      primary: {},
      secondary: {},
      danger: {},
    },
    variant: {
      strong: {},
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
  compoundVariants: [
    {
      variants: { variant: 'strong', sentiment: 'primary' },
      style: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        color: theme.colors.primary.textStrong,
        border: `1px solid ${theme.colors.primary.borderStrong}`,
      },
    },
    {
      variants: { variant: 'strong', sentiment: 'secondary' },
      style: {
        backgroundColor: theme.colors.secondary.backgroundStrong,
        color: theme.colors.secondary.textStrong,
        border: `1px solid ${theme.colors.secondary.borderStrong}`,
      },
    },
    {
      variants: { variant: 'strong', sentiment: 'danger' },
      style: {
        backgroundColor: theme.colors.danger.backgroundStrong,
        color: theme.colors.danger.textStrong,
        border: `1px solid ${theme.colors.danger.borderStrong}`,
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'primary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.primary.text,
        border: `1px solid ${theme.colors.primary.borderStrong}`,
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'secondary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.secondary.text,
        border: `1px solid ${theme.colors.secondary.borderStrong}`,
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'danger' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.danger.text,
        border: `1px solid ${theme.colors.danger.borderStrong}`,
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'primary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.primary.text,
        border: 'none',
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'secondary' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.secondary.text,
        border: 'none',
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'danger' },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.danger.text,
        border: 'none',
      },
    },
    {
      variants: { variant: 'strong', sentiment: 'primary', disabled: true },
      style: {
        backgroundColor: theme.colors.primary.backgroundStrongDisabled,
        color: theme.colors.primary.textStrongDisabled,
        border: `1px solid ${theme.colors.primary.borderStrongDisabled}`,
      },
    },
    {
      variants: {
        variant: 'strong',
        sentiment: 'secondary',
        disabled: true,
      },
      style: {
        backgroundColor: theme.colors.secondary.backgroundStrongDisabled,
        color: theme.colors.secondary.textStrongDisabled,
        border: `1px solid ${theme.colors.secondary.borderStrongDisabled}`,
      },
    },
    {
      variants: { variant: 'strong', sentiment: 'danger', disabled: true },
      style: {
        backgroundColor: theme.colors.danger.backgroundStrongDisabled,
        color: theme.colors.danger.textStrongDisabled,
        border: `1px solid ${theme.colors.danger.borderStrongDisabled}`,
      },
    },
    {
      variants: {
        variant: 'outlined',
        sentiment: 'primary',
        disabled: true,
      },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.primary.textDisabled,
        border: `1px solid ${theme.colors.primary.borderStrongDisabled}`,
      },
    },
    {
      variants: {
        variant: 'outlined',
        sentiment: 'secondary',
        disabled: true,
      },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.secondary.textDisabled,
        border: `1px solid ${theme.colors.secondary.borderStrongDisabled}`,
      },
    },
    {
      variants: { variant: 'outlined', sentiment: 'danger', disabled: true },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.danger.textDisabled,
        border: `1px solid ${theme.colors.danger.borderStrongDisabled}`,
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'primary', disabled: true },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.primary.textDisabled,
        border: 'none',
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'secondary', disabled: true },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.secondary.textDisabled,
        border: 'none',
      },
    },
    {
      variants: { variant: 'ghost', sentiment: 'danger', disabled: true },
      style: {
        backgroundColor: 'transparent',
        color: theme.colors.danger.textDisabled,
        border: 'none',
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    fullWidth: false,
    disabled: false,
    variant: 'strong',
  },
})

type Variants = NonNullable<RecipeVariants<typeof button>>

type RequiredProps = {
  sentiment: NonNullable<Variants['sentiment']>
  variant: NonNullable<Variants['variant']>
}

export type ButtonVariants = Omit<Variants, 'sentiment' | 'variant'> &
  RequiredProps
