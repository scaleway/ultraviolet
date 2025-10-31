import { theme } from '@ultraviolet/themes'
import { zoomInVanillaExtract } from '@ultraviolet/ui'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const maxWidthTextVar = createVar()

export const maxWidthText = style({
  maxWidth: maxWidthTextVar,
})

export const estimateCostImage = style({
  width: 15,
  marginRight: theme.space[1],
})

export const estimateCostTr = style({})

export const styledDiv = style({ marginLeft: theme.space['0.5'] })

export const estimateCostLeftSide = style({
  display: 'flex',
  flexDirection: 'row',
  WebkitBoxPack: 'justify',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: theme.sizing[700],
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
})

export const estimateCostItemResourceName = recipe({
  base: {
    height: theme.sizing[600],
    display: 'flex',
    flexDirection: 'column',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
  },
  variants: {
    animated: {
      true: {
        animation: `800ms ${zoomInVanillaExtract}`,
      },
    },
  },
  defaultVariants: {
    animated: false,
  },
})

export const estimateCostResourceName = recipe({
  variants: {
    isOverlay: {
      true: {
        textAlign: 'initial',
        height: theme.sizing[600],
        display: 'flex',
        flexDirection: 'column',
        WebkitBoxPack: 'center',
        justifyContent: 'center',
      },
      false: {
        textAlign: 'right',
      },
    },
    isAnimated: {
      true: {
        animation: `${zoomInVanillaExtract} 800ms`,
      },
    },
  },
  defaultVariants: {
    isAnimated: false,
    isOverlay: false,
  },
})

export const estimateCostBadgeItem = style({
  marginLeft: theme.space[1],
  alignSelf: 'center',
})

export const estimateCostTextItem = style({
  marginLeft: theme.space[1],
})

export const estimateCostMaxWidthText = style({
  maxWidth: '75%',
})

export const estimateCostTooltip = style({ verticalAlign: 'text-top' })

export const estimateCostLineThrough = style({
  textDecorationLine: 'line-through',
  textDecorationColor: theme.colors.warning.border,
})

export const estimateCostRegular = recipe({
  base: {
    maxWidth: 500,
    alignItems: 'center',
    fontSize: 16,
    color: theme.colors.neutral.textStrong,
    marginRight: theme.space['0.5'],
  },
  variants: {
    isOverlay: {
      true: {
        display: 'flex',
      },
      false: {
        display: 'inline-flex',
      },
    },
    variant: {
      normal: {},
      big: {},
      capitalized: {},
      small: {
        display: 'block',
        fontSize: 14,
        lineHeight: 8,
        color: theme.colors.neutral.text,
      },
    },
  },
  defaultVariants: {
    isOverlay: false,
    variant: 'normal',
  },
})

export const estimateCostStrong = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    color: theme.colors.neutral.textStrong,
    fontWeight: 500,
    marginRight: 4,
  },
  variants: {
    variant: {
      normal: {
        fontSize: 16,
      },
      big: {
        fontSize: 24,
      },
      capitalized: {
        fontSize: 16,
        textTransform: 'capitalize',
      },
      small: {
        fontSize: 16,
      },
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
})

export const estimateCostNumberInput = style({
  MozAppearance: 'textfield',
  selectors: {
    '&::-webkit-inner-spin-button, &::webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
})
