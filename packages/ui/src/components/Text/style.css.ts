import type { ExtendedColor, TextVariant } from '@ultraviolet/themes'
import {
  consoleLightTheme,
  isSentimentMonochrome,
  theme,
} from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import { PROMINENCES } from './constants'
import { textVars } from './variables.css'

type ProminenceProps = keyof typeof PROMINENCES

const variants = Object.keys(consoleLightTheme.typography) as TextVariant[]
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
  return variants.reduce<Record<TextVariant, object>>(
    (acc, key) => {
      acc[key] = {
        fontFamily: theme.typography[key].fontFamily,
        fontSize: theme.typography[key].fontSize,
        fontWeight: theme.typography[key].weight,
        letterSpacing: theme.typography[key].letterSpacing,
        lineHeight: theme.typography[key].lineHeight,
        textTransform: theme.typography[key].textCase,
      } as const

      return acc
    },
    {} as Record<TextVariant, object>,
  )
}

const isStronger = (prominence: ProminenceProps): prominence is 'stronger' =>
  prominence === 'stronger'

const isStrong = (prominence: ProminenceProps): prominence is 'strong' =>
  prominence === 'strong'

const isWeak = (prominence: ProminenceProps): prominence is 'weak' =>
  prominence === 'weak'

const filterByProperty = <T, K extends keyof T>(
  arr: T[],
  key: K,
): (T & { [P in K]: NonNullable<T[P]> })[] =>
  arr.filter(item => item[key] !== undefined) as unknown as (T & {
    [P in K]: NonNullable<T[P]>
  })[]

function generateStyles(
  prominence: ProminenceProps,
  disabled: boolean,
  sentiment?: ExtendedColor,
) {
  if (isSentimentMonochrome(sentiment)) {
    return { color: theme.colors.other.monochrome[sentiment].text }
  }

  if (sentiment === 'neutral') {
    const definedProminence = capitalize(PROMINENCES[prominence])
    const text =
      `text${definedProminence}${disabled ? 'Disabled' : ''}` as const

    return { color: theme.colors[sentiment][text] }
  }

  /*
   * Actually (weak | stronger | strong) prominence are only define inside neutral sentiment.
   * We should ask to define theses var inside the theme instead
   */
  if (sentiment) {
    if (
      !(isWeak(prominence) || isStronger(prominence) || isStrong(prominence))
    ) {
      const definedProminence = capitalize(PROMINENCES[prominence])
      const text =
        `text${definedProminence}${disabled ? 'Disabled' : ''}` as const

      return { color: theme.colors[sentiment][text] }
    }

    const text = `text${disabled ? 'Disabled' : ''}` as const

    return { color: theme.colors[sentiment][text] }
  }

  // return undefined to filter on empty variant instead of {}
  return undefined
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
const compoundVariants = filterByProperty(
  [
    ...getArrayOfVariants(),
    ...getArrayOfVariantsDisabled(),
    ...getArrayOfVariantNoSentiment(),
  ],
  'style',
)

export const text = recipe({
  base: {
    textAlign: textVars.textAlign,
    whiteSpace: textVars.whiteSpace,
  },
  compoundVariants,
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
