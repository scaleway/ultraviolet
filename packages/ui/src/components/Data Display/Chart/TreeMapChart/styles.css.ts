import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'

const tooltipContainer = style({
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.space[1]} ${theme.space[2]}`,
})

const container = style({
  position: 'relative',
})

// Add style with the !important rule to override the TreeMapChart default Style
globalStyle(`${container} span`, {
  width: 'auto !important',
  height: 'auto !important',
  top: '8px !important',
  left: '8px !important',
  transform: 'none !important',
  maxWidth: 'calc(100% - 10px)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'block !important',
})

globalStyle(`${container} div[data-testid*="node."]`, {
  borderRadius: '8px',
  overflow: 'hidden',
})

export const treeMapChartStyle = {
  container,
  tooltipContainer,
}
