/**
 * @deprecated "auto" is not required since the popup placement is always flipped if needed to remain visible.
 */
type LegacyPopupPlacement = 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right'

export type NewPopupPlacement = 'top' | 'right' | 'bottom' | 'left'
export type PopupPlacement = NewPopupPlacement | LegacyPopupPlacement
