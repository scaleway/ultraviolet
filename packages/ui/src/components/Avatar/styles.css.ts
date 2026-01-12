import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'
import { RADIUS_SIZES, sizes } from './constants'
import {
  finalColorAvatar,
  finalSizeAvatar,
  halvedColorAvatar,
} from './variables.css'

function getSquareStyle(size: keyof ReturnType<typeof sizes>) {
  return {
    borderRadius: theme.radii[RADIUS_SIZES[size]],
  }
}

function sizeStyle(size: keyof ReturnType<typeof sizes>) {
  return {
    height: sizes(theme)[size],
    width: sizes(theme)[size],
  }
}

const borderRadiusSquare = Object.keys(sizes(theme)).map(size => ({
  style: getSquareStyle(size as keyof ReturnType<typeof sizes>),
  variants: {
    shape: 'square' as const,
    size: size as keyof ReturnType<typeof sizes>,
  },
}))

const baseStyle = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
}

export const containerAvatar = recipe({
  base: {
    position: 'relative',
  },

  compoundVariants: borderRadiusSquare,

  variants: {
    sentiment: {
      neutral: {
        color: theme.colors.neutral.text,
        selectors: {
          "&[data-has-background='true']": {
            backgroundColor: theme.colors.neutral.backgroundStrong,
          },
        },
      },
      primary: {
        color: theme.colors.neutral.textStronger,
        selectors: {
          "&[data-has-background='true']": {
            backgroundColor: theme.colors.primary.backgroundStrong,
          },
        },
      },
    },
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {},
    },
    size: {
      large: sizeStyle('large'),
      medium: sizeStyle('medium'),
      small: sizeStyle('small'),
      xsmall: sizeStyle('xsmall'),
    },
  },
})

export const uploadContainer = recipe({
  base: {
    alignItems: 'center',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    left: '0',
    opacity: '0',
    position: 'absolute',
    right: '0',
    selectors: {
      [`${containerAvatar()}:hover &`]: {
        backgroundColor: theme.colors.overlay,
        cursor: 'pointer',
        opacity: 1,
      },
    },
    top: '0',
    transition: 'opacity 180ms ease-in-out, background-color 180ms ease-in-out',
  },

  compoundVariants: borderRadiusSquare,

  variants: {
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {},
    },
    size: {
      large: {},
      medium: {},
      small: {},
      xsmall: {},
    },
  },
})

export const productIconContainer = recipe({
  base: {
    ...baseStyle,
    overflow: 'hidden',
  },
  compoundVariants: borderRadiusSquare,
  variants: {
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {},
    },
    size: {
      large: sizeStyle('large'),
      medium: sizeStyle('medium'),
      small: sizeStyle('small'),
      xsmall: sizeStyle('xsmall'),
    },
  },
})

export const elementContainer = recipe({
  base: baseStyle,
  variants: {
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {
        borderRadius: theme.radii.xlarge,
      },
    },
  },
})

export const colorsAvatar = recipe({
  base: {
    ...baseStyle,
    borderBottom: `calc(${finalSizeAvatar} / 2) solid ${halvedColorAvatar}`,
    borderLeft: `calc(${finalSizeAvatar} / 2) solid ${finalColorAvatar}`,
    borderRight: `calc(${finalSizeAvatar} / 2) solid ${halvedColorAvatar}`,
    borderTop: `calc(${finalSizeAvatar} / 2) solid ${finalColorAvatar}`,
  },
  compoundVariants: borderRadiusSquare,

  variants: {
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {},
    },
    size: {
      large: sizeStyle('large'),
      medium: sizeStyle('medium'),
      small: sizeStyle('small'),
      xsmall: sizeStyle('xsmall'),
    },
  },
})

export const svgAvatar = recipe({
  base: {
    height: '100% !important',
    width: '100% !important',
  },
  variants: {
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {},
    },
  },
})
