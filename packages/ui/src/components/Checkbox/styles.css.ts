import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { checkboxGroup } from '../CheckboxGroup/styles.css'
import { listCheckboxInRange } from '../List/styles.css'
import { labelContainerSelectableCardLabel } from '../SelectableCard/styles.css'

export const errorText = style({
  paddingTop: theme.space['0.5'],
})

const checkboxContainerBase = style({
  display: 'inline-flex',
  position: 'relative',
  selectors: {
    "&[aria-disabled='true']": {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
    [`${labelContainerSelectableCardLabel} &`]: {
      width: '100%',
    },
  },
})

export const checkboxContainer = styleVariants({
  default: [checkboxContainerBase, { gap: theme.space['1'] }],
  small: [checkboxContainerBase, { gap: theme.space['0.5'] }],
})

const checkboxInputBase = style({
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
export const checkboxInput = styleVariants({
  default: [
    checkboxInputBase,
    { height: theme.sizing[300], width: theme.sizing[300] },
  ],
  small: [
    checkboxInputBase,
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
    [`${checkboxContainerBase}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.borderDisabled,
    },
    [`${checkboxContainerBase}[aria-disabled='true'] input[aria-invalid="true"]:checked + &`]:
      {
        fill: theme.colors.danger.backgroundStrongDisabled,
      },
    [`${checkboxContainerBase}[aria-disabled='true'] input[aria-invalid="true"] + &`]:
      {
        fill: theme.colors.danger.background,
      },
    [`${checkboxContainerBase}[aria-disabled='true'] input:checked + &`]: {
      fill: theme.colors.primary.backgroundStrongDisabled,
    },
    [`${checkboxContainerBase}[aria-disabled='true'] input[aria-checked="mixed"] + &`]:
      {
        fill: theme.colors.primary.backgroundStrongDisabled,
      },
    [`${checkboxContainerBase} input[aria-invalid="true"] + &`]: {
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${checkboxInputBase}:focus + &`]: {
      backgroundColor: theme.colors.primary.background,
      fill: theme.colors.danger.background,
      outline: `1px solid ${theme.shadows.focusPrimary}`,
    },
    [`${checkboxInputBase}[aria-invalid='true']:focus + &`]: {
      backgroundColor: theme.colors.danger.background,
      fill: theme.colors.danger.background,
      outline: `1px solid ${theme.shadows.focusDanger}`,
    },
    [`${checkboxInputBase}:not(:disabled):checked + &, ${checkboxInputBase}:not(:disabled)[aria-checked='mixed'] + &`]:
      {
        fill: theme.colors.primary.backgroundStrong,
      },
    [`${checkboxInputBase}:not(:disabled)[aria-invalid='true'] + &, ${checkboxInputBase}:not(:disabled)[aria-invalid='mixed'] + &`]:
      {
        fill: theme.colors.danger.background,
      },
  },
})

export const icon = styleVariants({
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

export const innerCheckbox = style({
  fill: theme.colors.neutral.background,
  stroke: theme.colors.neutral.border,
  selectors: {
    [`${checkboxContainerBase}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
      stroke: theme.colors.neutral.borderStrongDisabled,
    },
    [`${checkboxContainerBase}[aria-disabled='true'] input[aria-invalid="true"]:checked + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundStrongDisabled,
        stroke: theme.colors.danger.borderStrongDisabled,
      },
    [`${checkboxContainerBase}[aria-disabled='true'] input[aria-invalid="true"] + ${iconBase} &`]:
      {
        fill: theme.colors.danger.background,
        stroke: theme.colors.danger.borderDisabled,
      },
    [`${checkboxContainerBase}[aria-disabled='true'] input:checked + ${iconBase} &`]:
      {
        fill: theme.colors.primary.borderDisabled,
        stroke: theme.colors.primary.borderDisabled,
      },
    [`${checkboxContainerBase}[aria-disabled='true'] input[aria-checked="mixed"] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundStrongDisabled,
        stroke: theme.colors.primary.borderStrongDisabled,
      },
    [`${checkboxContainerBase} input:checked + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
      transformOrigin: 'center',
      transition: '200ms fill ease-in-out',
    },
    [`${checkboxContainerBase} input[aria-invalid="true"]:checked + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundStrong,
        stroke: theme.colors.danger.borderStrong,
      },
    [`${checkboxContainerBase} input[aria-checked="mixed"] + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
    },
    [`${checkboxContainerBase}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='false'] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundHover,
        stroke: theme.colors.primary.borderHover,
      },
    [`${checkboxContainerBase}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='true'] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundStrongHover,
        stroke: theme.colors.primary.borderStrongHover,
      },
    [`${checkboxContainerBase}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='mixed'] + ${iconBase} &`]:
      {
        fill: theme.colors.primary.backgroundStrongHover,
        stroke: theme.colors.primary.borderStrongHover,
      },
    [`${checkboxContainerBase}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='false'] + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundHover,
        stroke: theme.colors.danger.borderHover,
      },
    [`${checkboxContainerBase}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='true'] + ${iconBase} &`]:
      {
        fill: theme.colors.danger.backgroundStrongHover,
        stroke: theme.colors.danger.borderStrongHover,
      },
    [`${checkboxContainerBase} input[aria-invalid="true"] + ${iconBase} &`]: {
      fill: theme.colors.danger.background,
      stroke: theme.colors.danger.backgroundStrong,
    },
    [`${checkboxInputBase}:focus + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundHover,
      stroke: theme.colors.primary.borderHover,
    },
    [`${checkboxInputBase}[aria-invalid='true']:focus + ${iconBase} &`]: {
      fill: theme.colors.danger.backgroundHover,
      stroke: theme.colors.danger.borderHover,
    },
    [`${checkboxInputBase}:not(:disabled):checked + ${iconBase} &, ${checkboxInputBase}:not(:disabled)[aria-checked='mixed'] + ${iconBase} &`]:
      {
        stroke: theme.colors.primary.borderStrong,
      },
    [`${checkboxInputBase}:not(:disabled)[aria-invalid='true'] + ${iconBase} &, ${checkboxInputBase}:not(:disabled)[aria-invalid='mixed'] + ${iconBase} &`]:
      {
        stroke: theme.colors.danger.border,
      },
    [`${listCheckboxInRange} &`]: {
      fill: theme.colors.neutral.backgroundHover,
      stroke: theme.colors.neutral.borderHover,
    },
  },
})

export const iconPath = style({
  fill: theme.colors.neutral.background,
  transform: 'scale(0)',
  selectors: {
    [`${checkboxContainerBase} input:checked + ${iconBase} &`]: {
      transform: 'scale(1) translate(2px, 2px)',
      transformOrigin: 'center',
      transition: '200ms transform ease-in-out',
    },
  },
})

export const checkMixedMark = style({
  selectors: {
    [`${checkboxContainerBase} input[aria-checked="mixed"] + ${iconBase} &`]: {
      fill: theme.colors.neutral.iconStronger,
    },
  },
})

export const label = style({
  cursor: 'pointer',
  width: '100%',
  selectors: {
    [`${checkboxContainerBase}[aria-disabled='true'] &`]: {
      cursor: 'not-allowed',
    },
    [`${checkboxGroup} &`]: {
      width: 'fit-content',
    },
  },
})
