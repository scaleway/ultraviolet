import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { zoomIn } from '../../../../utils'

export const maxWidthTextVar = createVar()

export const maxWidthText = style({
  maxWidth: maxWidthTextVar,
})

export const estimateCostImage = style({
  marginRight: theme.space[1],
  width: 15,
})

export const tr = style({})

export const div = style({ marginLeft: theme.space['0.5'] })

export const leftSide = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  minHeight: theme.sizing[700],
  paddingBottom: theme.space[1],
  paddingTop: theme.space[1],
  WebkitBoxPack: 'justify',
})

export const itemResourceName = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    height: theme.sizing[600],
    justifyContent: 'center',
    WebkitBoxPack: 'center',
  },
  defaultVariants: {
    animated: false,
  },
  variants: {
    animated: {
      true: {
        animation: `800ms ${zoomIn}`,
      },
    },
  },
})

export const resourceName = recipe({
  defaultVariants: {
    isAnimated: false,
    isOverlay: false,
  },
  variants: {
    isAnimated: {
      true: {
        animation: `${zoomIn} 800ms`,
      },
    },
    isOverlay: {
      false: {
        textAlign: 'right',
      },
      true: {
        display: 'flex',
        flexDirection: 'column',
        height: theme.sizing[600],
        justifyContent: 'center',
        textAlign: 'initial',
        WebkitBoxPack: 'center',
      },
    },
  },
})

export const badgeItem = style({
  alignSelf: 'center',
  marginLeft: theme.space[1],
})

export const textItem = style({
  marginLeft: theme.space[1],
})

export const estimateCostMaxWidthText = style({
  maxWidth: '75%',
})

export const tooltip = style({ verticalAlign: 'text-top' })

export const lineThrough = style({
  textDecorationColor: theme.colors.warning.border,
  textDecorationLine: 'line-through',
})

export const regular = recipe({
  base: {
    alignItems: 'center',
    color: theme.colors.neutral.textStrong,
    fontSize: 16,
    marginRight: theme.space['0.5'],
    maxWidth: 500,
  },
  defaultVariants: {
    isOverlay: false,
    variant: 'normal',
  },
  variants: {
    isOverlay: {
      false: {
        display: 'inline-flex',
      },
      true: {
        display: 'flex',
      },
    },
    variant: {
      big: {},
      capitalized: {},
      normal: {},
      small: {
        color: theme.colors.neutral.text,
        display: 'block',
        fontSize: 14,
        lineHeight: 8,
      },
    },
  },
})

export const strong = recipe({
  base: {
    alignItems: 'center',
    color: theme.colors.neutral.textStrong,
    display: 'inline-flex',
    fontWeight: 500,
    marginRight: 4,
  },
  defaultVariants: {
    variant: 'normal',
  },
  variants: {
    variant: {
      big: {
        fontSize: 24,
      },
      capitalized: {
        fontSize: 16,
        textTransform: 'capitalize',
      },
      normal: {
        fontSize: 16,
      },
      small: {
        fontSize: 16,
      },
    },
  },
})

export const numberInput = style({
  MozAppearance: 'textfield',
  selectors: {
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
      margin: 0,
      WebkitAppearance: 'none',
    },
  },
})
