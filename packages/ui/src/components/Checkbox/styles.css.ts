import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { checkboxGroup } from '../CheckboxGroup/styles.css'
import { listCheckboxInRange } from '../List/styles.css'
import { labelContainerSelectableCardLabel } from '../SelectableCard/styles.css'

export const errorText = style({
  paddingTop: theme.space['0.5'],
})

export const checkboxContainer = style({
  display: 'inline-flex',
  gap: theme.space['1'],
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
export const checkboxInput = style({
  borderWidth: 0,
  height: theme.sizing['300'],
  opacity: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: theme.sizing['300'],
  selectors: {
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

export const icon = style({
  borderRadius: theme.radii.default,
  height: theme.sizing['300'],
  minHeight: theme.sizing['300'],
  minWidth: theme.sizing['300'],
  width: theme.sizing['300'],
  selectors: {
    [`${checkboxContainer}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.borderDisabled,
    },
    [`${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"]:checked + &`]:
      {
        fill: theme.colors.danger.backgroundStrongDisabled,
      },
    [`${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"] + &`]:
      {
        fill: theme.colors.danger.background,
      },
    [`${checkboxContainer}[aria-disabled='true'] input:checked + &`]: {
      fill: theme.colors.primary.backgroundStrongDisabled,
    },
    [`${checkboxContainer}[aria-disabled='true'] input[aria-checked="mixed"] + &`]:
      {
        fill: theme.colors.primary.backgroundStrongDisabled,
      },
    [`${checkboxContainer} input[aria-invalid="true"] + &`]: {
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${checkboxInput}:focus + &`]: {
      backgroundColor: theme.colors.primary.background,
      fill: theme.colors.danger.background,
      outline: `1px solid ${theme.shadows.focusPrimary}`,
    },
    [`${checkboxInput}[aria-invalid='true']:focus + &`]: {
      backgroundColor: theme.colors.danger.background,
      fill: theme.colors.danger.background,
      outline: `1px solid ${theme.shadows.focusDanger}`,
    },
    [`${checkboxInput}:not(:disabled):checked + &, ${checkboxInput}:not(:disabled)[aria-checked='mixed'] + &`]:
      {
        fill: theme.colors.primary.backgroundStrong,
      },
    [`${checkboxInput}:not(:disabled)[aria-invalid='true'] + &, ${checkboxInput}:not(:disabled)[aria-invalid='mixed'] + &`]:
      {
        fill: theme.colors.danger.background,
      },
  },
})

export const innerCheckbox = style({
  fill: theme.colors.neutral.background,
  stroke: theme.colors.neutral.border,
  selectors: {
    [`${checkboxContainer}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
      stroke: theme.colors.neutral.borderStrongDisabled,
    },
    [`${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"]:checked + ${icon} &`]:
      {
        fill: theme.colors.danger.backgroundStrongDisabled,
        stroke: theme.colors.danger.borderStrongDisabled,
      },
    [`${checkboxContainer}[aria-disabled='true'] input[aria-invalid="true"] + ${icon} &`]:
      {
        fill: theme.colors.danger.background,
        stroke: theme.colors.danger.borderDisabled,
      },
    [`${checkboxContainer}[aria-disabled='true'] input:checked + ${icon} &`]: {
      fill: theme.colors.primary.borderDisabled,
      stroke: theme.colors.primary.borderDisabled,
    },
    [`${checkboxContainer}[aria-disabled='true'] input[aria-checked="mixed"] + ${icon} &`]:
      {
        fill: theme.colors.primary.backgroundStrongDisabled,
        stroke: theme.colors.primary.borderStrongDisabled,
      },
    [`${checkboxContainer} input:checked + ${icon} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
      transformOrigin: 'center',
      transition: '200ms fill ease-in-out',
    },
    [`${checkboxContainer} input[aria-invalid="true"]:checked + ${icon} &`]: {
      fill: theme.colors.danger.backgroundStrong,
      stroke: theme.colors.danger.borderStrong,
    },
    [`${checkboxContainer} input[aria-checked="mixed"] + ${icon} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
    },
    [`${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='false'] + ${icon} &`]:
      {
        fill: theme.colors.primary.backgroundHover,
        stroke: theme.colors.primary.borderHover,
      },
    [`${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='true'] + ${icon} &`]:
      {
        fill: theme.colors.primary.backgroundStrongHover,
        stroke: theme.colors.primary.borderStrongHover,
      },
    [`${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='false'][aria-checked='mixed'] + ${icon} &`]:
      {
        fill: theme.colors.primary.backgroundStrongHover,
        stroke: theme.colors.primary.borderStrongHover,
      },
    [`${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='false'] + ${icon} &`]:
      {
        fill: theme.colors.danger.backgroundHover,
        stroke: theme.colors.danger.borderHover,
      },
    [`${checkboxContainer}:hover[aria-disabled='false'] input[aria-invalid='true'][aria-checked='true'] + ${icon} &`]:
      {
        fill: theme.colors.danger.backgroundStrongHover,
        stroke: theme.colors.danger.borderStrongHover,
      },
    [`${checkboxContainer} input[aria-invalid="true"] + ${icon} &`]: {
      fill: theme.colors.danger.background,
      stroke: theme.colors.danger.backgroundStrong,
    },
    [`${checkboxInput}:focus + ${icon} &`]: {
      fill: theme.colors.primary.backgroundHover,
      stroke: theme.colors.primary.borderHover,
    },
    [`${checkboxInput}[aria-invalid='true']:focus + ${icon} &`]: {
      fill: theme.colors.danger.backgroundHover,
      stroke: theme.colors.danger.borderHover,
    },
    [`${checkboxInput}:not(:disabled):checked + ${icon} &, ${checkboxInput}:not(:disabled)[aria-checked='mixed'] + ${icon} &`]:
      {
        stroke: theme.colors.primary.borderStrong,
      },
    [`${checkboxInput}:not(:disabled)[aria-invalid='true'] + ${icon} &, ${checkboxInput}:not(:disabled)[aria-invalid='mixed'] + ${icon} &`]:
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
    [`${checkboxContainer} input:checked + ${icon} &`]: {
      transform: 'scale(1) translate(2px, 2px)',
      transformOrigin: 'center',
      transition: '200ms transform ease-in-out',
    },
  },
})

export const checkMixedMark = style({
  selectors: {
    [`${checkboxContainer} input[aria-checked="mixed"] + ${icon} &`]: {
      fill: theme.colors.neutral.iconStronger,
    },
  },
})

export const label = style({
  cursor: 'pointer',
  width: '100%',
  selectors: {
    [`${checkboxContainer}[aria-disabled='true'] &`]: {
      cursor: 'not-allowed',
    },
    [`${checkboxGroup} &`]: {
      width: 'fit-content',
    },
  },
})
