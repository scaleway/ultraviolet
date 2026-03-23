import { theme } from '@ultraviolet/themes'
import { createVar } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { drawerStyle } from '../Drawer/styles.css'

import type { Color } from '../../theme'
import type { RecipeVariants } from '@vanilla-extract/recipes'

export const thicknessSeparator = createVar()

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

const iconWraper = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
  },
  defaultVariants: {
    direction: 'horizontal',
    sentiment: 'neutral',
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
      danger: makeColors(false, 'danger'),
      info: makeColors(false, 'info'),
      neutral: {
        color: theme.colors.neutral.borderWeak,
      },
      primary: makeColors(false, 'primary'),
      secondary: makeColors(false, 'secondary'),
      success: makeColors(false, 'success'),
      warning: makeColors(false, 'warning'),
    },
  },
})
const hr = recipe({
  base: {
    border: 0,
    margin: 0,
  },
  variants: {
    direction: {
      horizontal: {
        height: thicknessSeparator,
        width: 'auto',
      },
      vertical: {
        height: 'auto',
        width: thicknessSeparator,
      },
    },
    hasIcon: {
      false: {},
      true: {
        flex: 1,
      },
    },
    sentiment: {
      danger: makeColors(true, 'danger'),
      info: makeColors(true, 'info'),
      neutral: {
        backgroundColor: theme.colors.neutral.borderWeak,
        selectors: {
          [`${drawerStyle.base} &`]: {
            backgroundColor: theme.colors.neutral.border,
            minHeight: 1,
          },
        },
      },
      primary: makeColors(true, 'primary'),
      secondary: makeColors(true, 'secondary'),
      success: makeColors(true, 'success'),
      warning: makeColors(true, 'warning'),
    },
  },
})

export type SeparatorVariants = NonNullable<RecipeVariants<typeof iconWraper>>

export const separatorStyle = {
  thicknessSeparator,
  iconWraper,
  hr,
}
