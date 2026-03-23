import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import {
  itemAnimatedIcon,
  itemBadge,
  itemCategoryIcon,
  itemContainer,
  itemContainerAnimated,
  itemContainerBase,
  itemDragIcon,
  itemMenu,
  itemMenuContainer,
  itemMenuPinned,
  itemMenuStack,
  itemPadded,
  itemPaddingStack,
  itemPinIcon,
  itemPinnedButton,
  itemRelative,
  itemShowDraggable,
  itemShowPinButton,
  itemStackIcon,
  itemVariants,
  itemWeakText,
  itemWrapText,
} from './components/items.css'
import {
  groupStack,
  groupText,
  pinnedItemContainer,
  pinnedItemDropableArea,
  pinnedItemRelativeDiv,
  separator,
  showHideStack,
} from './components/styles.css'
import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MAX_WIDTH,
  NAVIGATION_MIN_WIDTH,
} from './constants'
import { widthNavigationContainer } from './variables.css'

const stickyFooter = recipe({
  base: {
    background: theme.colors.neutral.background,
    borderTop: `1px solid ${theme.colors.neutral.borderWeak}`,
    boxShadow: theme.shadows.defaultShadow,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.space['1']} ${theme.space['2']}`,
    transition: `justify-content ${ANIMATION_DURATION}ms ease-in-out, box-shadow 230ms ease-in-out`,
    width: '100%',
  },
  defaultVariants: {
    overflow: false,
  },
  variants: {
    overflow: {
      false: {
        border: 'none',
        boxShadow: 'none',
      },
    },
  },
})

const header = style({
  background: theme.colors.neutral.background,
})

const logoContainer = style({
  height: 22,
  margin: `${theme.space['3']} ${theme.space['3']} ${theme.space['2']} ${theme.space['3']}`,
  maxWidth: 220,
  overflow: 'hidden',
})

const navigation = style({
  borderRight: `1px solid ${theme.colors.neutral.borderWeak}`,
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
})

const container = recipe({
  base: {
    background: theme.colors.neutral.background,
    display: 'flex',
    flexDirection: 'column',
    width: widthNavigationContainer,
  },
  compoundVariants: [
    {
      style: {
        maxWidth: `${NAVIGATION_MAX_WIDTH}px`,
        minWidth: `${NAVIGATION_MIN_WIDTH}px`,
      },
      variants: { animation: false, expanded: true },
    },
  ],
  variants: {
    animation: {
      collapse: {
        transition: `width ${ANIMATION_DURATION}ms ease-in-out`,
        width: `${NAVIGATION_COLLASPED_WIDTH}px`,
      },
      expand: {
        transition: `width ${ANIMATION_DURATION}ms ease-in-out`,
        width: widthNavigationContainer,
      },
      false: {},
    },
    expanded: {
      false: {
        width: `${NAVIGATION_COLLASPED_WIDTH}px`,
      },
    },
  },
})

const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'hidden',
})

const contentContainerCollapsed = style({
  alignItems: 'center',
})

const content = style({
  flexGrow: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
  padding: theme.space[2],
})

const slider = style({
  background: 'transparent',
  borderRight: '2px solid transparent',
  bottom: 0,
  cursor: 'col-resize',
  display: 'flex',
  position: 'absolute',
  right: 0,
  selectors: {
    '&:hover': {
      borderColor: theme.colors.primary.border,
    },
  },
  top: 0,
  width: 6,
})

export const navigationStyle = {
  stickyFooter,
  header,
  logoContainer,
  navigation,
  container,
  contentContainer,
  contentContainerCollapsed,
  content,
  slider,
  itemMenuContainer,
  itemRelative,
  itemPadded,
  itemPinIcon,
  itemMenu,
  itemMenuPinned,
  itemContainerBase,
  itemContainer,
  itemContainerAnimated,
  itemShowDraggable,
  itemShowPinButton,
  itemWeakText,
  itemVariants,
  itemDragIcon,
  itemWrapText,
  itemBadge,
  itemPinnedButton,
  itemAnimatedIcon,
  itemMenuStack,
  itemStackIcon,
  itemCategoryIcon,
  itemPaddingStack,
  groupText,
  groupStack,
  pinnedItemDropableArea,
  pinnedItemRelativeDiv,
  pinnedItemContainer,
  separator,
  showHideStack,
}
