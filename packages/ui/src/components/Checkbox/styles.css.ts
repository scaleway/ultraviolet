import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { checkboxGroupStyle } from '../CheckboxGroup/styles.css'
import { listStyle } from '../List/styles.css'
import { selectableCardStyle } from '../SelectableCard/styles.css'

const errorText = style({
  paddingTop: theme.space['0.5'],
})

const containerBase = style({
  display: 'inline-flex',
  position: 'relative',
  selectors: {
    "&[aria-disabled='true']": {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
    [`${selectableCardStyle.labelContainerSelectableCardLabel} &`]: {
      width: '100%',
    },
  },
})

const container = styleVariants({
  default: [containerBase, { gap: theme.space['1'] }],
  small: [containerBase, { gap: theme.space['0.5'] }],
})

const inputBase = style({
  borderWidth: 0,
  opacity: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  selectors: {
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

const input = styleVariants({
  default: [inputBase, { height: theme.sizing[300], width: theme.sizing[300] }],
  small: [
    inputBase,
    {
      height: theme.sizing[200],
      width: theme.sizing[200],
      marginTop: theme.space['0.25'],
    },
  ],
})

const iconBase = style({
  borderRadius: theme.radii.default,
  selectors: {
    [`${containerBase}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.borderDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"]:checked + &`]:
      {
        fill: theme.colors.danger.backgroundStrongDisabled,
      },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"] + &`]: {
      fill: theme.colors.danger.background,
    },
    [`${containerBase}[aria-disabled='true'] input:checked + &`]: {
      fill: theme.colors.primary.backgroundStrongDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-checked="mixed"] + &`]:
      {
        fill: theme.colors.primary.backgroundStrongDisabled,
      },
    [`${containerBase} input[aria-invalid="true"] + &`]: {
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${inputBase}:focus + &`]: {
      backgroundColor: theme.colors.primary.background,
      fill: theme.colors.danger.background,
      outline: `1px solid ${theme.shadows.focusPrimary}`,
    },
    [`${inputBase}[aria-invalid='true']:focus + &`]: {
      backgroundColor: theme.colors.danger.background,
      fill: theme.colors.danger.background,
      outline: `1px solid ${theme.shadows.focusDanger}`,
    },
    [`${inputBase}:not(:disabled):checked + &, ${inputBase}:not(:disabled)[aria-checked='mixed'] + &`]:
      {
        fill: theme.colors.primary.backgroundStrong,
      },
    [`${inputBase}:not(:disabled)[aria-invalid='true'] + &, ${inputBase}:not(:disabled)[aria-invalid='mixed'] + &`]:
      {
        fill: theme.colors.danger.background,
      },
  },
})

const icon = styleVariants({
  default: [
    iconBase,
    {
      height: theme.sizing['300'],
      minHeight: theme.sizing['300'],
      minWidth: theme.sizing['300'],
      width: theme.sizing['300'],
    },
  ],
  small: [
    iconBase,
    {
      marginTop: theme.space['0.25'],
      height: theme.sizing['200'],
      minHeight: theme.sizing['200'],
      minWidth: theme.sizing['200'],
      width: theme.sizing['200'],
    },
  ],
})

const innerCheckbox = style({
  fill: theme.colors.neutral.background,
  stroke: theme.colors.neutral.border,
  selectors: {
    [`${containerBase}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
      stroke: theme.colors.neutral.borderStrongDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"]:checked + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundStrongDisabled,
        stroke: theme.colors.danger.borderStrongDisabled,
      },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"] + ${iconBase} &`]:
      {
        fill: theme.colors.danger.background,
        stroke: theme.colors.danger.borderDisabled,
      },
    [`${containerBase}[aria-disabled='true'] input:checked + ${iconBase} &`]: {
      fill: theme.colors.primary.borderDisabled,
      stroke: theme.colors.primary.borderDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-checked="mixed"] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundStrongDisabled,
        stroke: theme.colors.primary.borderStrongDisabled,
      },
    [`${containerBase} input:checked + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
      transformOrigin: 'center',
      transition: '200ms fill ease-in-out',
    },
    [`${containerBase} input[aria-invalid="true"]:checked + ${iconBase} &`]: {
      fill: theme.colors.danger.backgroundStrong,
      stroke: theme.colors.danger.borderStrong,
    },
    [`${containerBase} input[aria-checked="mixed"] + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
    },
    [`${containerBase}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='false'] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundHover,
        stroke: theme.colors.primary.borderHover,
      },
    [`${containerBase}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='true'] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundStrongHover,
        stroke: theme.colors.primary.borderStrongHover,
      },
    [`${containerBase}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='mixed'] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundStrongHover,
        stroke: theme.colors.primary.borderStrongHover,
      },
    [`${containerBase}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='false'] + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundHover,
        stroke: theme.colors.danger.borderHover,
      },
    [`${containerBase}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='true'] + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundStrongHover,
        stroke: theme.colors.danger.borderStrongHover,
      },
    [`${containerBase} input[aria-invalid="true"] + ${iconBase} &`]: {
      fill: theme.colors.danger.background,
      stroke: theme.colors.danger.backgroundStrong,
    },
    [`${inputBase}:focus + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundHover,
      stroke: theme.colors.primary.borderHover,
    },
    [`${inputBase}[aria-invalid='true']:focus + ${iconBase} &`]: {
      fill: theme.colors.danger.backgroundHover,
      stroke: theme.colors.danger.borderHover,
    },
    [`${inputBase}:not(:disabled):checked + ${iconBase} &, ${inputBase}:not(:disabled)[aria-checked='mixed'] + ${iconBase} &`]:
      {
        stroke: theme.colors.primary.borderStrong,
      },
    [`${inputBase}:not(:disabled)[aria-invalid='true'] + ${iconBase} &, ${inputBase}:not(:disabled)[aria-invalid='mixed'] + ${iconBase} &`]:
      {
        stroke: theme.colors.danger.border,
      },
    [`${listStyle.checkboxInRange} &`]: {
      fill: theme.colors.neutral.backgroundHover,
      stroke: theme.colors.neutral.borderHover,
    },
  },
})

const iconPath = style({
  fill: theme.colors.neutral.background,
  transform: 'scale(0)',
  selectors: {
    [`${containerBase} input:checked + ${iconBase} &`]: {
      transform: 'scale(1) translate(2px, 2px)',
      transformOrigin: 'center',
      transition: '200ms transform ease-in-out',
    },
  },
})

const checkMixedMark = style({
  selectors: {
    [`${containerBase} input[aria-checked="mixed"] + ${iconBase} &`]: {
      fill: theme.colors.neutral.iconStronger,
    },
  },
})

const label = style({
  cursor: 'pointer',
  width: '100%',
  selectors: {
    [`${containerBase}[aria-disabled='true'] &`]: {
      cursor: 'not-allowed',
    },
    [`${checkboxGroupStyle.checkboxGroup} &`]: {
      width: 'fit-content',
    },
  },
})

export const checkboxStyle = {
  errorText,
  container,
  input,
  icon,
  innerCheckbox,
  iconPath,
  checkMixedMark,
  label,
}
