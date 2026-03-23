import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { fadeIn } from '../../../../utils'
import { shrinkHeight } from '../animations.css'
import { ANIMATION_DURATION } from '../constants'

export const itemMenuContainer = style({ width: 180 })

export const itemRelative = style({ position: 'relative' })

export const itemPadded = style({ paddingLeft: theme.space[1] })

const itemPinIconBase = style({
  borderRadius: theme.radii.default,
  bottom: 0,
  margin: 'auto 0',
  padding: theme.space['0.25'],
  position: 'absolute',
  top: 0,
})

export const itemPinIcon = styleVariants({
  active: [
    itemPinIconBase,
    {
      selectors: {
        '&:hover': { background: theme.colors.primary.backgroundHover },
      },
    },
  ],
  inactive: [
    itemPinIconBase,
    {
      selectors: {
        '&:hover': { background: theme.colors.neutral.backgroundWeakHover },
      },
    },
  ],
})

export const itemMenu = style({
  textAlign: 'left',
})

export const itemMenuPinned = style({})

export const itemContainerBase = style({
  backgroundColor: 'inherit',
  border: 'none',
  borderRadius: theme.radii.default,
  color: 'inherit',
  marginTop: theme.space['0.25'],
  padding: `calc(${theme.space['0.25']} + ${theme.space['0.5']}) ${theme.space[1]}`,
  textAlign: 'left',
  textDecoration: 'none',
  width: '100%',
})

export const itemContainer = recipe({
  base: itemContainerBase,
  compoundVariants: [
    {
      style: {
        selectors: {
          '&:active': {
            backgroundColor: theme.colors.neutral.backgroundHover,
          },
        },
      },
      variants: { disabled: false, isActive: false, noExpand: false },
    },
    {
      style: {
        backgroundColor: theme.colors.neutral.backgroundWeakHover,
      },
      variants: {
        disabled: false,
        hasActive: true,
        isActive: false,
        noExpand: false,
      },
    },
    {
      style: {
        selectors: {
          '&:hover, &:focus': {
            backgroundColor: theme.colors.neutral.backgroundWeak,
          },
        },
      },
      variants: {
        disabled: false,
        isActive: false,
        noExpand: false,
      },
    },
  ],
  defaultVariants: {
    disabled: false,
    hasActive: false,
    isActive: false,
    noExpand: false,
    subLabel: false,
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: 'unset',
        cursor: 'not-allowed',
      },
    },
    hasActive: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundHover,
      },
    },
    isActive: {
      true: {
        backgroundColor: theme.colors.primary.background,
        selectors: {
          '&:hover': {
            backgroundColor: theme.colors.primary.backgroundHover,
          },
        },
      },
    },
    noExpand: {
      false: {
        cursor: 'pointer',
      },
    },
    subLabel: {
      true: {
        padding: `${theme.space['0.5']} ${theme.space['1']}`,
      },
    },
  },
})

export const itemContainerAnimated = recipe({
  variants: {
    animated: {
      true: {},
    },
    animation: {
      collapse: {},
      expand: {},
    },
  },
  compoundVariants: [
    {
      variants: { animated: true, animation: 'collapse' },
      style: {
        animation: `${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out`,
      },
    },
    {
      variants: { animated: true, animation: 'expand' },
      style: {
        animation: `${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out reverse`,
      },
    },
  ],
})

export const itemShowDraggable = style({})
export const itemShowPinButton = style({})
export const itemWeakText = style({})

export const itemVariants = recipe({
  variants: {
    showDraggableIcon: {
      true: itemShowDraggable,
    },
    showPinIcon: {
      true: itemShowPinButton,
    },
    shouldHaveWeakText: {
      true: itemWeakText,
    },
  },
})

export const itemDragIcon = style({
  cursor: 'grab',
  margin: `0 ${theme.space['0.25']}`,
  opacity: 0,
  selectors: {
    [`${itemShowDraggable}:hover &, ${itemShowDraggable}:focus &, ${itemShowDraggable}:active & `]:
      {
        opacity: 1,
      },
  },
})
export const itemWrapText = recipe({
  base: {
    display: '-webkit-box',
    overflow: 'hidden',
    overflowWrap: 'anywhere',
    selectors: {
      [`${itemWeakText}:hover &`]: {
        color: theme.colors.neutral.textWeakHover,
      },
    },
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  defaultVariants: {
    disabled: false,
    weak: false,
  },
  variants: {
    disabled: {
      true: {
        color: theme.colors.neutral.textWeakDisabled,
      },
    },
    weak: {
      true: {
        color: theme.colors.neutral.textWeakHover,
      },
    },
  },
})

export const itemBadge = style({
  selectors: {
    [`${itemMenu}:hover &, ${itemMenu}:focus &, ${itemMenu}:active &`]: {
      opacity: 1,
    },

    [`${itemMenuPinned}:hover &, ${itemMenuPinned}:focus &, ${itemMenuPinned}:active &`]:
      {
        opacity: 0,
      },
    [`${itemShowPinButton}:hover &, ${itemShowPinButton}:active &, ${itemShowPinButton}:focus &`]:
      {
        opacity: 0,
      },
  },
})

export const itemPinnedButton = style({
  all: 'unset',
  bottom: 0,
  left: '-24px',
  margin: 'auto',
  opacity: 0,
  pointerEvents: 'visible',
  position: 'absolute',
  right: 0,
  selectors: {
    '&:hover, &:focus-visible, &:active': {
      opacity: 1,
      pointerEvents: 'auto',
    },
    [`${itemMenu}:hover &, ${itemMenu}:focus &, ${itemMenu}:active &`]: {
      opacity: 1,
      pointerEvents: 'auto',
    },
    [`${itemShowPinButton}:hover &, ${itemShowPinButton}:active &, ${itemShowPinButton}:focus &`]:
      {
        opacity: 1,
        pointerEvents: 'auto',
      },
  },
  top: 0,
  visibility: 'visible',
})

export const itemAnimatedIcon = recipe({
  variants: {
    animated: {
      true: {},
    },
    animation: {
      collapse: {},
      expand: {},
    },
  },
  compoundVariants: [
    {
      variants: { animated: true, animation: 'collapse' },
      style: {
        animation: `${fadeIn} ${ANIMATION_DURATION}ms ease-in-out reverse`,
      },
    },
    {
      variants: { animated: true, animation: 'expand' },
      style: {
        animation: `${fadeIn} ${ANIMATION_DURATION}ms ease-in-out`,
      },
    },
  ],
})

export const itemMenuStack = style({
  marginTop: theme.space['0.25'],
  padding: `0 ${theme.space[2]}`,
  width: 'fit-content',
})

export const itemStackIcon = style({
  paddingTop: theme.space['0.5'],
})

export const itemCategoryIcon = style({
  minWidth: 20,
})

export const itemPaddingStack = recipe({
  base: {
    paddingLeft: 28, // This value need to be hardcoded because of the category icon size
  },
  variants: {
    hide: {
      true: {
        display: 'none',
      },
    },
  },
})
