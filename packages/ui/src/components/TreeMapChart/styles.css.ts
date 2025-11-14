import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const treeMapTooltipContainer = style({
  display: 'flex',
  flexDirection: 'column',
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  padding: `${theme.space[1]} ${theme.space[2]}`,
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
  borderRadius: theme.space[1],
  position: 'absolute',
})
