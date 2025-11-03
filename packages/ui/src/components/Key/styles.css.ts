import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'

export const key = recipe({
  base: {
    cursor: 'default',
    borderRadius: theme.radii.default,
    borderWidth: 0.5,
    borderStyle: 'solid',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    prominence: {
      strong: {},
      default: {},
    },
    disabled: {
      true: {},
    },
    sentiment: {
      primary: {
        backgroundColor: theme.colors.primary.background,
        borderColor: theme.colors.primary.border,
      },
      neutral: {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.borderWeak,
      },
    },
    size: {
      small: {
        minWidth: theme.sizing[250],
        height: theme.sizing[250],
      },
      medium: {
        minWidth: theme.sizing[300],
        height: theme.sizing[300],
      },
    },
  },
  compoundVariants: [
    {
      variants: { prominence: 'strong', sentiment: 'neutral' },
      style: {
        backgroundColor: theme.colors.neutral.backgroundWeakDisabled,
        borderColor: theme.colors.neutral.borderWeakDisabled,
      },
    },
    {
      variants: { sentiment: 'neutral', prominence: 'strong', disabled: true },
      style: {
        backgroundColor: theme.colors.neutral.backgroundStrongerDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
      },
    },
    {
      variants: { disabled: true, sentiment: 'neutral' },
      style: {
        backgroundColor: theme.colors.neutral.backgroundWeakDisabled,
        borderColor: theme.colors.neutral.borderWeakDisabled,
        cursor: 'not-allowed',
      },
    },
    {
      variants: { sentiment: 'primary', prominence: 'strong' },
      style: {
        backgroundColor: theme.colors.primary.backgroundStrong,
      },
    },
    {
      variants: { sentiment: 'primary', prominence: 'strong', disabled: true },
      style: {
        backgroundColor: theme.colors.primary.backgroundStrongDisabled,
      },
    },
    {
      variants: { disabled: true, sentiment: 'primary' },
      style: {
        backgroundColor: theme.colors.primary.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
      },
    },
  ],
  defaultVariants: {
    prominence: 'default',
    disabled: false,
    size: 'medium',
    sentiment: 'neutral',
  },
})
