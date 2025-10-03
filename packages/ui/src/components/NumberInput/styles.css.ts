import { theme } from '@ultraviolet/themes'
import { styleVariants } from '@vanilla-extract/css'
import { SIZES } from './constant'
import { recipe } from '@vanilla-extract/recipes'

export const numberinputSideContainer = styleVariants({
  small: {
    padding: `${theme.space['0.25']} ${theme.space['1']}`,
    height: theme.sizing[SIZES.small],
  },
  medium: {
    padding: `${theme.space['0.25']} ${theme.space['1']}`,
    height: theme.sizing[SIZES.medium],
  },
  large: {
    padding: `${theme.space['0.5']} ${theme.space['1']}`,
    height: theme.sizing[SIZES.large],
  },
})

export const inputContainer = recipe({
  base: {
    borderWidth: '0 1px 0 1px',
    borderStyle: 'solid',
    borderColor: 'inherit',
    background: 'inherit',
    width: '100%',
  },
  variants: {
    controls: {
      false: {
        borderWidth: 0,
      },
    },
  },
  defaultVariants: {
    controls: true,
  },
})

export const unit = recipe({
  base: { display: 'flex', alignItems: 'center', padding: theme.space[1] },
  variants: {
    size: {
      small: {
        height: theme.sizing[SIZES.small],
        fontSize: theme.typography.bodySmall.fontSize,
      },

      medium: {
        height: theme.sizing[SIZES.medium],
        fontSize: theme.typography.bodySmall.fontSize,
      },

      large: {
        height: theme.sizing[SIZES.large],
        fontSize: theme.typography.body.fontSize,
      },
    },
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
  },
  defaultVariants: {
    size: 'large',
    disabled: false,
    readOnly: false,
  },
})

export const numberinput = recipe({
  base: {
    outline: 'none',
    border: 'none',
    width: '100%',
    color: theme.colors.neutral.text,
    fontSize: theme.typography.bodySmall.fontSize,
    fontFamily: theme.typography.bodySmall.fontFamily,
    fontWeight: theme.typography.bodySmall.fontWeight,
    lineHeight: theme.typography.bodySmall.lineHeight,
    textAlign: 'center',
    padding: theme.space[1],
    background: 'none',
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
  },
  variants: {
    hasUnit: {
      true: {
        textAlign: 'left',
        padding: `${theme.space['1']} 0 ${theme.space['1']} ${theme.space['1']}`,
      },
    },
    size: {
      small: {
        height: theme.sizing[SIZES.small],
      },
      medium: {
        height: theme.sizing[SIZES.medium],
      },
      large: {
        height: theme.sizing[SIZES.large],
        fontSize: theme.typography.body.fontSize,
        fontFamily: theme.typography.body.fontFamily,
        fontWeight: theme.typography.body.fontWeight,
        lineHeight: theme.typography.body.lineHeight,
      },
    },
    controls: {
      false: {
        textAlign: 'left',
      },
    },
  },
  defaultVariants: {
    hasUnit: false,
    size: 'large',
    controls: true,
  },
})

export const numberinputContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    border: `1px solid ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
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
  variants: {
    state: {
      default: {},
      success: {
        borderColor: theme.colors.success.border,
      },
      error: { borderColor: theme.colors.danger.border },
      readOnly: {
        borderColor: theme.colors.neutral.border,
        background: theme.colors.neutral.backgroundWeak,
        cursor: 'not-allowed',
        selectors: {
          '&:hover': {
            borderColor: theme.colors.neutral.border,
          },
          '&:focus-within': {
            borderColor: theme.colors.neutral.border,
          },
        },
      },
      disabled: {
        borderColor: theme.colors.neutral.borderDisabled,
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
        selectors: {
          '&:hover': {
            borderColor: theme.colors.neutral.borderDisabled,
          },
        },
      },
    },
    size: {
      small: {
        height: theme.sizing[SIZES.small],
      },

      medium: {
        height: theme.sizing[SIZES.medium],
      },

      large: {
        height: theme.sizing[SIZES.large],
      },
    },
  },
  defaultVariants: {
    size: 'large',
    state: 'default',
  },
})
