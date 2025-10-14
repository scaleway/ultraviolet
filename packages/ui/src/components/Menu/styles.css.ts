import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { SIZES } from './constants'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

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
    padding: `${theme.space['0.25']} 0`,
    minWidth: SIZES.small,
    maxWidth: SIZES.large,
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
  defaultVariants: {
    arrow: false,
    searchable: false,
  },
})

export const menuContent = style({ overflow: 'auto' })

export const menuFooter = style({ padding: theme.space[1] })

export const menuList = style({
  overflowX: 'hidden',
  overflowY: 'auto',
  maxHeight: `calc(min(${heightMenu}, ${heightAvailableSpace}) - ${theme.space['0.5']})`,
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  position: 'relative',
  selectors: {
    '&:after, &:before': {
      border: 'solid transparent',
      borderWidth: 9,
      content: ' ',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
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
  defaultVariants: {
    borderless: false,
  },
})

export const menuItem = recipe({
  base: {
    background: 'none',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'start',
    textAlign: 'left',
    alignItems: 'center',
    minHeight: theme.sizing[400],
    maxHeight: theme.sizing[500],
    fontSize: theme.typography.bodySmall.fontSize,
    lineHeight: theme.typography.bodySmall.lineHeight,
    fontWeight: 'inherit',
    padding: `${theme.space['0.5']} ${theme.space['1']}`,
    border: 'none',
    cursor: 'pointer',
    minWidth: '6.875rem',
    width: '100%',
    borderRadius: theme.radii.default,
    transition: `background-color ${ANIMATION_DURATION}ms, color ${ANIMATION_DURATION}ms`,
    selectors: {
      '&:focus': {
        textDecoration: 'none',
      },
    },
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
  compoundVariants: [
    ...ITEM_SENTIMENT.map(sentiment => ({
      variants: {
        sentiment,
        disabled: false,
      },
      style: makeItemStyle(sentiment, false),
    })),
    ...ITEM_SENTIMENT.map(sentiment => ({
      variants: {
        sentiment,
        disabled: true,
      },
      style: makeItemStyle(sentiment, true),
    })),
  ],
  defaultVariants: {
    borderless: false,
    disabled: false,
    sentiment: 'neutral',
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
