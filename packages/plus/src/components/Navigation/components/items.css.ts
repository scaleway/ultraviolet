import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { ANIMATION_DURATION } from '../constants'
import { shrinkHeight } from '../animations.css'
import { fadeIn } from '@ultraviolet/ui'
import { recipe } from '@vanilla-extract/recipes'

export const navigationItemMenuContainer = style({ width: 180 })

export const navigationItemRelative = style({ position: 'relative' })

export const navigationItemPadded = style({ paddingLeft: theme.space[1] })

const navigationItemPinIconBase = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto 0',
  padding: theme.space['0.25'],
  borderRadius: theme.radii.default,
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
  color: 'inherit',
  textDecoration: 'none',
  backgroundColor: 'inherit',
  border: 'none',
  textAlign: 'left',
  borderRadius: theme.radii.default,
  marginTop: theme.space['0.25'],
  padding: `calc(${theme.space['0.25']} + ${theme.space['0.5']}) ${theme.space[1]}`,
  width: '100%',
})

export const navigationItemContainer = recipe({
  base: navigationItemContainerBase,
  variants: {
    noExpand: {
      false: {
        cursor: 'pointer',
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        backgroundColor: 'unset',
      },
    },
    isActive: {
      true: {
        selectors: {
          '&:hover': {
            backgroundColor: theme.colors.primary.backgroundHover,
          },
        },
        backgroundColor: theme.colors.primary.background,
      },
    },
    hasActive: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundHover,
      },
    },
    subLabel: {
      true: {
        padding: `${theme.space['0.5']} ${theme.space['1']}`,
      },
    },
  },
  compoundVariants: [
    {
      variants: { noExpand: false, disabled: false, isActive: false },
      style: {
        selectors: {
          '&:active': {
            backgroundColor: theme.colors.neutral.backgroundHover,
          },
        },
      },
    },
    {
      variants: {
        hasActive: true,
        noExpand: false,
        disabled: false,
        isActive: false,
      },
      style: {
        backgroundColor: theme.colors.neutral.backgroundWeakHover,
      },
    },
    {
      variants: {
        noExpand: false,
        disabled: false,
        isActive: false,
      },
      style: {
        selectors: {
          '&:hover, &:focus': {
            backgroundColor: theme.colors.neutral.backgroundWeak,
          },
        },
      },
    },
  ],
  defaultVariants: {
    noExpand: false,
    disabled: false,
    isActive: false,
    hasActive: false,
    subLabel: false,
  },
})

export const navigationItemContainerAnimated = styleVariants({
  collapse: {
    animation: `${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out`,
  },
  expand: {
    animation: `${shrinkHeight} ${ANIMATION_DURATION}ms ease-in-out reverse`,
  },
})

export const navigationItemShowDraggable = style({})
export const navigationItemShowPinButton = style({})
export const navigationItemWeakText = style({})

export const navigationItemDragIcon = style({
  opacity: 0,
  margin: `0 ${theme.space['0.25']}`,
  cursor: 'grab',
  selectors: {
    [`${navigationItemShowDraggable}:hover &, ${navigationItemShowDraggable}:focus &, ${navigationItemShowDraggable}:active & `]:
      {
        opacity: 1,
      },
  },
})
export const navigationItemWrapText = recipe({
  base: {
    overflowWrap: 'anywhere',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    selectors: {
      [`${navigationItemWeakText}:hover &`]: {
        color: theme.colors.neutral.textWeakHover,
      },
    },
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
  defaultVariants: {
    disabled: false,
    weak: false,
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
  opacity: 0,
  right: 0,
  position: 'absolute',
  left: '-24px',
  top: 0,
  bottom: 0,
  margin: 'auto',
  pointerEvents: 'visible',
  visibility: 'visible',
  selectors: {
    '&:hover, &:focus, &:active': {
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
})

export const navigationItemAnimatedIcon = styleVariants({
  expand: {
    animation: `${fadeIn} ${ANIMATION_DURATION}ms ease-in-out`,
  },
  collapse: {
    animation: `${fadeIn} ${ANIMATION_DURATION}ms ease-in-out reverse`,
  },
})

export const navigationItemMenuStack = style({
  padding: `0 ${theme.space[2]}`,
  marginTop: theme.space['0.25'],
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
