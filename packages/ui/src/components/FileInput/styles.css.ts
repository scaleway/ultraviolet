import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const dropzone = recipe({
  base: {
    textAlign: 'center',
    border: `1px dashed ${theme.colors.neutral.borderStrong}`,
  },
  variants: {
    state: {
      over: {},
      default: {},
      page: {},
    },
    size: {
      small: {
        padding: theme.space[2],
      },
      medium: {
        padding: theme.space[5],
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        background: theme.colors.neutral.backgroundDisabled,
      },
    },
  },
  compoundVariants: [
    {
      variants: { disabled: false, state: 'over' },
      style: {
        background: theme.colors.neutral.backgroundHover,
        cursor: 'copy',
      },
    },
  ],
  defaultVariants: {
    state: 'default',
    size: 'medium',
    disabled: false,
  },
})

export const fileInput = style({ display: 'none' })

export const titleSmall = styleVariants({
  default: {
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'not-allowed',
  },
})

export const overlayWrapper = style({
  height: 'fit-content',
  width: 'fit-content',
  position: 'relative',
})

const dropzoneOverlayBase = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const dropzoneOverlay = styleVariants({
  over: [
    dropzoneOverlayBase,
    {
      borderRadius: theme.radii.default,
      border: `1px dashed ${theme.colors.primary.borderStrong}`,
      background: theme.colors.primary.background,
      cursor: 'copy',
      textAlign: 'center',
    },
  ],
  default: [
    dropzoneOverlayBase,
    {
      display: 'none',
    },
  ],
  page: [
    dropzoneOverlayBase,
    {
      borderRadius: theme.radii.default,
      border: `1px dashed ${theme.colors.neutral.borderStrong}`,
      background: theme.colors.primary.background,
      cursor: 'copy',
      textAlign: 'center',
    },
  ],
})

const dropzoneOverlayDisabledOver = style({
  background: theme.colors.primary.backgroundDisabled,
  border: `1px dashed ${theme.colors.primary.borderDisabled}`,
})

export const dropzoneOverlayDisabled = styleVariants({
  over: [dropzoneOverlayDisabledOver],
  default: {},
  page: [dropzoneOverlayDisabledOver],
})

const fileViewerContainerBase = style({
  width: 'fit-content',
  padding: theme.space[1],
  borderRadius: theme.radii.default,
})

export const fileViewerContainer = styleVariants({
  error: [
    fileViewerContainerBase,
    {
      background: theme.colors.danger.background,
    },
  ],
  default: [
    fileViewerContainerBase,
    {
      background: theme.colors.neutral.backgroundWeak,
    },
  ],
  strong: [
    fileViewerContainerBase,
    {
      background: theme.colors.neutral.background,
    },
  ],
})
export const fileViewerImageBase = style({
  width: theme.sizing[400],
  height: theme.sizing[400],
  objectFit: 'cover',
  borderRadius: theme.radii.default,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const fileViewerImage = styleVariants({
  error: [
    fileViewerImageBase,
    {
      background: theme.colors.danger.background,
    },
  ],
  default: [
    fileViewerImageBase,
    {
      background: theme.colors.primary.background,
    },
  ],
})

export const fileInfo = style({
  maxWidth: 264,
  textWrap: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
