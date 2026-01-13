import { theme } from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import type { ExtendedColor } from '../../theme'
import { typography } from '../../theme'
import { PROMINENCES } from './constants'
import { placementText, whiteSpaceText } from './variables.css'

type TypographyKey = keyof typeof typography
type ProminenceProps = keyof typeof PROMINENCES

const variants = Object.keys(typography) as TypographyKey[]
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
const prominences = Object.keys(PROMINENCES) as (keyof typeof PROMINENCES)[]

function generateVariants() {
  return variants.reduce<Record<TypographyKey, object>>(
    (acc, key) => {
      acc[key] = {
        fontFamily: theme.typography[key].fontFamily,
        fontSize: theme.typography[key].fontSize,
        fontWeight: theme.typography[key].weight,
        letterSpacing: theme.typography[key].letterSpacing,
        lineHeight: theme.typography[key].lineHeight,
        textTransform: theme.typography[key].textCase,
      }

      return acc
    },
    {} as Record<TypographyKey, object>,
  )
}

function generateStyles(
  prominence: ProminenceProps,
  disabled: boolean,
  sentiment?: ExtendedColor,
) {
  const definedProminence =
    sentiment !== 'neutral' && prominence === 'stronger'
      ? capitalize(PROMINENCES.default)
      : capitalize(PROMINENCES[prominence])

  const isSentimentMonochrome = sentiment === 'black' || sentiment === 'white'

  const themeColor =
    sentiment && !isSentimentMonochrome
      ? theme.colors[sentiment as keyof typeof theme.colors]
      : undefined

  const text = `text${definedProminence}${
    disabled ? 'Disabled' : ''
  }` as keyof typeof themeColor

  const textColor =
    sentiment && !isSentimentMonochrome
      ? theme.colors[sentiment as keyof typeof theme.colors][text]
      : undefined

  if (sentiment) {
    return {
      color: isSentimentMonochrome
        ? theme.colors.other.monochrome[(sentiment as 'black') || 'white'].text
        : textColor,
    }
  }

  return {}
}

function getArrayOfVariants() {
  const array = sentiments.map(sentiment =>
    prominences.map(prominence => ({
      style: generateStyles(prominence, false, sentiment),
      variants: { disabled: false, prominence, sentiment },
    })),
  )

  return array.flat()
}

function getArrayOfVariantsDisabled() {
  const array = sentiments.map(sentiment =>
    prominences.map(prominence => ({
      style: generateStyles(prominence, true, sentiment),
      variants: { disabled: true, prominence, sentiment },
    })),
  )

  return array.flat()
}

function getArrayOfVariantNoSentiment() {
  const array = prominences.map(prominence => ({
    style: generateStyles(prominence, true),
    variants: { disabled: false, prominence },
  }))

  return array.flat()
}

export const text = recipe({
  base: {
    textAlign: placementText,
    whiteSpace: whiteSpaceText,
  },
  compoundVariants: [
    ...getArrayOfVariants(),
    ...getArrayOfVariantsDisabled(),
    ...getArrayOfVariantNoSentiment(),
  ],

  defaultVariants: {
    disabled: false,
    italic: false,
    oneLine: false,
    prominence: 'default',
    sentiment: undefined,
    strikeThrough: false,
    underline: false,
    variant: 'body',
  },
  variants: {
    disabled: {
      false: {},
      true: {},
    },
    italic: {
      false: {},
      true: {
        fontStyle: 'italic',
      },
    },

    oneLine: {
      false: {},
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    prominence: {
      default: {},
      strong: {},
      stronger: {},
      weak: {},
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
    strikeThrough: {
      false: {},
      true: {
        textDecoration: 'line-through',
      },
    },
    underline: {
      false: {},
      true: {
        textDecoration: 'underline',
      },
    },

    variant: generateVariants(),
  },
})

export type TextVariants = NonNullable<RecipeVariants<typeof text>>
