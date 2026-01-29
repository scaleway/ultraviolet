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
  danger: theme.colors.danger,
  info: theme.colors.info,
  neutral: theme.colors.neutral,
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  success: theme.colors.success,
  warning: theme.colors.warning,
}

function getFilledStyle(sentiment: (typeof sentiments)[number]) {
  if (sentiment === 'black') {
    return {
      background: monochrome.black.background,
      border: 'none',
      color: monochrome.white.text,
      selectors: {
        '&:hover, &:active': {
          background: monochrome.black.backgroundHover,
          color: monochrome.white.textHover,
        },
        '&:active:not(:disabled)': {
          boxShadow: theme.shadows[FOCUS_RING_KEY[sentiment]],
        },
        '&:disabled': {
          background: monochrome.black.backgroundDisabled,
          color: monochrome.black.textDisabled,
        },
      },
    }
  }
  if (sentiment === 'white') {
    return {
      background: monochrome.white.background,
      border: 'none',
      color: monochrome.black.text,
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
    border: 'none',
    color: selectedSentiment.textStrong,
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
      border: `1px solid ${monochrome.black.border}`,
      color: monochrome.black.text,
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
      border: `1px solid ${monochrome.white.border}`,
      color: monochrome.white.text,
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
      border: `1px solid ${selectedSentiment.borderStrong}`,
      color: selectedSentiment.text,
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
    border: `1px solid ${selectedSentiment.border}`,
    color: selectedSentiment.text,
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
      border: 'none',
      color: monochrome.black.text,
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
      border: 'none',
      color: monochrome.white.text,
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
    border: 'none',
    color: selectedSentiment.text,
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
  fontFamily: theme.typography.bodySmallStrong.fontFamily,
  fontSize: theme.typography.bodySmallStrong.fontSize,
  fontWeight: theme.typography.bodySmallStrong.weight,
  letterSpacing: theme.typography.bodySmallStrong.letterSpacing,
  lineHeight: theme.typography.bodySmallStrong.lineHeight,
}

export const button = recipe({
  base: {
    alignItems: 'center',
    borderRadius: theme.radii.default,
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    outlineOffset: '2px',
    position: 'relative',
    selectors: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  compoundVariants: [
    ...sentiments.map(sentiment => ({
      style: getFilledStyle(sentiment),
      variants: { sentiment, variant: 'filled' as const },
    })),
    ...sentiments.map(sentiment => ({
      style: getOutlinedStyle(sentiment),
      variants: { sentiment, variant: 'outlined' as const },
    })),
    ...sentiments.map(sentiment => ({
      style: getGhostStyle(sentiment),
      variants: { sentiment, variant: 'ghost' as const },
    })),
  ],
  defaultVariants: {
    disabled: false,
    fullWidth: false,
    sentiment: 'primary',
    size: 'large',
    variant: 'filled',
  },
  variants: {
    disabled: {
      false: {
        cursor: 'pointer',
      },
      true: {
        cursor: 'not-allowed',
      },
    },
    fullWidth: {
      false: {
        width: 'auto',
      },
      true: {
        width: '100%',
      },
    },
    sentiment: {
      black: {},
      danger: {},
      info: {},
      neutral: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
      white: {},
    },
    size: {
      large: {
        fontFamily: theme.typography.bodyStrong.fontFamily,
        fontSize: theme.typography.bodyStrong.fontSize,
        fontWeight: theme.typography.bodyStrong.weight,
        gap: theme.space[SIZE_GAP_KEY.large],
        height: theme.sizing[SIZE_HEIGHT.large],
        letterSpacing: theme.typography.bodyStrong.letterSpacing,
        lineHeight: theme.typography.bodyStrong.lineHeight,
        paddingLeft: theme.space[SIZE_PADDING_KEY.large],
        paddingRight: theme.space[SIZE_PADDING_KEY.large],
      },
      medium: {
        gap: theme.space[SIZE_GAP_KEY.medium],
        height: theme.sizing[SIZE_HEIGHT.medium],
        paddingLeft: theme.space[SIZE_PADDING_KEY.medium],
        paddingRight: theme.space[SIZE_PADDING_KEY.medium],
        ...sharedSizeStyled,
      },
      small: {
        gap: theme.space[SIZE_GAP_KEY.small],
        height: theme.sizing[SIZE_HEIGHT.small],
        paddingLeft: theme.space[SIZE_PADDING_KEY.small],
        paddingRight: theme.space[SIZE_PADDING_KEY.small],
        ...sharedSizeStyled,
      },
      xsmall: {
        gap: theme.space[SIZE_GAP_KEY.xsmall],
        height: theme.sizing[SIZE_HEIGHT.xsmall],
        paddingLeft: theme.space[SIZE_PADDING_KEY.xsmall],
        paddingRight: theme.space[SIZE_PADDING_KEY.xsmall],
        ...sharedSizeStyled,
      },
    },
    variant: {
      filled: {},
      ghost: {},
      outlined: {},
    },
  },
})

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>
