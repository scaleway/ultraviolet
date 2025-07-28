'use client'

import styled from '@emotion/styled'
import { FOCUS_OVERLAY_SCALE_RATIO } from './constant'

const StyledDiv = styled.div`
  position: absolute;
  height: calc(100% - ${({ theme }) => theme.space['1']});
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.primary.backgroundStrong};
  transform-origin: left center;
  transition: all 200ms ease-in-out;

  &[data-sentiment='neutral'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  }
`

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
  <StyledDiv
    data-sentiment={sentiment}
    style={{
      left: `${
        position - (mouseDownSide === 'left' ? FOCUS_OVERLAY_SCALE_RATIO : 0)
      }px`,
      width: `${cardWidth}px`,
    }}
  />
)
