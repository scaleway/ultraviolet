import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES } from './constants'

export const heightMenu = createVar()
export const heightAvailableSpace = createVar()

const ANIMATION_DURATION = 200 // in ms
const ITEM_SENTIMENT = ['neutral', 'danger', 'primary'] as const

function makeItemStyle(
  sentiment: keyof typeof theme.colors,
  disabled: boolean,
) {
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
export const menu = recipe({
  base: {
    backgroundColor: theme.colors.other.elevation.background.raised,
    boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
    maxWidth: SIZES.large,
    minWidth: SIZES.small,
    padding: `${theme.space['0.25']} 0`,
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

export const menuContent = style({ overflow: 'auto' })

export const menuFooter = style({ padding: theme.space[1] })

export const menuList = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  maxHeight: `calc(min(${heightMenu}, ${heightAvailableSpace}) - ${theme.space['0.5']})`,
  overflowX: 'hidden',
  overflowY: 'auto',
  position: 'relative',
  selectors: {
    '&:after, &:before': {
      border: 'solid transparent',
      borderWidth: 9,
      content: ' ',
      height: 0,
      pointerEvents: 'none',
      position: 'absolute',
      width: 0,
    },
  },
})

export const menuSearchInput = style({ padding: theme.space[1] })

export const menuGroup = style({
  padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
  textAlign: 'left',
})

export const menuItemContainer = recipe({
  base: {
    selectors: {
      '&:last-child': {
        border: 'none',
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
        padding: `${theme.space['0.5']} ${theme.space['0.5']}`,
      },
      true: {
        padding: `${theme.space['0.25']} ${theme.space['0.5']}`,
      },
    },
  },
})

export const menuItem = recipe({
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
    transition: `background-color ${ANIMATION_DURATION}ms, color ${ANIMATION_DURATION}ms`,
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
    borderless: false,
    disabled: false,
    sentiment: 'neutral',
  },
  variants: {
    borderless: {
      true: {},
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
    sentiment: Object.fromEntries(
      ITEM_SENTIMENT.map(sentiment => [sentiment, {}]),
    ),
  },
})

ITEM_SENTIMENT.map(sentiment =>
  globalStyle(
    `${menuItem({ borderless: false, disabled: false, sentiment })} > svg`,
    {
      fill: theme.colors[sentiment].text,
    },
  ),
)

ITEM_SENTIMENT.map(sentiment =>
  globalStyle(
    `${menuItem({ borderless: false, disabled: true, sentiment })} > svg`,
    {
      fill: theme.colors[sentiment].textDisabled,
    },
  ),
)

ITEM_SENTIMENT.map(sentiment =>
  globalStyle(
    `${menuItem({ borderless: false, disabled: false, sentiment })}:hover, ${menuItem({ borderless: false, disabled: false, sentiment })}:focus-visible, ${menuItem({ borderless: false, disabled: false, sentiment })}[data-active="true"] > svg, ${menuItem({ borderless: true, disabled: false, sentiment })}:hover, ${menuItem({ borderless: true, disabled: false, sentiment })}:focus-visible, ${menuItem({ borderless: true, disabled: false, sentiment })}[data-active="true"] > svg`,
    {
      fill: theme.colors[sentiment].textHover,
    },
  ),
)

ITEM_SENTIMENT.map(sentiment =>
  globalStyle(
    `${menuItem({ borderless: true, disabled: false, sentiment })} > svg`,
    {
      fill: theme.colors[sentiment].text,
    },
  ),
)

ITEM_SENTIMENT.map(sentiment =>
  globalStyle(
    `${menuItem({ borderless: true, disabled: true, sentiment })} > svg`,
    {
      fill: theme.colors[sentiment].textDisabled,
    },
  ),
)
