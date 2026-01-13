import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const rowsVar = createVar()

export const pretext = recipe({
  base: {
    counterReset: 'section',
    height: 'auto',
    margin: 0,
    padding: theme.space[2],
    paddingRight: theme.space[9],
  },
  defaultVariants: {
    noExpandable: false,
    showMore: false,
  },
  variants: {
    noExpandable: {
      false: {
        overflowY: 'hidden',
      },
      true: {
        maxHeight: `calc(${theme.typography.code.lineHeight} * ${rowsVar} + ${theme.space['3']})`,
        overflowY: 'scroll',
      },
    },
    showMore: {
      false: {
        overflowX: 'auto',
      },
      true: {
        overflowX: 'hidden',
      },
    },
  },
})

export const line = recipe({
  base: {
    display: 'block',
    whiteSpace: 'pre',
  },
  defaultVariants: {
    multiline: false,
  },
  variants: {
    multiline: {
      false: {
        selectors: {
          '&:after': {
            content: '',
            paddingRight: theme.space[8],
          },
        },
      },
      true: {
        selectors: {
          '&:nth-child(-n+2):after': {
            content: '',
            paddingRight: theme.space[8],
          },
        },
      },
    },
  },
})

function makePrefix(type: 'lines' | 'command') {
  return {
    selectors: {
      '&:before': {
        color: theme.colors.neutral.textWeak,
        content: type === 'lines' ? 'counter(section)' : "'$'",
        counterIncrement: 'section',
        display: 'inline-flex',
        justifyContent: 'flex-end',
        paddingRight: theme.space[1],
        width: type === 'lines' ? '35px' : '',
      },
    },
  }
}

export const prefix = styleVariants({
  command: makePrefix('command'),
  lines: makePrefix('lines'),
})

const snippetContainerBase = style({
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  display: 'flex',
  justifyContent: 'start',
  maxWidth: '100%',
  position: 'relative',
})

export const snippetContainer = styleVariants({
  multiline: [snippetContainerBase, { width: '100%' }],
  oneLine: [snippetContainerBase],
})

export const stackStyle = style({
  width: '100%',
})

const buttonContainerBase = style({
  background: theme.colors.neutral.backgroundWeak,
  border: '2px solid transparent',
  borderRadius: theme.radii.default,
  position: 'absolute',
  right: 0,
  top: 0,
})
export const buttonContainer = styleVariants({
  multiline: [
    buttonContainerBase,
    {
      boxShadow: ` -27px 0 19px -11px ${theme.colors.neutral.backgroundWeak}`,
      padding: `${theme.space['2']} ${theme.space['2']} 0 0`,
    },
  ],
  oneLine: [
    buttonContainerBase,
    { padding: `${theme.space['1']} ${theme.space['2']} 0 0` },
  ],
})

export const showMoreContainer = styleVariants({
  false: {
    boxShadow: `0px -22px 19px -6px ${theme.colors.neutral.backgroundWeak}`,
    width: '100%',
  },
  true: {
    boxShadow: 'none',
    width: '100%',
  },
})

export const showMoreButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: theme.space[2],
  paddingTop: theme.space[1],
  width: '100%',
})

export const centeredText = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
})

export const animatedArrowIcon = styleVariants({
  false: {
    transform: 'rotate(0deg)',
    transformOrigin: 'center',
    transition: 'transform 300ms ease-in-out',
  },
  true: {
    transform: 'rotate(180deg)',
    transformOrigin: 'center',
    transition: 'transform 300ms ease-in-out',
  },
})
