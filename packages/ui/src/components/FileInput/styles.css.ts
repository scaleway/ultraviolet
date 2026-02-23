import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const dropzone = recipe({
  base: {
    border: `1px dashed ${theme.colors.neutral.borderStrong}`,
    textAlign: 'center',
  },
  compoundVariants: [
    {
      style: {
        background: theme.colors.neutral.backgroundHover,
        cursor: 'copy',
      },
      variants: { disabled: false, state: 'over' },
    },
  ],
  defaultVariants: {
    disabled: false,
    size: 'medium',
    state: 'default',
  },
  variants: {
    disabled: {
      true: {
        background: theme.colors.neutral.backgroundDisabled,
        cursor: 'not-allowed',
      },
    },
    size: {
      medium: {
        padding: theme.space[5],
      },
      small: {
        padding: theme.space[2],
      },
    },
    state: {
      default: {},
      over: {},
      page: {},
    },
  },
})

const fileInput = style({ display: 'none' })

const titleSmall = styleVariants({
  default: {
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'not-allowed',
  },
})

const overlayWrapper = style({
  height: 'fit-content',
  position: 'relative',
  width: 'fit-content',
})

const dropzoneOverlayBase = style({
  alignItems: 'center',
  display: 'flex',
  inset: 0,
  justifyContent: 'center',
  position: 'absolute',
})

const dropzoneOverlay = styleVariants({
  default: [
    dropzoneOverlayBase,
    {
      display: 'none',
    },
  ],
  over: [
    dropzoneOverlayBase,
    {
      background: theme.colors.primary.background,
      border: `1px dashed ${theme.colors.primary.borderStrong}`,
      borderRadius: theme.radii.default,
      cursor: 'copy',
      textAlign: 'center',
    },
  ],
  page: [
    dropzoneOverlayBase,
    {
      background: theme.colors.primary.background,
      border: `1px dashed ${theme.colors.neutral.borderStrong}`,
      borderRadius: theme.radii.default,
      cursor: 'copy',
      textAlign: 'center',
    },
  ],
})

const dropzoneOverlayDisabledOver = style({
  background: theme.colors.primary.backgroundDisabled,
  border: `1px dashed ${theme.colors.primary.borderDisabled}`,
})

const dropzoneOverlayDisabled = styleVariants({
  default: {},
  over: [dropzoneOverlayDisabledOver],
  page: [dropzoneOverlayDisabledOver],
})

const fileViewerContainerBase = style({
  borderRadius: theme.radii.default,
  padding: theme.space[1],
  width: 'fit-content',
})

const fileViewerContainer = styleVariants({
  default: [
    fileViewerContainerBase,
    {
      background: theme.colors.neutral.backgroundWeak,
    },
  ],
  error: [
    fileViewerContainerBase,
    {
      background: theme.colors.danger.background,
    },
  ],
  strong: [
    fileViewerContainerBase,
    {
      background: theme.colors.neutral.background,
    },
  ],
})
const fileViewerImageBase = style({
  alignItems: 'center',
  borderRadius: theme.radii.default,
  display: 'flex',
  height: theme.sizing[400],
  justifyContent: 'center',
  objectFit: 'cover',
  width: theme.sizing[400],
})

const fileViewerImage = styleVariants({
  default: [
    fileViewerImageBase,
    {
      background: theme.colors.primary.background,
    },
  ],
  error: [
    fileViewerImageBase,
    {
      background: theme.colors.danger.background,
    },
  ],
})

const fileInfo = style({
  maxWidth: 264,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textWrap: 'nowrap',
})

export const fileInputStyle = {
  dropzone,
  fileInput,
  titleSmall,
  overlayWrapper,
  dropzoneOverlay,
  dropzoneOverlayDisabled,
  fileViewerContainer,
  fileViewerImageBase,
  fileInfo,
  fileViewerImage,
}
