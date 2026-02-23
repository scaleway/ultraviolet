'use client'

import { FOCUS_OVERLAY_SCALE_RATIO } from './constant'
import { switchButtonStyle } from './styles.css'

type FocusOverlayProps = {
  cardWidth: number
  position: number
  mouseDownSide: 'left' | 'right' | null
  sentiment: 'neutral' | 'primary'
}

export const FocusOverlay = ({
  cardWidth,
  position,
  mouseDownSide,
  sentiment,
}: FocusOverlayProps) => (
  <div
    className={switchButtonStyle.focusOverlay[sentiment]}
    style={{
      left: `${
        position - (mouseDownSide === 'left' ? FOCUS_OVERLAY_SCALE_RATIO : 0)
      }px`,
      width: `${cardWidth}px`,
    }}
  />
)
