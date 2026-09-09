import { theme } from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import type { LinkSentiment, ProminenceType } from './constants'
import { PROMINENCE_VALUES, PROMINENCES, SENTIMENTS } from './constants'

const TRANSITION_DURATION = 250

function getLinkStyle(sentiment: LinkSentiment, prominence: ProminenceType) {
  const definedProminence = capitalize(PROMINENCES[prominence])
  const text = `text${definedProminence}` as const
  const textHover = `text${definedProminence}Hover` as const

  return {
    color: theme.colors[sentiment][text] ?? theme.colors.neutral.text,
    selectors: {
      '&:hover, &:focus': {
        color: theme.colors[sentiment][textHover],
      },
    },
  }
}

function makeVariant(variant: 'captionStrong' | 'bodySmallStrong' | 'bodyStrong') {
  return {
    fontSize: theme.typography[variant].fontSize,
    fontFamily: theme.typography[variant].fontFamily,
    fontWeight: theme.typography[variant].weight,
    letterSpacing: theme.typography[variant].letterSpacing,
    lineHeight: theme.typography[variant].lineHeight,
  }
}

const link = recipe({
  base: {
    border: 'none',
    padding: 0,
    textDecoration: 'underline 1px dotted',
    textUnderlineOffset: '3px',
    position: 'relative',
    cursor: 'pointer',
    selectors: {
      '&:hover, &:focus, &:active': {
        textDecoration: 'underline',
      },
      '&:active': {
        textDecorationThickness: '2px',
      },
    },
  },
  variants: {
    sentiment: {
      primary: {},
      success: {},
      warning: {},
      danger: {},
      neutral: {},
      info: {
        selectors: {
          '&:visited, &:visited:hover, &:visited:focus, &:visited:active': {
            color: theme.colors.secondary.text,
          },
        },
      },
    },
    prominence: Object.fromEntries(PROMINENCE_VALUES.map(prominence => [prominence, {}])),
    oneLine: {
      true: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
      },
      false: {
        width: 'fit-content',
      },
    },
    variant: {
      captionStrong: makeVariant('captionStrong'),
      bodySmallStrong: makeVariant('bodySmallStrong'),
      bodyStrong: makeVariant('bodyStrong'),
    },
  },
  compoundVariants: SENTIMENTS.flatMap(sentiment =>
    PROMINENCE_VALUES.flatMap(prominence => [
      {
        variants: {
          sentiment: sentiment,
          prominence,
        },
        style: getLinkStyle(sentiment, prominence),
      },
    ]),
  ),
  defaultVariants: {
    prominence: 'default',
    oneLine: false,
    variant: 'bodyStrong',
  },
})

const externalIcon = styleVariants({
  large: {
    marginBottom: theme.space['0.5'],
  },
  small: {
    marginBottom: theme.space['0.25'],
  },
  xsmall: {
    marginBottom: 0,
  },
})

/* Make this to have a global syle which does not depend on props
That way we do not have to target every possible variant in
icon styles */
const defaultLink = style({})

const iconLeft = style({
  marginRight: theme.space['0.5'],
  transition: `transform ${TRANSITION_DURATION}ms ease-out`,
  selectors: {
    [`${defaultLink}:hover &, ${defaultLink}:focus &`]: {
      transform: `translate(${theme.space['0.25']}, 0)`,
    },
  },
})

// Use calc() instead of simply "-" because theme.space[0.25] is a var()
const iconRight = style({
  marginLeft: theme.space['0.5'],
  transition: `transform ${TRANSITION_DURATION}ms ease-out`,
  selectors: {
    [`${defaultLink}:hover &, ${defaultLink}:focus &`]: {
      transform: `translate(calc(${theme.space['0.25']}*-1), 0)`,
    },
  },
})

// Safari issue when something is inside an anchor
globalStyle(`${defaultLink} > * `, {
  pointerEvents: 'none',
})

export const linkStyle = {
  link,
  externalIcon,
  defaultLink,
  iconLeft,
  iconRight,
}
