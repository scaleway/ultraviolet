import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { switchButtonStyle } from '../../Action/SwitchButton/styles.css'
import { selectableCardStyle } from '../SelectableCard/styles.css'
import { widthSelectable } from '../SelectableCard/variables.css'
import { selectableCardOptionGroupStyle } from '../SelectableCardOptionGroup/styles.css'

const stack = style({
  selectors: {
    [`${selectableCardOptionGroupStyle.selectableCard} &`]: {
      marginTop: `calc(-1 * ${theme.space[2]})`,
      padding: theme.space[1],
      position: 'absolute',
    },
    [`${selectableCardStyle.labelContainerSelectableCardLabel} &`]: {
      width: '100%',
    },
    [`${selectableCardStyle.labelContainerSelectableCardLabel}${selectableCardStyle.labelContainerSelectableCardLabelDescription} &`]:
      {
        width: 'auto',
      },
    [`${selectableCardStyle.selectableElement} > &`]: {
      width: widthSelectable,
    },
  },
})

const margedText = style({
  marginLeft: theme.space['4'],
})

const containerBase = style({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  position: 'relative',
  selectors: {
    "&[aria-disabled='false']": {
      cursor: 'pointer',
    },
    "&[aria-disabled='true']": {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
  },
})

const container = styleVariants({
  small: [containerBase, { gap: theme.space['0.5'] }],
  medium: [containerBase, { gap: theme.space['1'] }],
})

const textLabelBase = style({
  cursor: 'pointer',
  width: '100%',
  selectors: {
    [`${containerBase}[aria-disabled='true'] &`]: {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
  },
})

const textLabel = styleVariants({
  small: [
    textLabelBase,
    {
      paddingTop: theme.space['0.25'],
      minHeight: theme.sizing[300],
    },
  ],
  medium: [textLabelBase],
})

const label = style({
  selectors: {
    [`${switchButtonStyle.optionBase}[data-checked='true'] &`]: {
      color: theme.colors.neutral.textStrong,
    },
    [`${switchButtonStyle.optionBase} &`]: {
      transition: 'color 200ms cubic-bezier(0.5, 0, 0.1, 1)',
    },
    [`${switchButtonStyle.optionPrimary}[data-checked="true"] &`]: {
      color: theme.colors.primary.textStrong,
    },
    [`${switchButtonStyle.optionNeutral}[data-checked="false"] &:hover`]: {
      color: theme.colors.neutral.textHover,
    },
    [`${switchButtonStyle.optionPrimary}[data-checked="false"] &:hover`]: {
      color: theme.colors.primary.text,
    },
    [`${switchButtonStyle.optionBase}[data-disabled="true"] &`]: {
      color: theme.colors.neutral.textDisabled,
    },
    [`${switchButtonStyle.optionBase}[data-checked='false'][data-disabled="true"] &:hover`]: {
      background: 'transparent',
      color: theme.colors.neutral.textDisabled,
    },
  },
})

const labelStyle = style({
  cursor: 'pointer',
  width: '100%',
})

// 24x24 click area, holds the input and the (smaller) 20px ring centered.
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

const radio = style({
  borderWidth: 0,
  cursor: 'pointer',
  inset: 0,
  height: '100%',
  opacity: 0,
  position: 'absolute',
  selectors: {
    "&[aria-disabled='true']": {
      cursor: 'not-allowed',
    },
  },
  whiteSpace: 'nowrap',
  width: '100%',
})

// hover and keyboard focus-visible show the same highlight
const active = `${containerBase}:is(:hover[aria-disabled='false'], :has(${radio}:focus-visible))`

const ring = style({
  borderRadius: theme.radii.circle,
  fill: theme.colors.neutral.border,
  transition: 'fill 300ms cubic-bezier(0.22, 1, 0.36, 1)',
  selectors: {
    [`${containerBase}[data-invalid='false'] ${radio}:checked + &`]: {
      fill: theme.colors.primary.backgroundStrong,
    },
    [`${containerBase} ${radio}:checked:disabled + &`]: {
      fill: theme.colors.primary.borderDisabled,
    },
    [`${containerBase}[data-invalid='true'] &`]: {
      fill: theme.colors.danger.borderStrong,
    },
    [`${containerBase}[data-invalid='true'] ${radio}:disabled + &`]: {
      fill: theme.colors.danger.backgroundStrongDisabled,
    },
    [`${containerBase}[data-invalid='false'] ${radio}:not(:disabled):active + &`]: {
      fill: theme.colors.primary.backgroundStrong,
    },
    [`${containerBase}[data-invalid='true'] ${radio}:not(:disabled):active + &`]: {
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${active}[data-invalid='false'] ${radio}:not(:disabled) + &`]: {
      fill: theme.colors.primary.borderHover,
    },
    [`${containerBase}:disabled &`]: {
      cursor: 'not-allowed',
      fill: theme.colors.neutral.borderDisabled,
    },
    [`${containerBase} ${radio}:not(:disabled):focus-visible + &`]: {
      boxShadow: theme.shadows.focusPrimary,
    },
    [`${containerBase}[data-invalid='true'] ${radio}:not(:disabled):focus-visible + &`]: {
      boxShadow: theme.shadows.focusDanger,
    },
    [`[data-show-tick='false'] ${selectableCardStyle.selectableElement} > ${iconWrapper} &`]: {
      display: 'none',
    },
  },
})

const ringSize = styleVariants({
  medium: {
    height: theme.sizing['250'],
    minHeight: theme.sizing['250'],
    minWidth: theme.sizing['250'],
    width: theme.sizing['250'],
  },
  small: {
    height: theme.sizing['200'],
    minHeight: theme.sizing['200'],
    minWidth: theme.sizing['200'],
    width: theme.sizing['200'],
  },
})

const mark = style({
  selectors: {
    [`${radio} + ${ring} &`]: {
      transform: 'scale(0)',
    },
    [`${radio}:checked + ${ring} &`]: {
      transform: 'scale(1)',
    },
  },
  transformOrigin: 'center',
  transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
})

const innerCircleRing = style({
  transition: 'fill 300ms cubic-bezier(0.22, 1, 0.36, 1)',
  selectors: {
    [`${active} &`]: {
      fill: theme.colors.primary.backgroundHover,
    },
    [`${radio}:disabled + ${ring} &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
    },
    [`${containerBase}[data-invalid='true'] &`]: {
      fill: theme.colors.danger.background,
    },
    [`${active}[data-invalid='true'] &`]: {
      fill: theme.colors.danger.backgroundHover,
    },
    [`${containerBase}[data-invalid='true'] ${radio}:disabled + ${ring} &`]: {
      fill: theme.colors.danger.backgroundDisabled,
    },
    [`${ring} &`]: {
      fill: theme.colors.neutral.background,
    },
  },
})

export const radioStyle = {
  stack,
  margedText,
  container,
  textLabel,
  label,
  labelStyle,
  iconWrapper,
  radio,
  ring,
  ringSize,
  mark,
  innerCircleRing,
}
