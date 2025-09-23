import { globalStyle, style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const errorText = style({
  paddingTop: theme.space['0.5'],
})

export const innerCheckbox = style({
  fill: theme.colors.neutral.background,
  stroke: theme.colors.neutral.border,
})

export const checkMixedMark = style({})

export const icon = style({
  borderRadius: theme.radii.default,
  height: theme.sizing['300'],
  width: theme.sizing['300'],
  minWidth: theme.sizing['300'],
  minHeight: theme.sizing['300'],
})

globalStyle(`${icon} path`, {
  fill: theme.colors.neutral.background,
  transform: 'scale(0)',
})

export const label = style({
  width: '100%',
  cursor: 'pointer',
})

export const checkboxInput = style({
  position: 'absolute',
  whiteSpace: 'nowrap',
  opacity: 0,
  borderWidth: 0,
})

export const checkboxContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.space['1'],
})

globalStyle(`${checkboxInput}:not(:disabled)`, {
  cursor: 'pointer',
})

globalStyle(`${checkboxInput}:disabled`, {
  cursor: 'not-allowed',
})

globalStyle(`${checkboxContainer}[aria-disabled='true']`, {
  cursor: 'not-allowed',
  color: theme.colors.neutral.textDisabled,
})
globalStyle(`${checkboxContainer}[aria-disabled='true'] label`, {
  cursor: 'not-allowed',
})

// CheckboxContainer icon and innerCheckbox disabled styles
globalStyle(`${checkboxContainer}[aria-disabled='true'] .${icon}`, {
  fill: theme.colors.neutral.borderDisabled,
})
globalStyle(`${checkboxContainer}[aria-disabled='true'] .${innerCheckbox}`, {
  stroke: theme.colors.neutral.borderStrongDisabled,
  fill: theme.colors.neutral.backgroundDisabled,
})

globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"]:checked + .${icon}`,
  {
    fill: theme.colors.danger.backgroundStrongDisabled,
  },
)
globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"]:checked + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.borderStrongDisabled,
    fill: theme.colors.danger.backgroundStrongDisabled,
  },
)

globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"] + .${icon}`,
  {
    fill: theme.colors.danger.background,
  },
)
globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.borderDisabled,
    fill: theme.colors.danger.background,
  },
)

globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input:checked + .${icon}`,
  {
    fill: theme.colors.primary.backgroundStrongDisabled,
  },
)
globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input:checked + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.primary.borderDisabled,
    fill: theme.colors.primary.borderDisabled,
  },
)

globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input[aria-checked="mixed"] + .${icon}`,
  {
    fill: theme.colors.primary.backgroundStrongDisabled,
  },
)
globalStyle(
  `${checkboxContainer}[aria-disabled='true'] input[aria-checked="mixed"] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.primary.borderStrongDisabled,
    fill: theme.colors.primary.backgroundStrongDisabled,
  },
)

globalStyle(`${checkboxContainer} input:checked + .${icon} path`, {
  transformOrigin: 'center',
  transition: '200ms transform ease-in-out',
  transform: 'scale(1) translate(2px, 2px)',
})

globalStyle(`${checkboxContainer} input:checked + .${icon} .${innerCheckbox}`, {
  fill: theme.colors.primary.backgroundStrong,
  stroke: theme.colors.primary.borderStrong,
  transformOrigin: 'center',
  transition: '200ms fill ease-in-out',
})

globalStyle(
  `${checkboxContainer} input[aria-invalid="true"]:checked + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.danger.backgroundStrong,
    stroke: theme.colors.danger.borderStrong,
  },
)

globalStyle(
  `${checkboxContainer} input[aria-checked="mixed"] + .${icon} .${checkMixedMark}`,
  {
    fill: theme.colors.neutral.iconStronger,
  },
)
globalStyle(
  `${checkboxContainer} input[aria-checked="mixed"] + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.primary.backgroundStrong,
    stroke: theme.colors.primary.borderStrong,
  },
)

globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='false'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.primary.borderHover,
    fill: theme.colors.primary.backgroundHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='true'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.primary.borderStrongHover,
    fill: theme.colors.primary.backgroundStrongHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='mixed'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.primary.borderStrongHover,
    fill: theme.colors.primary.backgroundStrongHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='false'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.borderHover,
    fill: theme.colors.danger.backgroundHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='true'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.borderStrongHover,
    fill: theme.colors.danger.backgroundStrongHover,
  },
)

globalStyle(`${checkboxContainer} input[aria-invalid="true"] + .${icon}`, {
  fill: theme.colors.danger.backgroundStrong,
})

globalStyle(
  `${checkboxContainer} input[aria-invalid="true"] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.backgroundStrong,
    fill: theme.colors.danger.background,
  },
)

globalStyle(`${checkboxInput}:focus + .${icon}`, {
  backgroundColor: theme.colors.primary.background,
  fill: theme.colors.danger.background,
  outline: `1px solid ${theme.shadows.focusPrimary}`,
})

globalStyle(`${checkboxInput}:focus + .${icon} .${innerCheckbox}`, {
  stroke: theme.colors.primary.borderHover,
  fill: theme.colors.primary.backgroundHover,
})

globalStyle(`${checkboxInput}[aria-invalid='true']:focus + .${icon}`, {
  backgroundColor: theme.colors.danger.background,
  fill: theme.colors.danger.background,
  outline: `1px solid ${theme.shadows.focusDanger}`,
})

globalStyle(
  `${checkboxInput}[aria-invalid='true']:focus + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.borderHover,
    fill: theme.colors.danger.backgroundHover,
  },
)

globalStyle(
  `${checkboxInput}:not(:disabled):checked + .${icon}, ${checkboxInput}:not(:disabled)[aria-checked='mixed'] + .${icon}`,
  {
    fill: theme.colors.primary.backgroundStrong,
  },
)

globalStyle(
  `${checkboxInput}:not(:disabled):checked + .${icon} .${innerCheckbox}, ${checkboxInput}:not(:disabled)[aria-checked='mixed'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.primary.borderStrong,
  },
)

globalStyle(
  `${checkboxInput}:not(:disabled)[aria-invalid='true'] + .${icon}, ${checkboxInput}:not(:disabled)[aria-invalid='mixed'] + .${icon}`,
  {
    fill: theme.colors.danger.background,
  },
)

globalStyle(
  `${checkboxInput}:not(:disabled)[aria-invalid='true'] + .${icon} .${innerCheckbox}, ${checkboxInput}:not(:disabled)[aria-invalid='mixed'] + .${icon} .${innerCheckbox}`,
  {
    stroke: theme.colors.danger.border,
  },
)
