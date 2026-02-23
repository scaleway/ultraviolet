import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fadeIn } from '../../../../utils'
import { shrinkHeight } from '../animations.css'
import { ANIMATION_DURATION } from '../constants'

export const navigationItemMenuContainer = style({ width: 180 })

export const navigationItemRelative = style({ position: 'relative' })

export const navigationItemPadded = style({ paddingLeft: theme.space[1] })

const navigationItemPinIconBase = style({
  borderRadius: theme.radii.default,
  bottom: 0,
  margin: 'auto 0',
  padding: theme.space['0.25'],
  position: 'absolute',
  top: 0,
})

export const navigationItemPinIcon = styleVariants({
  active: [
    navigationItemPinIconBase,
    {
      selectors: {
        '&:hover': { background: theme.colors.primary.backgroundHover },
      },
    },
  ],
  inactive: [
    navigationItemPinIconBase,
    {
      selectors: {
        '&:hover': { background: theme.colors.neutral.backgroundWeakHover },
      },
    },
  ],
})

export const navigationItemMenu = style({
  textAlign: 'left',
})

export const navigationItemMenuPinned = style({})

export const navigationItemContainerBase = style({
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

export const navigationItemContainer = recipe({
  base: navigationItemContainerBase,
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

export const navigationItemContainerAnimated = recipe({
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

export const navigationItemShowDraggable = style({})
export const navigationItemShowPinButton = style({})
export const navigationItemWeakText = style({})

export const navigationItemVariants = recipe({
  variants: {
    showDraggableIcon: {
      true: navigationItemShowDraggable,
    },
    showPinIcon: {
      true: navigationItemShowPinButton,
    },
    shouldHaveWeakText: {
      true: navigationItemWeakText,
    },
  },
})

export const navigationItemDragIcon = style({
  cursor: 'grab',
  margin: `0 ${theme.space['0.25']}`,
  opacity: 0,
  selectors: {
    [`${navigationItemShowDraggable}:hover &, ${navigationItemShowDraggable}:focus &, ${navigationItemShowDraggable}:active & `]:
      {
        opacity: 1,
      },
  },
})
export const navigationItemWrapText = recipe({
  base: {
    display: '-webkit-box',
    overflow: 'hidden',
    overflowWrap: 'anywhere',
    selectors: {
      [`${navigationItemWeakText}:hover &`]: {
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

export const navigationItemBadge = style({
  selectors: {
    [`${navigationItemMenu}:hover &, ${navigationItemMenu}:focus &, ${navigationItemMenu}:active &`]:
      {
        opacity: 1,
      },

    [`${navigationItemMenuPinned}:hover &, ${navigationItemMenuPinned}:focus &, ${navigationItemMenuPinned}:active &`]:
      {
        opacity: 0,
      },
    [`${navigationItemShowPinButton}:hover &, ${navigationItemShowPinButton}:active &, ${navigationItemShowPinButton}:focus &`]:
      {
        opacity: 0,
      },
  },
})

export const navigationItemPinnedButton = style({
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
    [`${navigationItemMenu}:hover &, ${navigationItemMenu}:focus &, ${navigationItemMenu}:active &`]:
      {
        opacity: 1,
        pointerEvents: 'auto',
      },
    [`${navigationItemShowPinButton}:hover &, ${navigationItemShowPinButton}:active &, ${navigationItemShowPinButton}:focus &`]:
      {
        opacity: 1,
        pointerEvents: 'auto',
      },
  },
  top: 0,
  visibility: 'visible',
})

export const navigationItemAnimatedIcon = recipe({
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

export const navigationItemMenuStack = style({
  marginTop: theme.space['0.25'],
  padding: `0 ${theme.space[2]}`,
  width: 'fit-content',
})

export const navigationItemStackIcon = style({
  paddingTop: theme.space['0.5'],
})

export const navigationItemCategoryIcon = style({
  minWidth: 20,
})

export const navigationItemPaddingStack = recipe({
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
