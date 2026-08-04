import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'

const key = recipe({
  base: {
    alignItems: 'center',
    borderRadius: theme.radii.default,
    borderStyle: 'solid',
    borderWidth: 0.5,
    cursor: 'default',

    display: 'flex',
    justifyContent: 'center',
  },
  compoundVariants: [
    {
      style: {
        backgroundColor: theme.colors.neutral.backgroundStronger,
        border: 'none',
      },
      variants: { prominence: 'strong', sentiment: 'neutral' },
    },
    {
      style: {
        backgroundColor: theme.colors.neutral.backgroundWeakDisabled,
        borderColor: theme.colors.neutral.borderWeakDisabled,
        cursor: 'not-allowed',
      },
      variants: { disabled: true, sentiment: 'neutral' },
    },
    {
      style: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        border: 'none',
      },
      variants: { prominence: 'strong', sentiment: 'primary' },
    },
    {
      style: {
        backgroundColor: theme.colors.primary.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
      },
      variants: { disabled: true, sentiment: 'primary' },
    },
    {
      style: {
        backgroundColor: theme.colors.primary.backgroundStrongDisabled,
        border: 'none',
      },
      variants: { disabled: true, prominence: 'strong', sentiment: 'primary' },
    },
    {
      style: {
        backgroundColor: theme.colors.neutral.backgroundStrongerDisabled,
        border: 'none',
      },
      variants: { disabled: true, prominence: 'strong', sentiment: 'neutral' },
    },
  ],
  defaultVariants: {
    disabled: false,
    prominence: 'default',
    sentiment: 'neutral',
    size: 'medium',
  },
  variants: {
    disabled: {
      true: {},
    },
    prominence: {
      default: {},
      strong: {},
    },
    sentiment: {
      neutral: {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.borderWeak,
      },
      primary: {
        backgroundColor: theme.colors.primary.background,
        borderColor: theme.colors.primary.border,
      },
    },
    size: {
      medium: {
        height: theme.sizing[300],
        minWidth: theme.sizing[300],
      },
      small: {
        height: theme.sizing[250],
        minWidth: theme.sizing[250],
      },
    },
  },
})

export const keyStyle = { key }
