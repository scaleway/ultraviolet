import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { listStyle } from '../../Data Display/List/styles.css'
import { checkboxGroupStyle } from '../CheckboxGroup/styles.css'
import { selectableCardStyle } from '../SelectableCard/styles.css'

const containerBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
  selectors: {
    "&[aria-disabled='true']": {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
    [`${selectableCardStyle.labelContainerSelectableCardLabel} &`]: {
      width: '100%',
    },
    [`${selectableCardStyle.labelContainerSelectableCardLabel}${selectableCardStyle.labelContainerSelectableCardLabelDescription} &`]:
      {
        width: 'auto',
      },
  },
})

const container = styleVariants({
  default: [containerBase, { gap: theme.space['1'] }],
  small: [containerBase, { gap: theme.space['0.5'] }],
})

const input = style({
  borderWidth: 0,
  inset: 0,
  height: '100%',
  width: '100%',
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

// 24x24 click area, holds the input and the (smaller) square-shaped svg centered.
const iconWrapper = style({
  alignSelf: 'start',
  alignItems: 'center',
  display: 'inline-flex',
  flexShrink: 0,
  height: theme.sizing['300'],
  justifyContent: 'center',
  position: 'relative',
  width: theme.sizing['300'],
  selectors: {
    // no display:none so the real input stays in the accessibility tree.
    [`[data-show-tick='false'] ${selectableCardStyle.selectableElement} > &`]: {
      height: 0,
      position: 'absolute',
      width: 0,
    },
  },
})

const iconBase = style({
  overflow: 'visible',
  borderRadius: theme.radii.default,
  selectors: {
    [`[data-show-tick='false'] ${selectableCardStyle.selectableElement} > ${iconWrapper} &`]: {
      display: 'none',
    },
    [`${containerBase}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.borderDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"]:checked + &`]: {
      fill: theme.colors.danger.backgroundStrongDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"] + &`]: {
      fill: theme.colors.danger.background,
    },
    [`${containerBase}[aria-disabled='true'] input:is(:checked, [aria-checked="mixed"]) + &`]: {
      fill: theme.colors.primary.backgroundStrongDisabled,
    },
    [`${containerBase} input[aria-invalid="true"] + &`]: {
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${input}:not(:disabled):is(:checked, [aria-checked='mixed']) + &`]: {
      fill: theme.colors.primary.backgroundStrong,
    },
    [`${input}:not(:disabled):is([aria-invalid='true'], [aria-invalid='mixed']) + &`]: {
      fill: theme.colors.danger.background,
    },
    [`${input}:focus-visible + &`]: {
      boxShadow: theme.shadows.focusPrimary,
    },
    [`${input}[aria-invalid='true']:focus-visible + &`]: {
      boxShadow: theme.shadows.focusDanger,
    },
  },
})

// The svg is exactly the square size, so the focus ring hugs its edge.
const icon = styleVariants({
  default: [
    iconBase,
    {
      height: theme.sizing['250'],
      minHeight: theme.sizing['250'],
      minWidth: theme.sizing['250'],
      width: theme.sizing['250'],
    },
  ],
  small: [
    iconBase,
    {
      height: theme.sizing['200'],
      minHeight: theme.sizing['200'],
      minWidth: theme.sizing['200'],
      width: theme.sizing['200'],
    },
  ],
})

// hover and keyboard focus-visible show the same highlight
const active = `${containerBase}:is(:hover[aria-disabled='false'], :has(input:focus-visible))`
const activeState = (state: string) => `${active} input${state} + ${iconBase} &`

const innerCheckbox = style({
  fill: theme.colors.neutral.background,
  stroke: theme.colors.neutral.border,
  selectors: {
    [`${containerBase}[aria-disabled='true'] &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
      stroke: theme.colors.neutral.borderStrongDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"]:checked + ${iconBase} &`]: {
      fill: theme.colors.danger.backgroundStrongDisabled,
      stroke: theme.colors.danger.borderStrongDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-invalid="true"] + ${iconBase} &`]: {
      fill: theme.colors.danger.background,
      stroke: theme.colors.danger.borderDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input:checked + ${iconBase} &`]: {
      fill: theme.colors.primary.borderDisabled,
      stroke: theme.colors.primary.borderDisabled,
    },
    [`${containerBase}[aria-disabled='true'] input[aria-checked="mixed"] + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrongDisabled,
      stroke: theme.colors.primary.borderStrongDisabled,
    },
    [`${containerBase} input:checked + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
      transformOrigin: 'center',
      transition: '300ms fill cubic-bezier(0.22, 1, 0.36, 1)',
    },
    [`${containerBase} input[aria-invalid="true"]:checked + ${iconBase} &`]: {
      fill: theme.colors.danger.backgroundStrong,
      stroke: theme.colors.danger.borderStrong,
    },
    [`${containerBase} input[aria-checked="mixed"] + ${iconBase} &`]: {
      fill: theme.colors.primary.backgroundStrong,
      stroke: theme.colors.primary.borderStrong,
    },
    [activeState("[aria-invalid='false'][aria-checked='false']")]: {
      fill: theme.colors.primary.backgroundHover,
      stroke: theme.colors.primary.borderHover,
    },
    [activeState("[aria-invalid='false']:is(:checked, [aria-checked='mixed'])")]: {
      fill: theme.colors.primary.backgroundStrongHover,
      stroke: theme.colors.primary.borderStrongHover,
    },
    [activeState("[aria-invalid='true'][aria-checked='false']")]: {
      fill: theme.colors.danger.backgroundHover,
      stroke: theme.colors.danger.borderHover,
    },
    [activeState("[aria-invalid='true'][aria-checked='true']")]: {
      fill: theme.colors.danger.backgroundStrongHover,
      stroke: theme.colors.danger.borderStrongHover,
    },
    [`${containerBase} input[aria-invalid="true"] + ${iconBase} &`]: {
      fill: theme.colors.danger.background,
      stroke: theme.colors.danger.backgroundStrong,
    },
    [`${input}:not(:disabled):is(:checked, [aria-checked='mixed']) + ${iconBase} &`]: {
      stroke: theme.colors.primary.borderStrong,
    },
    [`${input}:not(:disabled):is([aria-invalid='true'], [aria-invalid='mixed']) + ${iconBase} &`]: {
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
      transform: 'scale(1)',
      transformOrigin: 'center',
      transition: '300ms transform cubic-bezier(0.22, 1, 0.36, 1)',
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
    [`${container.small} &`]: {
      marginTop: theme.space[0.25],
    },
  },
})

const labelWrapper = style({
  selectors: {
    [`${container.small} &`]: {
      minHeight: theme.sizing['300'],
    },
  },
})

export const checkboxStyle = {
  container,
  input,
  iconWrapper,
  icon,
  innerCheckbox,
  iconPath,
  checkMixedMark,
  label,
  labelWrapper,
}
