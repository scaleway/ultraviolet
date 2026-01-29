import { theme } from '@ultraviolet/themes'
import type { CSSProperties } from '@vanilla-extract/css'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { THUMB_SIZE } from './constant'

export const tooltipLeft = createVar()
export const thumbColor = createVar()
export const leftVar = createVar()
export const leftOption = createVar()

export const sliderContainer = style({ marginBottom: theme.space[3] })

export const sliderTooltip = style({
  left: tooltipLeft,
  position: 'absolute',
  width: 'fit-content',
})

export const sliderDatalist = recipe({
  base: {
    display: 'flex',
    height: theme.typography.caption.lineHeight,
    position: 'relative',
    width: '100%',
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
    left: leftOption,
    position: 'absolute',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
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
  appearance: 'none',
  background: thumbColor,
  border: 'none',
  borderRadius: theme.radii.circle,
  boxShadow: `${theme.shadows.fixed[0]}, ${theme.shadows.fixed[1]}`,
  height: `${THUMB_SIZE}px`,
  pointerEvents: 'all',
  position: 'absolute',
  transition: 'background 0.3s ease-in-out',
  WebkitAppearance: 'none',
  width: `${THUMB_SIZE}px`,
} as CSSProperties

export const sliderThumbStyle = recipe({
  defaultVariants: {
    disabled: false,
    hasTooltipDouble: true,
    isDouble: false,
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          '&::-moz-range-thumb': {
            cursor: 'grab',
          },
          '&::-webkit-slider-thumb': {
            cursor: 'grab',
          },
          '&:active::-moz-range-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
            boxShadow: theme.shadows.focusPrimary,
            cursor: 'grabbing',
          },
          '&:active::-webkit-slider-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
            boxShadow: theme.shadows.focusPrimary,
            cursor: 'grabbing',
          },
          '&:hover::-moz-range-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
          },
          '&:hover::-webkit-slider-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
          },
        },
      },
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
    isDouble: {
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
      true: {
        selectors: {
          '&::-webkit-slider-thumb': {
            top: `${THUMB_SIZE / 8}px`,
          },
        },
      },
    },
  },
})

export const sliderDoubleText = recipe({
  variants: {
    isDouble: {
      false: {
        alignSelf: 'flex-end',
      },
      true: {
        alignSelf: 'center',
      },
    },
    isPadded: {
      true: {
        minWidth: theme.space[5],
      },
    },
  },
})

const trackStyle = {
  appearance: 'none',
  background: 'transparent',
  border: 'transparent',
  boxShadow: 'none',
  WebkitAppearance: 'none',
} as CSSProperties

export const sliderDouble = recipe({
  base: {
    appearance: 'none',
    background: 'transparent',
    outline: 'none',
    padding: 0,
    pointerEvents: 'none',
    position: 'absolute',
    selectors: {
      '&::-moz-range-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
      '&::-moz-range-track, &::-ms-track, &:focus::-webkit-slider-runnable-track':
        trackStyle,
      '&::-webkit-slider-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
        top: `calc(-1 * ${theme.space['1']})`,
      },
    },
    width: '100%',
  },
  defaultVariants: {
    disabled: false,
    hasTooltip: false,
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          '&:focus::-moz-slider-thumb, &:focus::-webkit-slider-thumb': {
            border: `1.5px solid ${theme.colors.primary.border}`,
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
      true: {},
    },

    hasTooltip: {
      true: {
        selectors: {
          '&::-moz-range-thumb': {
            transform: 'translate(0, -10px)',
          },
        },
      },
    },
  },
})

export const sliderSingle = recipe({
  base: {
    alignSelf: 'center',
    appearance: 'none',
    backgroundColor: theme.colors.neutral.borderWeak,
    backgroundImage: `linear-gradient(${theme.colors.primary.border}, ${theme.colors.primary.border})`,
    backgroundRepeat: 'no-repeat',
    borderRadius: theme.radii.default,
    height: theme.space[1],
    outline: 'none',
    position: 'relative',
    selectors: {
      '&::-moz-range-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
      '&::-webkit-slider-runnable-track, &::-moz-range-track': trackStyle,
      '&::-webkit-slider-thumb': {
        ...sliderThumbDefaultStyle,
        left: leftVar,
      },
    },
    width: '100%',
  },
  variants: {
    direction: {
      column: {
        alignSelf: 'baseline',
      },
      row: {},
    },
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
  },
})
export const sliderDoubleWrapper = style({
  alignItems: 'center',
  alignSelf: 'center',
  display: 'flex',
  height: theme.sizing[100],
  position: 'relative',
  width: ['-webkit-fill-available', '-moz-available'],
})

export const sliderCustomRail = style({
  background: theme.colors.neutral.borderWeak,
  borderRadius: theme.radii.default,
  height: theme.sizing[100],
  minWidth: '13.75rem',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '100%',
})

export const sliderInnerRail = recipe({
  base: {
    backgroundColor: theme.colors.primary.border,
    borderRadius: theme.radii.default,
    height: '100%',
    position: 'absolute',
  },
  defaultVariants: {
    disabled: false,
    error: false,
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: theme.colors.primary.borderDisabled,
      },
    },
    error: {
      true: {
        backgroundColor: theme.colors.danger.backgroundStrong,
      },
    },
  },
})

export const sliderNumberInput = style({ minWidth: theme.space[5] })
