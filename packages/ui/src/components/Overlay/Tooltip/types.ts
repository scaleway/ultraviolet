/**
 * @deprecated "auto" is not required since the Tooltip placement is always flipped if needed to remain visible.
 */
type LegacyTooltipPlacement = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | LegacyTooltipPlacement
