import { theme } from '@ultraviolet/themes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import { SIZE_GAP_KEY, SIZE_HEIGHT, SIZE_PADDING_KEY } from './constants'

const { monochrome } = theme.colors.other

const sentiments = [
  'primary',
  'secondary',
  'danger',
  'info',
  'success',
  'warning',
  'neutral',
  'black',
  'white',
] as const

const FOCUS_RING_KEY = {
  black: 'focusNeutral',
  danger: 'focusDanger',
  info: 'focusInfo',
  neutral: 'focusNeutral',
  primary: 'focusPrimary',
  // @note: no focusSecondary so far, it will be added later, so far focusPrimary sounds fine
  secondary: 'focusPrimary',
  success: 'focusSuccess',
  warning: 'focusWarning',
  white: 'focusNeutral',
} as const

const sentimentThemeMap: Record<
  Exclude<(typeof sentiments)[number], 'black' | 'white'>,
  typeof theme.colors.primary
> = {
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  danger: theme.colors.danger,
  info: theme.colors.info,
  success: theme.colors.success,
  warning: theme.colors.warning,
  neutral: theme.colors.neutral,
}

function getFilledStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'black') {
    return {
      background: monochrome.black.background,
      color: monochrome.white.text,
      border: 'none',
      selectors: {
        '&:hover, &:active': {
          background: monochrome.black.backgroundHover,
          color: monochrome.white.textHover,
        },
        '&:disabled': {
          background: monochrome.black.backgroundDisabled,
          color: monochrome.black.textDisabled,
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  if (sentiment === 'white') {
    return {
      background: monochrome.white.background,
      color: monochrome.black.text,
      border: 'none',
      selectors: {
        '&:hover, &:active': {
          background: monochrome.white.backgroundHover,
          color: monochrome.black.textHover,
        },
        '&:disabled': {
          background: monochrome.white.backgroundDisabled,
          color: monochrome.white.textDisabled,
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  const selectedSentiment = sentimentThemeMap[sentiment]

  return {
    background: selectedSentiment.backgroundStrong,
    color: selectedSentiment.textStrong,
    border: 'none',
    selectors: {
      '&:hover, &:active': {
        background: selectedSentiment.backgroundStrongHover,
        color: selectedSentiment.textStrongHover,
      },
      '&:disabled': {
        background: selectedSentiment.backgroundStrongDisabled,
        color: selectedSentiment.textStrongDisabled,
      },
      '&:active:not(:disabled)': {
        boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
      },
    },
  }
}

function getOutlinedStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'black') {
    return {
      background: 'none',
      color: monochrome.black.text,
      border: `1px solid ${monochrome.black.border}`,
      selectors: {
        '&:hover, &:active': {
          background: monochrome.black.backgroundHover,
          color: monochrome.white.textHover,
          border: `1px solid ${monochrome.black.borderHover}`,
        },
        '&:disabled': {
          color: monochrome.black.textDisabled,
          border: `1px solid ${monochrome.black.borderDisabled}`,
          background: 'none',
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  if (sentiment === 'white') {
    return {
      background: 'none',
      color: monochrome.white.text,
      border: `1px solid ${monochrome.white.border}`,
      selectors: {
        '&:hover, &:active': {
          background: monochrome.white.backgroundHover,
          color: monochrome.black.textHover,
          border: `1px solid ${monochrome.white.borderHover}`,
        },
        '&:disabled': {
          color: monochrome.white.textDisabled,
          border: `1px solid ${monochrome.white.borderDisabled}`,
          background: 'none',
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  if (sentiment === 'neutral') {
    const selectedSentiment = sentimentThemeMap[sentiment]

    return {
      background: 'none',
      color: selectedSentiment.text,
      border: `1px solid ${selectedSentiment.borderStrong}`,
      selectors: {
        '&:hover, &:active': {
          background: selectedSentiment.backgroundHover,
          color: selectedSentiment.textHover,
          border: `1px solid ${selectedSentiment.borderStrongHover}`,
        },
        '&:disabled': {
          color: selectedSentiment.textDisabled,
          border: `1px solid ${selectedSentiment.borderStrongDisabled}`,
          background: 'none',
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  const selectedSentiment = sentimentThemeMap[sentiment]

  return {
    background: 'none',
    color: selectedSentiment.text,
    border: `1px solid ${selectedSentiment.border}`,
    selectors: {
      '&:hover, &:active': {
        background: selectedSentiment.backgroundHover,
        color: selectedSentiment.textHover,
        border: `1px solid ${selectedSentiment.borderHover}`,
      },
      '&:disabled': {
        color: selectedSentiment.textDisabled,
        border: `1px solid ${selectedSentiment.borderDisabled}`,
        background: 'none',
      },
      '&:active:not(:disabled)': {
        boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
      },
    },
  }
}

function getGhostStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'black') {
    return {
      background: 'none',
      color: monochrome.black.text,
      border: 'none',
      selectors: {
        '&:hover, &:active': {
          background: monochrome.black.backgroundHover,
          color: monochrome.white.textHover,
        },
        '&:disabled': {
          color: monochrome.black.textDisabled,
          background: 'none',
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  if (sentiment === 'white') {
    return {
      background: 'none',
      color: monochrome.white.text,
      border: 'none',
      selectors: {
        '&:hover, &:active': {
          background: monochrome.white.backgroundHover,
          color: monochrome.black.textHover,
        },
        '&:disabled': {
          color: monochrome.white.textDisabled,
          background: 'none',
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
      },
    }
  }
  const selectedSentiment = sentimentThemeMap[sentiment]

  return {
    background: 'none',
    color: selectedSentiment.text,
    border: 'none',
    selectors: {
      '&:hover, &:active': {
        background: selectedSentiment.backgroundHover,
        color: selectedSentiment.textHover,
      },
      '&:disabled': {
        color: selectedSentiment.textDisabled,
        background: 'none',
      },
      '&:active:not(:disabled)': {
        boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
      },
    },
  }
}

const sharedSizeStyled = {
  fontSize: theme.typography.bodySmallStrong.fontSize,
  fontFamily: theme.typography.bodySmallStrong.fontFamily,
  fontWeight: theme.typography.bodySmallStrong.weight,
  letterSpacing: theme.typography.bodySmallStrong.letterSpacing,
  lineHeight: theme.typography.bodySmallStrong.lineHeight,
}

export const button = recipe({
  base: {
    display: 'inline-flex',
    position: 'relative',
    flexDirection: 'row',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    outlineOffset: '2px',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    borderRadius: theme.radii.default,
    selectors: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  variants: {
    size: {
      large: {
        height: theme.sizing[SIZE_HEIGHT.large],
        paddingLeft: theme.space[SIZE_PADDING_KEY.large],
        paddingRight: theme.space[SIZE_PADDING_KEY.large],
        gap: theme.space[SIZE_GAP_KEY.large],
        fontSize: theme.typography.bodyStrong.fontSize,
        fontFamily: theme.typography.bodyStrong.fontFamily,
        fontWeight: theme.typography.bodyStrong.weight,
        letterSpacing: theme.typography.bodyStrong.letterSpacing,
        lineHeight: theme.typography.bodyStrong.lineHeight,
      },
      medium: {
        height: theme.sizing[SIZE_HEIGHT.medium],
        paddingLeft: theme.space[SIZE_PADDING_KEY.medium],
        paddingRight: theme.space[SIZE_PADDING_KEY.medium],
        gap: theme.space[SIZE_GAP_KEY.medium],
        ...sharedSizeStyled,
      },
      small: {
        height: theme.sizing[SIZE_HEIGHT.small],
        paddingLeft: theme.space[SIZE_PADDING_KEY.small],
        paddingRight: theme.space[SIZE_PADDING_KEY.small],
        gap: theme.space[SIZE_GAP_KEY.small],
        ...sharedSizeStyled,
      },
      xsmall: {
        height: theme.sizing[SIZE_HEIGHT.xsmall],
        paddingLeft: theme.space[SIZE_PADDING_KEY.xsmall],
        paddingRight: theme.space[SIZE_PADDING_KEY.xsmall],
        gap: theme.space[SIZE_GAP_KEY.xsmall],
        ...sharedSizeStyled,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'auto',
      },
    },
    sentiment: {
      primary: {},
      secondary: {},
      danger: {},
      info: {},
      success: {},
      warning: {},
      neutral: {},
      black: {},
      white: {},
    },
    variant: {
      filled: {},
      outlined: {},
      ghost: {},
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {
        cursor: 'pointer',
      },
    },
  },
  compoundVariants: [
    ...sentiments.map(sentiment => ({
      variants: { variant: 'filled' as const, sentiment },
      style: getFilledStyle(sentiment),
    })),
    ...sentiments.map(sentiment => ({
      variants: { variant: 'outlined' as const, sentiment },
      style: getOutlinedStyle(sentiment),
    })),
    ...sentiments.map(sentiment => ({
      variants: { variant: 'ghost' as const, sentiment },
      style: getGhostStyle(sentiment),
    })),
  ],
  defaultVariants: {
    size: 'large',
    fullWidth: false,
    disabled: false,
    variant: 'filled',
    sentiment: 'primary',
  },
})

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>
