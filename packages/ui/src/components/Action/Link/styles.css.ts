import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import type { LinkSentiment, LinkProminence } from './constants'
import { PROMINENCES, SENTIMENTS } from './constants'

const TRANSITION_DURATION = 250

function getLinkStyle(sentiment: LinkSentiment, prominence: LinkProminence) {
  if (prominence === 'stronger') {
    return {
      color: theme.colors.neutral.textStronger,
      selectors: {
        '&:hover, &:focus': {
          color: theme.colors.neutral.textStrongerHover,
        },
      },
    }
  }

  const definedProminence = prominence === 'strong' ? 'Strong' : ''
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
      '&[target="_blank"]:is(:visited, :visited:hover, :visited:focus, :visited:active)': {
        color: theme.colors.secondary.text,
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
      info: {},
    },
    prominence: Object.fromEntries(PROMINENCES.map(prominence => [prominence, {}])),
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
    size: {
      xsmall: makeVariant('captionStrong'),
      small: makeVariant('bodySmallStrong'),
      large: makeVariant('bodyStrong'),
    },
  },
  compoundVariants: SENTIMENTS.flatMap(sentiment =>
    PROMINENCES.flatMap(prominence => [
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
    size: 'large',
  },
})

const openInNewIcon = styleVariants({
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
  transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`, // easeOutQuint
  selectors: {
    [`${defaultLink}:hover &, ${defaultLink}:focus &`]: {
      transform: `translate(${theme.space['0.25']}, 0)`,
    },
  },
})

const iconRight = style({
  marginLeft: theme.space['0.5'],
  transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`, // easeOutQuint
  selectors: {
    [`${defaultLink}:hover &, ${defaultLink}:focus &`]: {
      transform: `translate(calc(${theme.space['0.25']}*-1), 0)`, // Use calc() instead of simply "-" because theme.space[0.25] is a var()
    },
  },
})

// Safari issue when something is inside an anchor
globalStyle(`${defaultLink} > * `, {
  pointerEvents: 'none',
})

export const linkStyle = {
  link,
  openInNewIcon,
  defaultLink,
  iconLeft,
  iconRight,
}
