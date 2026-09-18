import { theme } from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const SENTIMENTS = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const

const tagLink = style({
  selectors: { '&&': { padding: 0, gap: 0 } },
})

const separator = style({
  selectors: { '&&': { height: theme.sizing[300] } },
})

const idStackBase = style({})

const idStack = styleVariants(
  Object.fromEntries(
    SENTIMENTS.map(sentiment => [
      sentiment,
      {
        backgroundColor: theme.colors[sentiment][sentiment === 'neutral' ? 'backgroundStrong' : 'background'],

        padding: `${theme.space['0.5']} ${theme.space[1]}`,
        height: '100%',
      },
    ]),
  ),
)

const linkStack = recipe({
  base: {
    paddingInline: theme.space['1'],
    paddingBlock: theme.space[0.5],
    background: theme.colors.neutral.background,
  },
  variants: {
    copiable: {
      true: {
        paddingRight: 0,
      },
    },
  },
})

const link = styleVariants({
  code: {
    fontFamily: theme.typography.code.fontFamily,
  },
  default: {},
})

const copyButton = styleVariants(
  Object.fromEntries(
    SENTIMENTS.map(sentiment => [
      sentiment,
      {
        borderRadius: 0,
        borderRight: '1px solid transparent',
        selectors: {
          '&:active': {
            boxShadow: `inset ${theme.shadows[`focus${capitalize(sentiment)}` as keyof typeof theme.shadows]}`,
          },
          '&:hover': {
            borderRight: `1px solid ${theme.colors[sentiment].border}`,
          },
        },
      },
    ]),
  ),
)

globalStyle(`${idStackBase} > svg, ${idStackBase} > img`, {
  height: theme.sizing[150],
  width: theme.sizing[150],
  minHeight: theme.sizing[150],
  minWidth: theme.sizing[150],
})

export const tagLinkStyle = {
  tagLink,
  separator,
  idStack,
  idStackBase,
  linkStack,
  link,
  copyButton,
}
