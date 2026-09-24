import { theme } from '@ultraviolet/themes'
import { capitalize } from '@ultraviolet/utils'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const SENTIMENTS = ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] as const

const tagLink = style({
  selectors: { '&&': { padding: 0, gap: 0 } },
})

const idStackBase = style({
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
  height: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
})

const idStack = styleVariants(
  Object.fromEntries(
    SENTIMENTS.map(sentiment => [
      sentiment,
      {
        backgroundColor: theme.colors[sentiment][sentiment === 'neutral' ? 'backgroundStrong' : 'background'],
        borderRight: `1px solid ${theme.colors[sentiment].border}`,
        borderRadius: `${theme.radii.default} 0 0 ${theme.radii.default}`,
      },
    ]),
  ),
)

const linkStack = recipe({
  base: {
    paddingInline: theme.space['1'],
    paddingBlock: theme.space[0.5],
    background: theme.colors.neutral.background,
    height: '100%',
    minWidth: 0,
  },
  variants: {
    copiable: {
      true: {
        paddingRight: 0,
      },
    },
    closable: {
      false: {
        borderRadius: `0 ${theme.radii.default} ${theme.radii.default} 0`,
      },
    },
  },
})

const linkBase = style({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  display: 'block',
})
const link = styleVariants({
  code: [
    linkBase,
    {
      fontFamily: theme.typography.code.fontFamily,
    },
  ],
  default: [linkBase],
})

const copyButton = recipe({
  variants: {
    closable: {
      false: {
        borderRadius: `0 ${theme.radii.default} ${theme.radii.default} 0`,
      },
      true: {
        borderRadius: 0,
      },
    },
    sentiment: Object.fromEntries(
      SENTIMENTS.map(sentiment => [
        sentiment,
        {
          border: '1px solid transparent',
          selectors: {
            '&&:active': {
              boxShadow: `inset ${theme.shadows[`focus${capitalize(sentiment)}`]}`,
            },
            '&&:hover': {
              height: `calc(${theme.sizing[300]} - 2px)`, // to avoid overflow:hidden (which overflows the focus ring), manually set the copyButton height to be the height of the tag (minus border)
            },
          },
        },
      ]),
    ),
  },
})

globalStyle(`${idStackBase} > svg, ${idStackBase} > img`, {
  height: theme.sizing[150],
  width: theme.sizing[150],
  minHeight: theme.sizing[150],
  minWidth: theme.sizing[150],
})

export const tagLinkStyle = {
  tagLink,
  idStack,
  idStackBase,
  linkStack,
  link,
  copyButton,
}
