import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { PROMINENCES } from './constants'
import capitalize from '../../utils/capitalize'

const TRANSITION_DURATION = 250

type ProminenceType = keyof typeof PROMINENCES

function getLinkStyle(
  sentiment: 'primary' | 'info',
  prominence: ProminenceType,
) {
  const definedProminence = capitalize(PROMINENCES[prominence])
  const text = `text${definedProminence}` as keyof typeof theme.colors.primary
  const textHover =
    `text${definedProminence}Hover` as keyof typeof theme.colors.primary

  return {
    color: theme.colors[sentiment][text] ?? theme.colors.neutral.text,
    selectors: {
      '&:hover': {
        textDecorationColor: theme.colors[sentiment][textHover],
        color: theme.colors[sentiment][textHover],
      },
      '&:focus': {
        textDecorationColor: theme.colors[sentiment][textHover],
        color: theme.colors[sentiment][textHover],
      },
      '&:active': {
        textDecorationThickness: '2px',
      },
      '&:visited': {
        color: theme.colors.primary[text],
        textDecorationColor: theme.colors.primary[textHover],
      },
    },
  }
}

function makeVariant(
  variant: 'captionStrong' | 'bodySmallStrong' | 'bodyStrong',
) {
  return {
    fontSize: theme.typography[variant].fontSize,
    fontFamily: theme.typography[variant].fontFamily,
    fontWeight: theme.typography[variant].weight,
    letterSpacing: theme.typography[variant].letterSpacing,
    lineHeight: theme.typography[variant].lineHeight,
    paragraphSpacing: theme.typography[variant].paragraphSpacing,
    textCase: theme.typography[variant].textCase,
  }
}

export const link = recipe({
  base: {
    backgroundColor: 'none',
    border: 'none',
    padding: 0,
    textDecoration: 'underline',
    textDecorationThickness: 1,
    textUnderlineOffset: 2,
    textDecorationColor: 'transparent',
    transition: `text-decoration-color ${TRANSITION_DURATION}ms ease-out`,
    gap: theme.space[1],
    position: 'relative',
    cursor: 'pointer',
    selectors: {
      '&:visited': {
        textDecoration: 'transparent',
      },
      '&:hover': {
        outline: 'none',
        textDecoration: 'underline',
        textDecorationThickness: 1,
      },
    },
  },
  variants: {
    sentiment: {
      primary: {
        selectors: {
          '&:hover::after': {
            backgroundColor: theme.colors.primary.text,
          },
          '&:focus::after': {
            backgroundColor: theme.colors.primary.text,
          },
        },
      },
      info: {
        selectors: {
          '&:hover::after': {
            backgroundColor: theme.colors.info.text,
          },
          '&:focus::after': {
            backgroundColor: theme.colors.info.text,
          },
        },
      },
    },
    prominence: Object.fromEntries(
      Object.keys(PROMINENCES).map(prominence => [prominence, {}]),
    ),
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
    type: {
      inline: {
        textDecoration: 'underline',
        textDecorationThickness: 1,
      },
      standalone: {},
    },
  },
  compoundVariants: [
    ...Object.keys(PROMINENCES).map(prominence => ({
      variants: {
        sentiment: 'primary' as const,
        prominence: prominence as ProminenceType,
      },
      style: getLinkStyle('primary', prominence as ProminenceType),
    })),
    ...Object.keys(PROMINENCES).map(prominence => ({
      variants: {
        sentiment: 'info' as const,
        prominence: prominence as ProminenceType,
      },
      style: getLinkStyle('info', prominence as ProminenceType),
    })),
  ],
  defaultVariants: {
    prominence: 'default',
    sentiment: 'info',
    oneLine: false,
    variant: 'bodyStrong',
    type: 'standalone',
  },
})

export const containerIconLink = style({
  display: 'inline-flex',
  paddingBottom: theme.space['0.5'],
})

/* Make this to have a global syle which does not depend on props
That way we do not have to target every possible variant in
icon styles */
export const defaultLink = style({})

export const iconLeftLink = style({
  marginRight: theme.space['0.5'],
  transition: `transform ${TRANSITION_DURATION}ms ease-out`,
  selectors: {
    [`${defaultLink}:hover &`]: {
      transform: `translate(0.25rem, 0)`,
    },
    [`${defaultLink}:focus &`]: {
      transform: `translate(0.25rem, 0)`,
    },
  },
})

// Use calc() instead of simply "-" because theme.space[0.25] is a var()
export const iconRightLink = style({
  marginLeft: theme.space['0.5'],
  transition: `transform ${TRANSITION_DURATION}ms ease-out`,
  selectors: {
    [`${defaultLink}:hover &`]: {
      transform: `translate(calc(${theme.space['0.25']}*-1), 0)`,
    },
    [`${defaultLink}:focus &`]: {
      transform: `translate(calc(${theme.space['0.25']}*-1), 0)`,
    },
  },
})

// Safari issue when something is inside an anchor
globalStyle(`${defaultLink} > * `, {
  pointerEvents: 'none',
})
