import { theme } from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { PROMINENCES } from './constants'

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
      '&:active': {
        textDecorationThickness: '2px',
      },
      '&:focus': {
        color: theme.colors[sentiment][textHover],
        textDecorationColor: theme.colors[sentiment][textHover],
      },
      '&:hover': {
        color: theme.colors[sentiment][textHover],
        textDecorationColor: theme.colors[sentiment][textHover],
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
    fontFamily: theme.typography[variant].fontFamily,
    fontSize: theme.typography[variant].fontSize,
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
    cursor: 'pointer',
    gap: theme.space[1],
    padding: 0,
    position: 'relative',
    selectors: {
      '&:hover': {
        outline: 'none',
        textDecoration: 'underline',
        textDecorationThickness: 1,
      },
      '&:visited': {
        textDecoration: 'transparent',
      },
    },
    textDecoration: 'underline',
    textDecorationColor: 'transparent',
    textDecorationThickness: 1,
    textUnderlineOffset: 2,
    transition: `text-decoration-color ${TRANSITION_DURATION}ms ease-out`,
  },
  compoundVariants: [
    ...Object.keys(PROMINENCES).map(prominence => ({
      style: getLinkStyle('primary', prominence as ProminenceType),
      variants: {
        prominence: prominence as ProminenceType,
        sentiment: 'primary' as const,
      },
    })),
    ...Object.keys(PROMINENCES).map(prominence => ({
      style: getLinkStyle('info', prominence as ProminenceType),
      variants: {
        prominence: prominence as ProminenceType,
        sentiment: 'info' as const,
      },
    })),
  ],
  defaultVariants: {
    oneLine: false,
    prominence: 'default',
    sentiment: 'info',
    type: 'standalone',
    variant: 'bodyStrong',
  },
  variants: {
    oneLine: {
      false: {
        width: 'fit-content',
      },
      true: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    prominence: Object.fromEntries(
      Object.keys(PROMINENCES).map(prominence => [prominence, {}]),
    ),
    sentiment: {
      info: {
        selectors: {
          '&:focus::after': {
            backgroundColor: theme.colors.info.text,
          },
          '&:hover::after': {
            backgroundColor: theme.colors.info.text,
          },
        },
      },
      primary: {
        selectors: {
          '&:focus::after': {
            backgroundColor: theme.colors.primary.text,
          },
          '&:hover::after': {
            backgroundColor: theme.colors.primary.text,
          },
        },
      },
    },
    type: {
      inline: {
        textDecoration: 'underline',
        textDecorationThickness: 1,
      },
      standalone: {},
    },
    variant: {
      bodySmallStrong: makeVariant('bodySmallStrong'),
      bodyStrong: makeVariant('bodyStrong'),
      captionStrong: makeVariant('captionStrong'),
    },
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
  selectors: {
    [`${defaultLink}:hover &`]: {
      transform: 'translate(0.25rem, 0)',
    },
    [`${defaultLink}:focus &`]: {
      transform: 'translate(0.25rem, 0)',
    },
  },
  transition: `transform ${TRANSITION_DURATION}ms ease-out`,
})

// Use calc() instead of simply "-" because theme.space[0.25] is a var()
export const iconRightLink = style({
  marginLeft: theme.space['0.5'],
  selectors: {
    [`${defaultLink}:hover &`]: {
      transform: `translate(calc(${theme.space['0.25']}*-1), 0)`,
    },
    [`${defaultLink}:focus &`]: {
      transform: `translate(calc(${theme.space['0.25']}*-1), 0)`,
    },
  },
  transition: `transform ${TRANSITION_DURATION}ms ease-out`,
})

// Safari issue when something is inside an anchor
globalStyle(`${defaultLink} > * `, {
  pointerEvents: 'none',
})
