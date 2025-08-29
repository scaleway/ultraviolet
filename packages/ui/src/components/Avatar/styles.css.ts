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
    width: sizes(theme)[size],
    height: sizes(theme)[size],
  }
}

const borderRadiusSquare = Object.keys(sizes(theme)).map(size => ({
  variants: {
    size: size as keyof ReturnType<typeof sizes>,
    shape: 'square' as const,
  },
  style: getSquareStyle(size as keyof ReturnType<typeof sizes>),
}))

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}

export const containerAvatar = recipe({
  base: {
    position: 'relative',
  },

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
    sentiment: {
      primary: {
        color: theme.colors.neutral.textStronger,
        selectors: {
          "&[data-has-background='true']": {
            backgroundColor: theme.colors.primary.backgroundStrong,
          },
        },
      },
      neutral: {
        color: theme.colors.neutral.text,
        selectors: {
          "&[data-has-background='true']": {
            backgroundColor: theme.colors.neutral.backgroundStrong,
          },
        },
      },
    },
  },

  compoundVariants: borderRadiusSquare,
})

export const uploadContainer = recipe({
  base: {
    position: 'absolute',
    opacity: '0',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 180ms ease-in-out, background-color 180ms ease-in-out',
    selectors: {
      [`${containerAvatar()}:hover &`]: {
        opacity: 1,
        cursor: 'pointer',
        backgroundColor: theme.colors.overlay,
      },
    },
  },

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

  compoundVariants: borderRadiusSquare,
})

export const productIconContainer = recipe({
  base: {
    ...baseStyle,
    overflow: 'hidden',
  },
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
  compoundVariants: borderRadiusSquare,
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

  variants: {
    size: {
      large: sizeStyle('large'),
      medium: sizeStyle('medium'),
      small: sizeStyle('small'),
      xsmall: sizeStyle('xsmall'),
    },
    shape: {
      circle: {
        borderRadius: theme.radii.circle,
      },
      square: {},
    },
  },
  compoundVariants: borderRadiusSquare,
})

export const svgAvatar = recipe({
  base: {
    width: '100% !important',
    height: '100% !important',
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
