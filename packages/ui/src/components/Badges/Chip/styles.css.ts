import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const buttonContainer = style({
  background: 'none',
  border: 'none',
  borderRadius: theme.radii.default,
  cursor: 'pointer',
  padding: 0,
  color: 'inherit',

  selectors: {
    '&[aria-disabled="true"]': {
      cursor: 'not-allowed',
    },
    '&[data-has-onclick="true"][data-active="false"]:hover': {
      backgroundColor: theme.colors.neutral.backgroundStrongHover,
    },
    '&[data-has-onclick="true"][data-active="true"]:hover': {
      backgroundColor: theme.colors.primary.backgroundStrong,
    },
  },
})

const container = recipe({
  base: {
    backgroundColor: theme.colors.neutral.background,
    border: `1px solid ${theme.colors.neutral.borderWeak}`,
    color: theme.colors.neutral.text,
    cursor: 'pointer',
    display: 'flex',
    padding: `${theme.space['0.5']} ${theme.space['2']}`,
    textAlign: 'center',
    userSelect: 'none',
    width: 'fit-content',
    borderRadius: theme.radii.xlarge,
  },
  variants: {
    size: {
      medium: {
        fontFamily: theme.typography.caption.fontFamily,
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.caption.weight,
        letterSpacing: theme.typography.caption.letterSpacing,
        lineHeight: theme.typography.caption.lineHeight,
        textTransform: theme.typography.caption.textCase,
        height: theme.space[3],
        padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
      },
      large: {
        fontFamily: theme.typography.bodySmall.fontFamily,
        fontSize: theme.typography.bodySmall.fontSize,
        fontWeight: theme.typography.bodySmall.weight,
        letterSpacing: theme.typography.bodySmall.letterSpacing,
        lineHeight: theme.typography.bodySmall.lineHeight,
        textTransform: theme.typography.bodySmall.textCase,
        height: theme.space[4],
        padding: `${theme.space['0.5']} ${theme.space['2']}`,
      },
    },
    hasTrailingIcon: {
      true: { paddingRight: theme.space[1] },
    },
    isActive: {
      true: {
        backgroundColor: theme.colors.primary.backgroundStrong,
        borderColor: theme.colors.primary.backgroundStrong,
        color: theme.colors.primary.textStrong,
      },
    },
    disabled: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderWeakDisabled,
        color: theme.colors.neutral.textDisabled,
        cursor: 'not-allowed',
      },
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: theme.colors.neutral.backgroundHover,
            borderColor: theme.colors.neutral.borderStrongHover,
            color: theme.colors.neutral.textHover,
          },
        },
      },
    },
    closable: {
      true: {
        padding: 0,
        paddingRight: theme.space[1],
      },
    },
  },
  compoundVariants: [
    {
      style: {
        selectors: {
          '&:hover': {
            backgroundColor: theme.colors.primary.backgroundStrongHover,
            borderColor: theme.colors.primary.backgroundStrongHover,
            color: theme.colors.primary.textStrong,
          },
        },
      },
      variants: { disabled: false, isActive: true },
    },
    {
      style: {
        backgroundColor: theme.colors.primary.backgroundStrongDisabled,
        border: 'none',
        color: theme.colors.primary.textStrongDisabled,
      },
      variants: { disabled: true, isActive: true },
    },
  ],
  defaultVariants: {
    size: 'medium',
    hasTrailingIcon: false,
    disabled: false,
    isActive: false,
    closable: false,
  },
})

const contentBase = style({
  border: 'none',
  background: 'none',
  borderRadius: `${theme.radii.xlarge} 0 0 ${theme.radii.xlarge}`,
  borderRight: 0,
  color: 'inherit',
  selectors: {
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
  },
})

const content = recipe({
  base: [contentBase],
  variants: {
    size: {
      medium: {
        padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
        paddingRight: 0,
      },
      large: { padding: `${theme.space['0.5']} ${theme.space['2']}`, paddingRight: 0 },
    },
  },
})

const closeButton = recipe({
  base: [
    contentBase,
    {
      borderLeft: 0,
    },
  ],
  variants: {
    size: {
      medium: {
        padding: theme.space['0.5'],
        borderRadius: `0px ${theme.radii.small} ${theme.radii.small} 0px`,
      },
      large: { padding: theme.space['0.5'], borderRadius: `0px ${theme.radii.default} ${theme.radii.default} 0px` },
    },
    isActive: {
      true: {
        selectors: {
          '&:hover:not(:disabled)': {
            background: theme.colors.primary.backgroundStrong,
          },
        },
      },
      false: {
        selectors: {
          '&:hover:not(:disabled)': {
            background: theme.colors.neutral.backgroundStrongHover,
          },
        },
      },
    },
  },
  defaultVariants: {
    isActive: false,
  },
})

export const chipStyle = { buttonContainer, container, closeButton, content }
