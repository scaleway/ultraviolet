import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const treeMapTooltipContainer = style({
  display: 'flex',
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  padding: `${theme.space[1]} ${theme.space[2]}`,
  alignItems: 'center',
})

export const treeMapContentWrapper = style({
  color: theme.colors.neutral.background,
  fontFamily: theme.typography.captionStronger.fontFamily,
  fontSize: theme.typography.captionStronger.fontSize,
  fontWeight: theme.typography.captionStronger.fontWeight,
  letterSpacing: theme.typography.captionStronger.letterSpacing,
  lineHeight: theme.typography.captionStronger.lineHeight,
  overflow: 'hidden',
  padding: theme.space[1],
  textDecoration: theme.typography.captionStronger.textDecoration,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const treeMapRect = style({
  stroke: theme.colors.neutral.background,
  strokeWidth: 3,
})

export const treeMapForeignObject = style({
  pointerEvents: 'none', // prevents blocking mouse events on the rect
})
