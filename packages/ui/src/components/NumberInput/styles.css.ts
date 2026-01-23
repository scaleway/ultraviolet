import { theme } from '@ultraviolet/themes'
import { styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES } from './constant'

export const numberinputSideContainer = styleVariants({
  large: {
    height: theme.sizing[SIZES.large],
    padding: `${theme.space['0.5']} ${theme.space['1']}`,
  },
  medium: {
    height: theme.sizing[SIZES.medium],
    padding: `${theme.space['0.25']} ${theme.space['1']}`,
  },
  small: {
    height: theme.sizing[SIZES.small],
    padding: `${theme.space['0.25']} ${theme.space['1']}`,
  },
})

export const inputContainer = recipe({
  base: {
    background: 'inherit',
    borderColor: 'inherit',
    borderStyle: 'solid',
    borderWidth: '0 1px 0 1px',
    width: '100%',
  },
  defaultVariants: {
    controls: true,
  },
  variants: {
    controls: {
      false: {
        borderWidth: 0,
      },
    },
  },
})

export const unit = recipe({
  base: { alignItems: 'center', display: 'flex', padding: theme.space[1] },
  defaultVariants: {
    disabled: false,
    readOnly: false,
    size: 'large',
  },
  variants: {
    disabled: {
      true: {
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
        userSelect: 'none',
      },
    },
    readOnly: {
      true: {
        background: theme.colors.neutral.backgroundWeak,
      },
    },
    size: {
      large: {
        fontSize: theme.typography.body.fontSize,
        height: theme.sizing[SIZES.large],
      },

      medium: {
        fontSize: theme.typography.bodySmall.fontSize,
        height: theme.sizing[SIZES.medium],
      },
      small: {
        fontSize: theme.typography.bodySmall.fontSize,
        height: theme.sizing[SIZES.small],
      },
    },
  },
})

export const numberinput = recipe({
  base: {
    background: 'none',
    border: 'none',
    color: theme.colors.neutral.text,
    fontFamily: theme.typography.bodySmall.fontFamily,
    fontSize: theme.typography.bodySmall.fontSize,
    fontWeight: theme.typography.bodySmall.fontWeight,
    lineHeight: theme.typography.bodySmall.lineHeight,
    outline: 'none',
    padding: theme.space[1],
    selectors: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&': {
        appearance: 'textarea',
        MozAppearance: 'textfield',
      },
      '&:read-only': {
        color: theme.colors.neutral.text,
        background: theme.colors.neutral.backgroundWeak,
        borderBlock: `1px solid ${theme.colors.neutral.border}`,
      },
      '&:disabled': {
        color: theme.colors.neutral.textDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
        borderBlock: `1px solid ${theme.colors.neutral.borderDisabled}`,
      },
      '&::placeholder': {
        color: theme.colors.neutral.textWeak,
        fontSize: theme.typography.body.fontSize,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    textAlign: 'center',
    width: '100%',
  },
  defaultVariants: {
    controls: true,
    hasUnit: false,
    size: 'large',
  },
  variants: {
    controls: {
      false: {
        textAlign: 'left',
      },
    },
    hasUnit: {
      true: {
        padding: `${theme.space['1']} 0 ${theme.space['1']} ${theme.space['1']}`,
        textAlign: 'left',
      },
    },
    size: {
      large: {
        fontFamily: theme.typography.body.fontFamily,
        fontSize: theme.typography.body.fontSize,
        fontWeight: theme.typography.body.fontWeight,
        height: theme.sizing[SIZES.large],
        lineHeight: theme.typography.body.lineHeight,
      },
      medium: {
        height: theme.sizing[SIZES.medium],
      },
      small: {
        height: theme.sizing[SIZES.small],
      },
    },
  },
})

export const numberinputContainer = recipe({
  base: {
    alignItems: 'center',
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    selectors: {
      '&:focus-within': {
        borderColor: theme.colors.primary.borderHover,
        boxShadow: theme.shadows.focusPrimary,
      },
      '&:hover': {
        borderColor: theme.colors.primary.borderHover,
      },
    },
  },
  defaultVariants: {
    size: 'large',
    state: 'default',
  },
  variants: {
    size: {
      large: {
        height: theme.sizing[SIZES.large],
      },

      medium: {
        height: theme.sizing[SIZES.medium],
      },
      small: {
        height: theme.sizing[SIZES.small],
      },
    },
    state: {
      default: {},
      disabled: {
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
        selectors: {
          '&:hover': {
            borderColor: theme.colors.neutral.borderDisabled,
          },
        },
      },
      error: { borderColor: theme.colors.danger.border },
      readOnly: {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.border,
        cursor: 'not-allowed',
        selectors: {
          '&:focus-within': {
            borderColor: theme.colors.neutral.border,
          },
          '&:hover': {
            borderColor: theme.colors.neutral.border,
          },
        },
      },
      success: {
        borderColor: theme.colors.success.border,
      },
    },
  },
})
