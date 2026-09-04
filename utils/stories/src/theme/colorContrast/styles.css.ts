import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { previewBackgroundColor, previewTextColor, swatchColor, swatchSize } from './variables.css'

const root = style({
  marginTop: theme.space[2],
  fontFamily: theme.typography.body.fontFamily,
})

const swatch = style({
  display: 'inline-block',
  width: swatchSize,
  height: swatchSize,
  borderRadius: theme.radii.default,
  backgroundColor: swatchColor,
  border: `1px solid ${theme.colors.neutral.border}`,
  flexShrink: 0,
})

const summaryBar = style({
  padding: `${theme.space[1.5]} ${theme.space[2]}`,
  borderRadius: theme.radii.large,
  backgroundColor: theme.colors.neutral.backgroundWeak,
  border: `1px solid ${theme.colors.neutral.border}`,
})

const pairingCard = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.radii.large,
  overflow: 'hidden',
  transition: 'opacity 0.2s',
  selectors: {
    "&[data-level='fail']": {
      border: `1px solid ${theme.colors.danger.border}`,
    },
    "&[data-level='pass']": {
      border: `1px solid ${theme.colors.neutral.border}`,
    },
    "&[data-highlight='true']:not([data-level='fail'])": {
      opacity: 0.25,
    },
    "&[data-level='disabled']": {
      border: `1px solid ${theme.colors.neutral.border}`,
    },
  },
})

const preview = style({
  backgroundColor: previewBackgroundColor,
  color: previewTextColor,
  padding: `${theme.space[2]} ${theme.space[1.5]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[0.5],
  minHeight: theme.space[8],
  justifyContent: 'center',
})

const pairingFooter = style({
  padding: `${theme.space[1]} ${theme.space[1.5]}`,
  backgroundColor: theme.colors.neutral.backgroundWeak,
})

const capitalize = style({
  textTransform: 'capitalize',
})

const ratioText = styleVariants({
  pass: { color: theme.colors.success.text },
  fail: { color: theme.colors.danger.text },
  disabled: { color: theme.colors.neutral.text },
})

export const contrastStyle = {
  root,
  swatch,
  summaryBar,
  pairingCard,
  preview,
  pairingFooter,
  capitalize,
  ratioText,
}
