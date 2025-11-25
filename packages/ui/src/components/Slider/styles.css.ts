import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import type { CSSProperties } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { THUMB_SIZE } from './constant'

export const tooltipLeft = createVar()
export const thumbColor = createVar()
export const leftVar = createVar()
export const leftOption = createVar()

export const sliderContainer = style({ marginBottom: theme.space[3] })

export const sliderTooltip = style({
  width: 'fit-content',
  position: 'absolute',
  left: tooltipLeft,
})

export const sliderDatalist = recipe({
  base: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    height: theme.typography.caption.lineHeight,
  },
  variants: {
    double: {
      true: {
        marginTop: theme.space[5],
      },
    },
  },
})

export const sliderOption = recipe({
  base: {
    display: 'flex',
    whiteSpace: 'nowrap',
    left: leftOption,
    position: 'absolute',
    transform: 'translateX(-50%)',
  },
  variants: {
    left: {
      true: { transform: 'none' },
    },
    right: {
      true: { transform: 'translateX(-100%)' },
    },
  },
})

const sliderThumbDefaultStyle = {
  WebkitAppearance: 'none',
  appearance: 'none',
  pointerEvents: 'all',
  width: `${THUMB_SIZE}px`,
  height: `${THUMB_SIZE}px`,
  background: thumbColor,
  boxShadow: `${theme.shadows.fixed[0]}, ${theme.shadows.fixed[1]}`,
  borderRadius: theme.radii.circle,
  border: 'none',
  transition: 'background 0.3s ease-in-out',
  position: 'absolute',
} as CSSProperties

export const sliderThumbStyle = recipe({
  variants: {
    disabled: {
      true: {
        selectors: {
          '&::-moz-range-thumb': {
            cursor: 'not-allowed',
          },
          '&::-webkit-slider-thumb': {
            cursor: 'not-allowed',
          },
        },
      },
      false: {
        selectors: {
          '&::-webkit-slider-thumb': {
            cursor: 'grab',
          },
          '&::-moz-range-thumb': {
            cursor: 'grab',
          },
          '&:hover::-moz-range-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
          },
          '&:hover::-webkit-slider-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
          },
          '&:active::-moz-range-thumb': {
            cursor: 'grabbing',
            boxShadow: theme.shadows.focusPrimary,
            border: `1.5px solid ${theme.colors.primary.border}`,
          },
          '&:active::-webkit-slider-thumb': {
            cursor: 'grabbing',
            boxShadow: theme.shadows.focusPrimary,
            border: `1.5px solid ${theme.colors.primary.border}`,
          },
        },
      },
    },
    isDouble: {
      true: {
        selectors: {
          '&::-webkit-slider-thumb': {
            top: `${THUMB_SIZE / 8}px`,
          },
        },
      },
      false: {
        selectors: {
          '&::-moz-range-thumb': {
            top: `-${THUMB_SIZE / 4}px`,
          },
          '&::-webkit-slider-thumb': {
            top: `-${THUMB_SIZE / 4}px`,
          },
        },
      },
    },
    hasTooltipDouble: {
      false: {
        selectors: {
          '&::-webkit-slider-thumb': {
            top: `-${THUMB_SIZE / 2}px`,
          },
        },
      },
    },
  },
  defaultVariants: {
    disabled: false,
    isDouble: false,
    hasTooltipDouble: true,
  },
})

export const sliderDoubleText = recipe({
  variants: {
    isPadded: {
      true: {
        minWidth: theme.space[5],
      },
    },
    isDouble: {
      true: {
        alignSelf: 'center',
      },
      false: {
        alignSelf: 'end',
      },
    },
  },
})

const trackStyle = {
  appearance: 'none',
  WebkitAppearance: 'none',
  boxShadow: 'none',
  border: 'transparent',
  background: 'transparent',
} as CSSProperties

export const sliderDouble = recipe({
  base: {
    position: 'absolute',
    width: '100%',
    pointerEvents: 'none',
    appearance: 'none',
    padding: 0,
    background: 'transparent',
    outline: 'none',

    selectors: {
      '&::-moz-range-track, &::-ms-track, &:focus::-webkit-slider-runnable-track':
        trackStyle,
      '&::-moz-range-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
      '&::-webkit-slider-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
    },
  },
  variants: {
    disabled: {
      true: {},
      false: {
        selectors: {
          '&:focus::-moz-slider-thumb, &:focus::-webkit-slider-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
    },

    hasTooltip: {
      true: {
        transform: 'translate(0, -10px)',
      },
    },
  },
  defaultVariants: {
    disabled: false,
    hasTooltip: false,
  },
})

export const sliderSingle = recipe({
  base: {
    appearance: 'none',
    height: theme.space[1],
    width: '100%',
    position: 'relative',
    backgroundColor: theme.colors.neutral.borderWeak,
    borderRadius: theme.radii.default,
    backgroundImage: `linear-gradient(${theme.colors.primary.border}, ${theme.colors.primary.border})`,
    backgroundRepeat: 'no-repeat',
    alignSelf: 'center',
    outline: 'none',
    selectors: {
      '&::-webkit-slider-runnable-track, &::-moz-range-track': trackStyle,
      '&::-moz-range-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
      '&::-webkit-slider-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
    },
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          '&:focus::-moz-range-thumb': {
            border: `1px solid ${theme.colors.primary.border}`,
            boxShadow: theme.shadows.focusPrimary,
          },
          '&:focus::-webkit-slider-thumb': {
            border: `1px solid ${theme.colors.primary.border}`,
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
      true: {
        backgroundImage: `linear-gradient(${theme.colors.primary.borderDisabled}, ${theme.colors.primary.borderDisabled})`,
      },
    },
    error: {
      true: {
        backgroundImage: `linear-gradient(${theme.colors.danger.backgroundStrong}, ${theme.colors.danger.backgroundStrong})`,
      },
    },
    direction: {
      column: {
        alignSelf: 'baseline',
      },
      row: {},
    },
  },
})
export const sliderDoubleWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: ['-webkit-fill-available', '-moz-available'],
  height: theme.sizing[100],
  alignSelf: 'center',
})

export const sliderCustomRail = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  height: theme.sizing[100],
  width: '100%',
  minWidth: '13.75rem',
  borderRadius: theme.radii.default,
  background: theme.colors.neutral.borderWeak,
})

export const sliderInnerRail = recipe({
  base: {
    position: 'absolute',
    height: '100%',
    backgroundColor: theme.colors.primary.border,
    borderRadius: theme.radii.default,
  },
  variants: {
    error: {
      true: {
        backgroundColor: theme.colors.danger.backgroundStrong,
      },
    },
    disabled: {
      true: {
        backgroundColor: theme.colors.primary.borderDisabled,
      },
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
})

export const sliderNumberInput = style({ minWidth: theme.space[5] })
