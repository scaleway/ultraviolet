import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const popover = style({
  width: '300px',
})

const button = style({
  background: theme.colors.neutral.background,
  borderColor: theme.colors.neutral.border,
  justifyContent: 'start',
  fontSize: theme.typography.bodySmall.fontSize,
  fontWeight: 'normal',
})

export const filterDatetimeRangeStyles = {
  popover,
  button,
}
