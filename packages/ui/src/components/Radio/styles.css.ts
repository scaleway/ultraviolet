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
    [`${switchButtonStyle.optionBase}[data-checked='false'][data-disabled="true"] &:hover`]:
      {
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
  selectors: {
    [`${container} ${radio}:checked[aria-disabled='false'][aria-invalid='false'] + &`]:
      {
        fill: theme.colors.primary.backgroundStrong,
      },
    [`${container} ${radio}:checked[aria-disabled='true'][aria-invalid='false'] + &`]:
      {
        fill: theme.colors.primary.borderDisabled,
      },
    [`${container} ${radio}[aria-invalid='true']:not([aria-disabled='true']) + &`]:
      {
        fill: theme.colors.danger.backgroundStrong,
      },
    [`${container} ${radio}[aria-disabled='false']:active + &`]: {
      backgroundColor: '#5e127e40',
      fill: theme.colors.primary.backgroundStrong,
    },
    [`${container} ${radio}[aria-disabled='false']:focus-visible + &`]: {
      outline: '-webkit-focus-ring-color auto 1px',
    },
    [`${container} ${radio}[aria-invalid='true']:focus + &`]: {
      backgroundColor: '#f91b6c40',
      fill: theme.colors.danger.backgroundStrong,
    },
    [`${container}:hover[aria-disabled='false'] &`]: {
      fill: theme.colors.primary.border,
    },
    [`${container}[aria-disabled='true'] &`]: {
      cursor: 'not-allowed',
      fill: theme.colors.neutral.borderDisabled,
    },
    [`${container} ${radio}[aria-invalid='true'] + &`]: {
      fill: theme.colors.danger.border,
    },
  },
  width: theme.sizing['300'],
})

const mark = style({
  selectors: {
    [`${container} ${radio} + ${ring} &`]: {
      transform: 'scale(0)',
    },
    [`${container} ${radio}:checked + ${ring} &`]: {
      transform: 'scale(1)',
    },
  },
  transformOrigin: 'center',
  transition: '200ms transform ease-in-out',
})

const innerCircleRing = style({
  selectors: {
    [`${container}:hover[aria-disabled='false'] ${ring} &`]: {
      fill: theme.colors.primary.backgroundHover,
    },
    [`${container}[aria-disabled='true'] ${ring} &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
    },
    [`${container}:hover ${radio}[aria-invalid='true'] + ${ring} &`]: {
      fill: theme.colors.danger.backgroundHover,
    },
    [`${ring} &`]: {
      fill: theme.colors.neutral.background,
    },
    [`${container}[aria-disabled='true'] ${ring} &`]: {
      fill: theme.colors.neutral.backgroundDisabled,
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
