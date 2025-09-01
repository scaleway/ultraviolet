import { theme } from '@ultraviolet/themes'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import type { ExtendedColor } from 'src/theme'
import { typography } from '../../theme'
import { PROMINENCES } from './constant'
import capitalize from '../../utils/capitalize'
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
        fontSize: theme.typography[key].fontSize,
        fontFamily: theme.typography[key].fontFamily,
        fontWeight: theme.typography[key].weight,
        letterSpacing: theme.typography[key].letterSpacing,
        lineHeight: theme.typography[key].lineHeight,
        textTransform: theme.typography[key].textCase,
        textDecoration: theme.typography[key].textDecoration,
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
      color: !isSentimentMonochrome
        ? textColor
        : theme.colors.other.monochrome[(sentiment as 'black') || 'white'].text,
    }
  }

  return {}
}

function getArrayOfVariants() {
  const array = sentiments.map(sentiment =>
    prominences.map(prominence => ({
      variants: { sentiment, prominence, disabled: false },
      style: generateStyles(prominence, false, sentiment),
    })),
  )

  return array.flat()
}

function getArrayOfVariantsDisabled() {
  const array = sentiments.map(sentiment =>
    prominences.map(prominence => ({
      variants: { sentiment, prominence, disabled: true },
      style: generateStyles(prominence, true, sentiment),
    })),
  )

  return array.flat()
}

function getArrayOfVariantNoSentiment() {
  const array = prominences.map(prominence => ({
    variants: { prominence, disabled: false },
    style: generateStyles(prominence, true),
  }))

  return array.flat()
}

export const text = recipe({
  base: {
    textAlign: placementText,
    whiteSpace: whiteSpaceText,
  },
  variants: {
    strikeThrough: {
      true: {
        textDecoration: 'line-through',
      },
      false: {},
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
      false: {},
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
      false: {},
    },

    oneLine: {
      true: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      false: {},
    },
    sentiment: {
      primary: {},
      secondary: {},
      neutral: {},
      success: {},
      danger: {},
      warning: {},
      info: {},
      black: {},
      white: {},
    },
    prominence: {
      default: {},
      strong: {},
      stronger: {},
      weak: {},
    },

    variant: generateVariants(),
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    ...getArrayOfVariants(),
    ...getArrayOfVariantsDisabled(),
    ...getArrayOfVariantNoSentiment(),
  ],

  defaultVariants: {
    strikeThrough: false,
    italic: false,
    underline: false,
    oneLine: false,
    sentiment: undefined,
    prominence: 'default',
    variant: 'body',
    disabled: false,
  },
})

export type TextVariants = NonNullable<RecipeVariants<typeof text>>
