import type {
  ExtendedColor,
  TextStyleObject,
  TextVariant,
} from '@ultraviolet/themes'
import { isColorMonochrome, textVariants, theme } from '@ultraviolet/themes'
import { capitalize, filterByProperty } from '@ultraviolet/utils'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'
import { PROMINENCES } from './constants'
import { textVars } from './variables.css'

type ProminenceProps = keyof typeof PROMINENCES

const isStronger = (prominence: ProminenceProps): prominence is 'stronger' =>
  prominence === 'stronger'

const isStrong = (prominence: ProminenceProps): prominence is 'strong' =>
  prominence === 'strong'

const isWeak = (prominence: ProminenceProps): prominence is 'weak' =>
  prominence === 'weak'

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

type StyleText = Omit<
  TextStyleObject,
  'paragraphSpacing' | 'textCase' | 'textDecoration' | 'weight'
> & {
  textTransform: string
}

function generateVariants() {
  return textVariants.reduce<Record<TextVariant, StyleText>>(
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
    {} as Record<TextVariant, StyleText>,
  )
}

function generateStyles(
  prominence: ProminenceProps,
  disabled: boolean,
  sentiment?: ExtendedColor,
) {
  if (isColorMonochrome(sentiment)) {
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

  return { color: 'inherit' }
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
    ...getArrayOfVariantNoSentiment(),
    ...getArrayOfVariantsDisabled(),
    ...getArrayOfVariants(),
  ],
  'style',
)

const variant = generateVariants()

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
      true: {},
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    oneLine: {
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
      true: {
        textDecoration: 'line-through',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
    variant,
  },
})

export type TextVariants = NonNullable<RecipeVariants<typeof text>>
