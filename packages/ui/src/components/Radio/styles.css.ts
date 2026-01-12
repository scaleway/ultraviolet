import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

export const innerCircleRing = style({})
export const radioStack = style({})
export const margedText = style({
  marginLeft: theme.space['4'],
})

export const container = style({
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

export const textLabel = style({
  cursor: 'pointer',
  flex: 1,
  selectors: {
    [`${container}[aria-disabled='true'] > &`]: {
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
  },
})

export const labelStyle = style({
  cursor: 'pointer',
  flex: 1,
})

export const radio = style({
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

export const ring = style({
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

export const radioMark = style({
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
