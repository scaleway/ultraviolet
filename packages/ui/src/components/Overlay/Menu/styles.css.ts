import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES } from './constants'

export const heightMenu = createVar()

const ITEM_SENTIMENT = ['neutral', 'danger', 'primary'] as const

function makeItemStyle(sentiment: keyof typeof theme.colors, disabled: boolean) {
  const color = theme.colors[sentiment] as typeof theme.colors.neutral

  const base = {
    color: color[disabled ? 'textDisabled' : 'text'],
  }

  if (!disabled) {
    return {
      ...base,
      selectors: {
        "&:hover, &:focus-visible, &[data-active='true']": {
          backgroundColor: color.backgroundHover,
          color: color.textHover,
        },
      },
    }
  }

  return base
}

const menu = recipe({
  base: {
    backgroundColor: theme.colors.other.elevation.background.raised,
    boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
    maxWidth: SIZES.large,
    minWidth: SIZES.small,
    padding: `${theme.space['0.5']} 0`,
  },
  defaultVariants: {
    arrow: false,
    searchable: false,
  },
  variants: {
    arrow: {
      true: {
        selectors: {
          '&::after': {
            borderColor: `${theme.colors.other.elevation.background.raised} transparent transparent transparent`,
          },
        },
      },
    },
    searchable: {
      true: {
        minWidth: '20rem',
      },
    },
  },
})

const content = style({
  gap: theme.space['0.25'],
  overflow: 'auto',
  position: 'relative', // mitigate a scroll issue on Safari caused by the Tooltip of the CopyButton
})

const footer = style({ padding: theme.space[1] })

const list = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  maxHeight: `calc(${heightMenu} - ${theme.space['0.5']})`,
})

const searchInput = style({ padding: theme.space[1] })

const group = style({
  padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
  textAlign: 'left',
})

const itemContainer = recipe({
  base: {
    padding: `0 ${theme.space['0.5']}`,
    selectors: {
      '&:last-child': {
        border: 'none',
        marginBottom: 0,
        paddingBottom: 0,
      },
    },
    width: '100%',
  },
  defaultVariants: {
    borderless: false,
  },
  variants: {
    borderless: {
      false: {
        borderBottom: `1px solid ${theme.colors.neutral.border}`,
        marginBottom: theme.space['0.25'],
        paddingBottom: theme.space['0.5'],
      },
      true: {},
    },
  },
})

const item = recipe({
  base: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    borderRadius: theme.radii.default,
    cursor: 'pointer',
    display: 'flex',
    fontSize: theme.typography.bodySmall.fontSize,
    fontWeight: 'inherit',
    justifyContent: 'flex-start',
    lineHeight: theme.typography.bodySmall.lineHeight,
    maxHeight: theme.sizing[500],
    minHeight: theme.sizing[400],
    minWidth: '6.875rem',
    padding: `${theme.space['0.5']} ${theme.space['1']}`,
    selectors: {
      '&:focus': {
        textDecoration: 'none',
      },
    },
    textAlign: 'left',
    textDecoration: 'none',
    width: '100%',
  },
  compoundVariants: [
    ...ITEM_SENTIMENT.map(sentiment => ({
      style: makeItemStyle(sentiment, false),
      variants: {
        disabled: false,
        sentiment,
      },
    })),
    ...ITEM_SENTIMENT.map(sentiment => ({
      style: makeItemStyle(sentiment, true),
      variants: {
        disabled: true,
        sentiment,
      },
    })),
  ],
  defaultVariants: {
    disabled: false,
    sentiment: 'neutral',
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
    sentiment: Object.fromEntries(ITEM_SENTIMENT.map(sentiment => [sentiment, {}])),
  },
})

export const menuStyle = {
  menu,
  content,
  footer,
  list,
  searchInput,
  group,
  itemContainer,
  item,
}
