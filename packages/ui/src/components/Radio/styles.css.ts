import { globalStyle, style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const innerCircleRing = style({})
export const radioStack = style({})
export const margedText = style({
  marginLeft: theme.space['4'],
})

export const container = style({
  position: 'relative',
  display: 'flex',
  flex: 1,
  alignItems: 'flex-start',
  gap: theme.space['1'],
  selectors: {
    "&[aria-disabled='false']": {
      cursor: 'pointer',
    },
    "&[aria-disabled='true']": {
      cursor: 'not-allowed',
      color: theme.colors.neutral.textDisabled,
    },
  },
})

export const textLabel = style({
  flex: 1,
  cursor: 'pointer',
  selectors: {
    [`${container}[aria-disabled='true'] > &`]: {
      cursor: 'not-allowed',
      color: theme.colors.neutral.textDisabled,
    },
  },
})

export const labelStyle = style({
  flex: 1,
  cursor: 'pointer',
})

export const radio = style({
  cursor: 'pointer',
  position: 'absolute',
  height: theme.sizing['300'],
  width: theme.sizing['300'],
  opacity: 0,
  whiteSpace: 'nowrap',
  borderWidth: 0,
  selectors: {
    "&[aria-disabled='true']": {
      cursor: 'not-allowed',
    },
  },
})

export const ring = style({
  height: theme.sizing['300'],
  width: theme.sizing['300'],
  minWidth: theme.sizing['300'],
  minHeight: theme.sizing['300'],
  borderRadius: theme.radii.circle,
  fill: theme.colors.neutral.border,
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
      fill: theme.colors.neutral.borderDisabled,
      cursor: 'not-allowed',
    },
    [`${container} ${radio}[aria-invalid='true'] + &`]: {
      fill: theme.colors.danger.border,
    },
  },
})

export const radioMark = style({
  transformOrigin: 'center',
  transition: '200ms transform ease-in-out',
  selectors: {
    [`${container} ${radio} + ${ring} &`]: {
      transform: 'scale(0)',
    },
    [`${container} ${radio}:checked + ${ring} &`]: {
      transform: 'scale(1)',
    },
  },
})

globalStyle(
  `${container}:hover[aria-disabled='false'] ${ring} ${innerCircleRing}`,
  {
    fill: theme.colors.primary.backgroundHover,
  },
)

globalStyle(`${container}[aria-disabled='true'] ${ring} ${innerCircleRing}`, {
  fill: theme.colors.neutral.backgroundDisabled,
})

globalStyle(
  `${container}:hover ${radio}[aria-invalid='true'] + ${ring} ${innerCircleRing}`,
  {
    fill: theme.colors.danger.backgroundHover,
  },
)

globalStyle(`${ring} ${innerCircleRing}`, {
  fill: theme.colors.neutral.background,
})

globalStyle(`${container}[aria-disabled='true'] ${ring} ${innerCircleRing}`, {
  fill: theme.colors.neutral.backgroundDisabled,
})
