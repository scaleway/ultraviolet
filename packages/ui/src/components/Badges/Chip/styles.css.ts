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
    overflow: 'hidden',
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
      },
    },
  },
  compoundVariants: [
    {
      style: {
        paddingRight: theme.space[0.5],
      },
      variants: { size: 'medium', closable: true },
    },
    {
      style: {
        paddingRight: theme.space[1],
      },
      variants: { size: 'large', closable: true },
    },
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
  borderRight: 0,
  color: 'inherit',
  selectors: {
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
  },
})

const content = recipe({
  base: [contentBase, { borderRadius: `${theme.radii.xlarge} 0 0 ${theme.radii.xlarge}` }],
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
      height: theme.sizing[300],
      width: theme.sizing[300],
      alignSelf: 'center',
      borderLeft: 0,
      selectors: {
        '&:disabled': {
          cursor: 'not-allowed',
        },
      },
    },
  ],
  variants: {
    size: {
      medium: {
        padding: theme.space['0.5'],
        borderRadius: 0,
      },
      large: { padding: theme.space['0.5'], borderRadius: theme.radii.default },
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

const contentStack = recipe({
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
})

export const chipStyle = { buttonContainer, container, closeButton, content, contentStack }
