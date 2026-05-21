import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { selectableCardStyle } from '../SelectableCard/styles.css'
import { widthSelectable } from '../SelectableCard/variables.css'
import { selectableCardOptionGroupStyle } from '../SelectableCardOptionGroup/styles.css'
import { switchButtonStyle } from '../SwitchButton/styles.css'

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
    [`${selectableCardStyle.selectableElement} > &`]: {
      width: widthSelectable,
    },
  },
})

const margedText = style({
  marginLeft: theme.space['4'],
})

const container = style({
  alignItems: 'flex-start',
  display: 'flex',
  flex: 1,
  gap: theme.space['1'],
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

const textLabel = style({
  cursor: 'pointer',
  flex: 1,
  selectors: {
    [`${container}[aria-disabled='true'] > &`]: {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
  },
})

const label = style({
  selectors: {
    [`${switchButtonStyle.optionBase}[data-checked='true'] &`]: {
      color: theme.colors.neutral.textStrong,
      transition: 'color 300ms ease-in-out',
    },
    [`${switchButtonStyle.optionBase} &`]: {
      transition: 'color 300ms ease-in-out',
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
  flex: 1,
})

const radio = style({
  borderWidth: 0,
  cursor: 'pointer',
  height: theme.sizing['300'],
  opacity: 0,
  position: 'absolute',
  selectors: {
    "&[aria-disabled='true']": {
      cursor: 'not-allowed',
    },
  },
  whiteSpace: 'nowrap',
  width: theme.sizing['300'],
})

const ring = style({
  borderRadius: theme.radii.circle,
  fill: theme.colors.neutral.border,
  height: theme.sizing['300'],
  minHeight: theme.sizing['300'],
  minWidth: theme.sizing['300'],
  transition: 'fill 100ms',
  selectors: {
    [`${container}[data-invalid='false'] ${radio}:checked + &`]: {
      fill: theme.colors.primary.backgroundStrong,
    },
    [`${container} ${radio}:checked:disabled + &`]: {
      fill: theme.colors.primary.borderDisabled,
    },
    [`${container}[data-invalid='true'] &`]: {
      fill: theme.colors.danger.borderStrong,
    },
    [`${container}[data-invalid='true'] ${radio}:disabled + &`]: {
      fill: theme.colors.danger.backgroundStrongDisabled,
    },
    [`${container}[data-invalid='false'] ${radio}:not(:disabled):active + &`]: {
      backgroundColor: theme.colors.primary.backgroundHover,
      fill: theme.colors.primary.backgroundStrong,
    },
    [`${container} ${radio}:not(:disabled):focus-visible + &`]: {
      outline: '-webkit-focus-ring-color auto 1px',
    },
    [`${container}[data-invalid='true'] ${radio}:not(:disabled):active + &`]: {
      backgroundColor: theme.colors.danger.backgroundHover,
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${container}[data-invalid='false']:hover ${radio}:not(:disabled) + &`]: {
      fill: theme.colors.primary.border,
    },
    [`${container}:disabled &`]: {
      cursor: 'not-allowed',
      fill: theme.colors.neutral.borderDisabled,
    },
  },
  width: theme.sizing['300'],
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
  transition: '200ms transform ease-in-out',
})

const innerCircleRing = style({
  transition: 'fill 100ms',
  selectors: {
    [`${container}:hover &`]: {
      fill: theme.colors.primary.backgroundHover,
    },
    [`${radio}:disabled + ${ring} &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
    },
    [`${container}[data-invalid='true'] &`]: {
      fill: theme.colors.danger.background,
    },
    [`${container}[data-invalid='true']:hover &`]: {
      fill: theme.colors.danger.backgroundHover,
    },
    [`${container}[data-invalid='true'] ${radio}:disabled + ${ring} &`]: {
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
  radio,
  ring,
  mark,
  innerCircleRing,
}
