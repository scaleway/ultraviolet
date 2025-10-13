import { theme } from '@ultraviolet/themes'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const LINE_HEIGHT_SIZES = {
  medium: 4,
  small: 2,
} as const

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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  variants: {
    separator: {
      true: {},
      false: {
        gap: theme.space[4],
      },
    },
    labelPosition: {
      bottom: {},
      right: {},
    },
  },
  compoundVariants: [
    {
      variants: { separator: true, labelPosition: 'bottom' },
      style: {
        gap: theme.space['0.5'],
      },
    },
    {
      variants: { separator: true, labelPosition: 'right' },
      style: {
        gap: theme.space[1],
      },
    },
  ],
})

export const stepperLine = recipe({
  base: {
    borderRadius: theme.radii.default,
    flexGrow: 1,
    position: 'relative',
    marginTop: theme.space[2],
    marginBottom: theme.space[2],
    backgroundColor: theme.colors.neutral.backgroundStrong,

    selectors: {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        borderRadius: theme.radii.default,
        backgroundColor: theme.colors.primary.backgroundStrong,
      },
    },
  },
  variants: {
    temporal: {
      next: {},
      done: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        selectors: {
          '&::after': {
            width: '100%',
          },
        },
      },
      current: {},
    },
    size: {
      small: {
        height: `${LINE_HEIGHT_SIZES.small}px`,
      },
      medium: {
        height: `${LINE_HEIGHT_SIZES.medium}px`,
      },
    },
    animated: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { temporal: 'current', animated: true },
      style: {
        selectors: {
          '&::after': {
            animation: `${loadingAnimation} 1s linear infinite`,
          },
        },
      },
    },
  ],
  defaultVariants: {
    animated: false,
    size: 'medium',
    temporal: 'next',
  },
})

export const stepContainer = style({
  display: 'flex',
  whiteSpace: 'nowrap',
  transition: 'text-decoration 300ms',
})

export const stepperContainerRecipe = recipe({
  variants: {
    size: {
      small: {},
      medium: {},
    },
    animated: {
      true: {},
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {},
    },
    separator: {
      true: {},
    },
    labelPosition: {
      top: {},
      bottom: {},
    },
    done: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { labelPosition: 'bottom', separator: true, size: 'small' },
      style: {
        selectors: {
          '&:not(:last-child):after': {
            content: '""',
            position: 'relative',
            alignSelf: 'baseline',
            borderRadius: theme.radii.default,
            top: theme.space[2],
            width: `calc(100% - ${theme.space[5]})`,
            left: 'calc(50% + 25px)',
            order: -1,
            height: `${LINE_HEIGHT_SIZES.small}px`,
          },
          '&:not(:last-child)::before': {
            content: '""',
            position: 'relative',
            alignSelf: 'baseline',
            borderRadius: theme.radii.default,
            backgroundColor: theme.colors.neutral.backgroundStrong,
            top: 18,
            width: `calc(100% - ${theme.space[5]})`,
            left: 'calc(50% + 25px)',
            order: -1,
            height: `${LINE_HEIGHT_SIZES.small}px`,
          },
        },
      },
    },
    {
      variants: { labelPosition: 'bottom', separator: true, size: 'medium' },
      style: {
        selectors: {
          '&:not(:last-child):after': {
            content: '""',
            position: 'relative',
            alignSelf: 'baseline',
            borderRadius: theme.radii.default,
            top: theme.space[2],
            width: `calc(100% - ${theme.space[6]})`,
            left: 'calc(50% + 25px)',
            order: -1,
            height: `${LINE_HEIGHT_SIZES.medium}px`,
          },
          '&:not(:last-child)::before': {
            content: '""',
            position: 'relative',
            alignSelf: 'baseline',
            borderRadius: theme.radii.default,
            backgroundColor: theme.colors.neutral.backgroundStrong,
            top: 20,
            width: `calc(100% - ${theme.space[6]})`,
            left: 'calc(50% + 25px)',
            order: -1,
            height: `${LINE_HEIGHT_SIZES.medium}px`,
          },
        },
      },
    },
    {
      variants: { separator: true, labelPosition: 'bottom' },
      style: {
        flexDirection: 'column',
        flex: 1,
        selectors: {
          '&:last-child': {
            marginTop: theme.space[1],
          },
        },
      },
    },
    {
      variants: {
        done: true,
        separator: true,
        labelPosition: 'bottom',
      },
      style: {
        selectors: {
          '&:not(:last-child):after': {
            backgroundColor: theme.colors.primary.backgroundStrong,
          },
        },
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    animated: false,
    disabled: false,
    separator: true,
    labelPosition: 'bottom',
    done: false,
  },
})

export const animationStepperContainer = styleVariants({
  medium: {
    selectors: {
      '&:not(:last-child):after': {
        backgroundColor: theme.colors.primary.backgroundStrong,
        animation: `${loadingAnimationStepMedium} 1s linear infinite`,
      },
    },
  },
  small: {
    selectors: {
      '&:not(:last-child):after': {
        backgroundColor: theme.colors.primary.backgroundStrong,
        animation: `${loadingAnimationStepSmall} 1s linear infinite`,
      },
    },
  },
})

export const stepperInteractive = styleVariants({
  inactive: {
    cursor: 'pointer',
  },
  active: {
    cursor: 'pointer',
  },
})

const stepBulletBase = style({
  transition: 'box-shadow 300ms',
  selectors: {
    [`${stepperInteractive.active}:hover > &`]: {
      boxShadow: theme.shadows.focusPrimary,
    },
  },
})

export const stepBullet = recipe({
  base: stepBulletBase,
  variants: {
    size: {
      small: {
        minWidth: theme.space[3],
      },
      medium: {
        minWidth: theme.space[4],
      },
    },
    isActive: {
      true: {
        backgroundColor: theme.colors.primary.backgroundStrongHover,
        boxShadow: theme.shadows.focusPrimary,
      },
    },
    disabled: {
      true: {
        color: theme.colors.neutral.textDisabled,
        backgroundColor: theme.colors.neutral.backgroundDisabled,
        boxShadow: 'none',
        borderColor: theme.colors.neutral.borderDisabled,
        selectors: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      false: {
        selectors: {
          [`${stepperInteractive.inactive}:hover > &`]: {
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    disabled: false,
    isActive: false,
  },
})

const stepTextBase = style({
  transition: 'text-decoration-color 250ms ease-out',
  textDecorationThickness: 1,
  textUnderlineOffset: 2,
  textDecorationColor: 'transparent',
  selectors: {
    [`${stepperInteractive.active}:hover > &`]: {
      color: theme.colors.primary.textHover,
      textDecoration: `underline ${theme.colors.primary.textHover}`,
      textDecorationThickness: 1,
    },
  },
})

export const stepText = recipe({
  base: stepTextBase,
  variants: {
    disabled: {
      true: {
        color: theme.colors.neutral.textDisabled,
      },
      false: {
        selectors: {
          [`${stepperInteractive.inactive}:hover > &`]: {
            color: theme.colors.neutral.textHover,
            textDecoration: `underline ${theme.colors.neutral.textHover}`,
            textDecorationThickness: 1,
          },
        },
      },
    },
    addMarginTop: {
      true: {
        marginTop: theme.space[1],
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
})
