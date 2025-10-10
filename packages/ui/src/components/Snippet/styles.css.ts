import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const rowsVar = createVar()

export const pretext = recipe({
  base: {
    margin: 0,
    padding: theme.space[2],
    paddingRight: theme.space[9],
    height: 'auto',
    counterReset: 'section',
  },
  variants: {
    showMore: {
      true: {
        overflowX: 'hidden',
      },
      false: {
        overflowX: 'auto',
      },
    },
    noExpandable: {
      true: {
        maxHeight: `calc(${theme.typography.code.lineHeight} * ${rowsVar} + ${theme.space['3']})`,
        overflowY: 'scroll',
      },
      false: {
        overflowY: 'hidden',
      },
    },
  },
  defaultVariants: {
    noExpandable: false,
    showMore: false,
  },
})

export const line = recipe({
  base: {
    display: 'block',
    whiteSpace: 'pre',
  },
  variants: {
    multiline: {
      true: {
        selectors: {
          '&:nth-child(-n+2):after': {
            content: '',
            paddingRight: theme.space[8],
          },
        },
      },
      false: {
        selectors: {
          '&:after': {
            content: '',
            paddingRight: theme.space[8],
          },
        },
      },
    },
  },
  defaultVariants: {
    multiline: false,
  },
})

function makePrefix(type: 'lines' | 'command') {
  return {
    selectors: {
      '&:before': {
        color: theme.colors.neutral.textWeak,
        display: 'inline-flex',
        justifyContent: 'flex-end',
        counterIncrement: 'section',
        paddingRight: theme.space[1],
        width: type === 'lines' ? '35px' : '',
        content: type === 'lines' ? 'counter(section)' : "'$'",
      },
    },
  }
}

export const prefix = styleVariants({
  lines: makePrefix('lines'),
  command: makePrefix('command'),
})

const snippetContainerBase = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'start',
  maxWidth: '100%',
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
})

export const snippetContainer = styleVariants({
  oneLine: [snippetContainerBase],
  multiline: [snippetContainerBase, { width: '100%' }],
})

export const stackStyle = style({
  width: '100%',
})

const buttonContainerBase = style({
  position: 'absolute',
  top: 0,
  right: 0,
  background: theme.colors.neutral.backgroundWeak,
  borderRadius: theme.radii.default,
  border: '2px solid transparent',
})
export const buttonContainer = styleVariants({
  oneLine: [
    buttonContainerBase,
    { padding: `${theme.space['1']} ${theme.space['2']} 0 0` },
  ],
  multiline: [
    buttonContainerBase,
    {
      padding: `${theme.space['2']} ${theme.space['2']} 0 0`,
      boxShadow: ` -27px 0 19px -11px ${theme.colors.neutral.backgroundWeak}`,
    },
  ],
})

export const showMoreContainer = styleVariants({
  true: {
    width: '100%',
    boxShadow: 'none',
  },
  false: {
    width: '100%',
    boxShadow: `0px -22px 19px -6px ${theme.colors.neutral.backgroundWeak}`,
  },
})

export const showMoreButton = style({
  width: '100%',
  background: 'none',
  border: 'none',
  padding: theme.space[2],
  paddingTop: theme.space[1],
  cursor: 'pointer',
})

export const centeredText = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const animatedArrowIcon = styleVariants({
  true: {
    transform: 'rotate(180deg)',
    transformOrigin: 'center',
    transition: 'transform 300ms ease-in-out',
  },
  false: {
    transform: 'rotate(0deg)',
    transformOrigin: 'center',
    transition: 'transform 300ms ease-in-out',
  },
})
