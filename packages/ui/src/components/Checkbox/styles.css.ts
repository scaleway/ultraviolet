import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

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
  minHeight: theme.sizing['300'],
  minWidth: theme.sizing['300'],
  width: theme.sizing['300'],
})

globalStyle(`${icon} path`, {
  fill: theme.colors.neutral.background,
  transform: 'scale(0)',
})

export const label = style({
  cursor: 'pointer',
  width: '100%',
})

export const checkboxInput = style({
  borderWidth: 0,
  height: theme.sizing['300'],
  opacity: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: theme.sizing['300'],
})

export const checkboxContainer = style({
  alignItems: 'center',
  display: 'inline-flex',
  gap: theme.space['1'],
  position: 'relative',
})

globalStyle(`${checkboxInput}:not(:disabled)`, {
  cursor: 'pointer',
})

globalStyle(`${checkboxInput}:disabled`, {
  cursor: 'not-allowed',
})

globalStyle(`${checkboxContainer}[aria-disabled='true']`, {
  color: theme.colors.neutral.textDisabled,
  cursor: 'not-allowed',
})
globalStyle(`${checkboxContainer}[aria-disabled='true'] label`, {
  cursor: 'not-allowed',
})

// CheckboxContainer icon and innerCheckbox disabled styles
globalStyle(`${checkboxContainer}[aria-disabled='true'] .${icon}`, {
  fill: theme.colors.neutral.borderDisabled,
})
globalStyle(`${checkboxContainer}[aria-disabled='true'] .${innerCheckbox}`, {
  fill: theme.colors.neutral.backgroundDisabled,
  stroke: theme.colors.neutral.borderStrongDisabled,
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
    fill: theme.colors.danger.backgroundStrongDisabled,
    stroke: theme.colors.danger.borderStrongDisabled,
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
    fill: theme.colors.danger.background,
    stroke: theme.colors.danger.borderDisabled,
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
    fill: theme.colors.primary.borderDisabled,
    stroke: theme.colors.primary.borderDisabled,
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
    fill: theme.colors.primary.backgroundStrongDisabled,
    stroke: theme.colors.primary.borderStrongDisabled,
  },
)

globalStyle(`${checkboxContainer} input:checked + .${icon} path`, {
  transform: 'scale(1) translate(2px, 2px)',
  transformOrigin: 'center',
  transition: '200ms transform ease-in-out',
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
    fill: theme.colors.primary.backgroundHover,
    stroke: theme.colors.primary.borderHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='true'] + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.primary.backgroundStrongHover,
    stroke: theme.colors.primary.borderStrongHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='mixed'] + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.primary.backgroundStrongHover,
    stroke: theme.colors.primary.borderStrongHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='false'] + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.danger.backgroundHover,
    stroke: theme.colors.danger.borderHover,
  },
)
globalStyle(
  `${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='true'] + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.danger.backgroundStrongHover,
    stroke: theme.colors.danger.borderStrongHover,
  },
)

globalStyle(`${checkboxContainer} input[aria-invalid="true"] + .${icon}`, {
  fill: theme.colors.danger.backgroundStrong,
})

globalStyle(
  `${checkboxContainer} input[aria-invalid="true"] + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.danger.background,
    stroke: theme.colors.danger.backgroundStrong,
  },
)

globalStyle(`${checkboxInput}:focus + .${icon}`, {
  backgroundColor: theme.colors.primary.background,
  fill: theme.colors.danger.background,
  outline: `1px solid ${theme.shadows.focusPrimary}`,
})

globalStyle(`${checkboxInput}:focus + .${icon} .${innerCheckbox}`, {
  fill: theme.colors.primary.backgroundHover,
  stroke: theme.colors.primary.borderHover,
})

globalStyle(`${checkboxInput}[aria-invalid='true']:focus + .${icon}`, {
  backgroundColor: theme.colors.danger.background,
  fill: theme.colors.danger.background,
  outline: `1px solid ${theme.shadows.focusDanger}`,
})

globalStyle(
  `${checkboxInput}[aria-invalid='true']:focus + .${icon} .${innerCheckbox}`,
  {
    fill: theme.colors.danger.backgroundHover,
    stroke: theme.colors.danger.borderHover,
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
