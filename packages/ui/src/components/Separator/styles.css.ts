import { theme } from '@ultraviolet/themes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import type { Color } from '../../theme'

function makeColors(isBackground: boolean, sentiment: Color) {
  if (isBackground) {
    return {
      backgroundColor: theme.colors[sentiment].border,
    }
  }

  return {
    color: theme.colors[sentiment].border,
  }
}

export const iconWraperSeparator = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
    sentiment: {
      neutral: {
        color: theme.colors.neutral.borderWeak,
      },
      primary: makeColors(false, 'primary'),
      secondary: makeColors(false, 'secondary'),
      danger: makeColors(false, 'danger'),
      info: makeColors(false, 'info'),
      success: makeColors(false, 'success'),
      warning: makeColors(false, 'warning'),
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    sentiment: 'neutral',
  },
})
export const hr = recipe({
  base: {
    margin: 0,
    border: 0,
  },
  variants: {
    direction: {
      horizontal: {
        width: 'auto',
      },
      vertical: {
        height: 'auto',
      },
    },
    sentiment: {
      neutral: {
        backgroundColor: theme.colors.neutral.borderWeak,
      },
      primary: makeColors(true, 'primary'),
      secondary: makeColors(true, 'secondary'),
      danger: makeColors(true, 'danger'),
      info: makeColors(true, 'info'),
      success: makeColors(true, 'success'),
      warning: makeColors(true, 'warning'),
    },
    hasIcon: {
      true: {
        flex: 1,
      },
      false: {},
    },
  },
})

export type SeparatorVariants = NonNullable<
  RecipeVariants<typeof iconWraperSeparator>
>
