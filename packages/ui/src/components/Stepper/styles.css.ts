import { theme } from '@ultraviolet/themes'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const LINE_HEIGHT_SIZES = 1

const loadingAnimation = keyframes({
  '0%': {
    width: 0,
  },
  '100%': {
    width: '100%',
  },
})

const loadingAnimationStepSmall = keyframes({
  '0%': {
    width: 0,
  },
  '100%': {
    width: 'calc(100% - 24px - 8px)',
  },
})

const loadingAnimationStepMedium = keyframes({
  '0%': {
    width: 0,
  },
  '100%': {
    width: 'calc(100% - 32px - 8px)',
  },
})

export const stepperContainer = recipe({
  base: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  compoundVariants: [
    {
      style: {
        gap: theme.space['0.5'],
      },
      variants: { labelPosition: 'bottom', separator: true },
    },
    {
      style: {
        gap: theme.space[1],
      },
      variants: { labelPosition: 'right', separator: true },
    },
  ],
  variants: {
    labelPosition: {
      bottom: {},
      right: {},
    },
    separator: {
      false: {
        gap: theme.space[4],
      },
      true: {},
    },
  },
})

export const stepperLine = recipe({
  base: {
    backgroundColor: theme.colors.neutral.backgroundStrong,
    borderRadius: theme.radii.default,
    flexGrow: 1,
    height: `${LINE_HEIGHT_SIZES}px`,
    marginBottom: theme.space[2],
    marginTop: theme.space[2],
    position: 'relative',
    selectors: {
      '&::after': {
        backgroundColor: theme.colors.primary.backgroundStrong,
        borderRadius: theme.radii.default,
        content: '""',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
      },
    },
  },
  compoundVariants: [
    {
      style: {
        selectors: {
          '&::after': {
            animation: `${loadingAnimation} 1s linear infinite`,
          },
        },
      },
      variants: { animated: true, temporal: 'current' },
    },
  ],
  defaultVariants: {
    animated: false,
    temporal: 'next',
  },
  variants: {
    animated: {
      true: {},
    },
    temporal: {
      current: {},
      done: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        selectors: {
          '&::after': {
            width: '100%',
          },
        },
      },
      next: {},
    },
  },
})

export const stepContainer = style({
  display: 'flex',
  transition: 'text-decoration 300ms',
  whiteSpace: 'nowrap',
})

export const stepperContainerRecipe = recipe({
  compoundVariants: [
    {
      style: {
        selectors: {
          '&:not(:last-child)::before': {
            alignSelf: 'baseline',
            backgroundColor: theme.colors.neutral.backgroundStrong,
            borderRadius: theme.radii.default,
            content: '""',
            height: `${LINE_HEIGHT_SIZES}px`,
            left: 'calc(50% + 25px)',
            order: -1,
            position: 'relative',
            top: theme.space['1.5'],
            width: `calc(100% - ${theme.space[5]})`,
          },
          '&:not(:last-child):after': {
            alignSelf: 'baseline',
            borderRadius: theme.radii.default,
            content: '""',
            height: `${LINE_HEIGHT_SIZES}px`,
            left: 'calc(50% + 25px)',
            order: -1,
            position: 'relative',
            top: `calc(${theme.space[1.5]} - 1px)`,
            width: `calc(100% - ${theme.space[5]})`,
          },
        },
      },
      variants: { labelPosition: 'bottom', separator: true, size: 'small' },
    },
    {
      style: {
        selectors: {
          '&:not(:last-child)::before': {
            alignSelf: 'baseline',
            backgroundColor: theme.colors.neutral.backgroundStrong,
            borderRadius: theme.radii.default,
            content: '""',
            height: `${LINE_HEIGHT_SIZES}px`,
            left: 'calc(50% + 25px)',
            order: -1,
            position: 'relative',
            top: theme.space[2],
            width: `calc(100% - ${theme.space[6]})`,
          },
          '&:not(:last-child):after': {
            alignSelf: 'baseline',
            borderRadius: theme.radii.default,
            content: '""',
            height: `${LINE_HEIGHT_SIZES}px`,
            left: 'calc(50% + 25px)',
            order: -1,
            position: 'relative',
            top: `calc(${theme.space[2]} - 1px)`,
            width: `calc(100% - ${theme.space[6]})`,
          },
        },
      },
      variants: { labelPosition: 'bottom', separator: true, size: 'medium' },
    },
    {
      style: {
        flex: 1,
        flexDirection: 'column',
      },
      variants: { labelPosition: 'bottom', separator: true },
    },
    {
      style: {
        selectors: {
          '&:not(:last-child):after': {
            backgroundColor: theme.colors.primary.backgroundStrong,
          },
        },
      },
      variants: {
        done: true,
        labelPosition: 'bottom',
        separator: true,
      },
    },
  ],
  defaultVariants: {
    animated: false,
    disabled: false,
    done: false,
    labelPosition: 'bottom',
    separator: true,
    size: 'medium',
  },
  variants: {
    animated: {
      true: {},
    },
    disabled: {
      false: {},
      true: {
        cursor: 'not-allowed',
      },
    },
    done: {
      true: {},
    },
    labelPosition: {
      bottom: {},
      top: {},
    },
    separator: {
      true: {},
    },
    size: {
      medium: {},
      small: {},
    },
  },
})

export const animationStepperContainer = styleVariants({
  medium: {
    selectors: {
      '&:not(:last-child):after': {
        animation: `${loadingAnimationStepMedium} 1s linear infinite`,
        backgroundColor: theme.colors.primary.backgroundStrong,
      },
    },
  },
  small: {
    selectors: {
      '&:not(:last-child):after': {
        animation: `${loadingAnimationStepSmall} 1s linear infinite`,
        backgroundColor: theme.colors.primary.backgroundStrong,
      },
    },
  },
})

export const stepperInteractive = styleVariants({
  active: {
    cursor: 'pointer',
  },
  inactive: {
    cursor: 'pointer',
  },
})

const stepBulletBase = style({
  selectors: {
    [`${stepperInteractive.active}:hover > &`]: {
      boxShadow: theme.shadows.focusPrimary,
    },
  },
  transition: 'box-shadow 300ms',
})

export const stepBullet = recipe({
  base: stepBulletBase,
  defaultVariants: {
    disabled: false,
    isActive: false,
    size: 'medium',
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          [`${stepperInteractive.inactive}:hover > &`]: {
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
      true: {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        boxShadow: 'none',
        color: theme.colors.neutral.textDisabled,
        selectors: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    isActive: {
      true: {
        backgroundColor: theme.colors.primary.backgroundStrongHover,
        boxShadow: theme.shadows.focusPrimary,
      },
    },
    size: {
      medium: {
        minWidth: theme.space[4],
      },
      small: {
        minWidth: theme.space[3],
      },
    },
  },
})

const stepTextBase = style({
  selectors: {
    [`${stepperInteractive.active}:hover > &`]: {
      color: theme.colors.primary.textHover,
      textDecoration: `underline ${theme.colors.primary.textHover}`,
      textDecorationThickness: 1,
    },
  },
  textDecorationColor: 'transparent',
  textDecorationThickness: 1,
  textUnderlineOffset: 2,
  transition: 'text-decoration-color 250ms ease-out',
})

export const stepText = recipe({
  base: stepTextBase,
  defaultVariants: {
    disabled: false,
  },
  variants: {
    addMarginTop: {
      true: {
        marginTop: theme.space[1],
      },
    },
    disabled: {
      false: {
        selectors: {
          [`${stepperInteractive.inactive}:hover > &`]: {
            color: theme.colors.neutral.textHover,
            textDecoration: `underline ${theme.colors.neutral.textHover}`,
            textDecorationThickness: 1,
          },
        },
      },
      true: {
        color: theme.colors.neutral.textDisabled,
      },
    },
  },
})
