import styled from '@emotion/styled'
import { useMemo } from 'react'

const FOCUS_OVERLAY_SCALE_RATIO = 6
const FOCUS_OVERLAY_PIXEL_RIGHT_OFFSET = 8

const StyledDiv = styled.div`
  position: absolute;
  height: calc(100% - ${({ theme }) => theme.space['1']});
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.primary.backgroundStrong};
  transform-origin: left center;
  transition: all 200ms ease-in-out;

  &[data-focusposition='right'] {
    transform-origin: right center;
  }
`

type FocusOverlayProps = {
  focusPosition: 'left' | 'right'
  rightCardWidth: number
  leftCardWidth: number
  hasMouseDown: boolean
}

export const FocusOverlay = ({
  focusPosition,
  rightCardWidth,
  leftCardWidth,
  hasMouseDown,
}: FocusOverlayProps) => {
  const translateXValue = useMemo(
    () =>
      focusPosition === 'left'
        ? 0
        : leftCardWidth + FOCUS_OVERLAY_PIXEL_RIGHT_OFFSET,
    [focusPosition, leftCardWidth],
  )

  const getScaleXValue = () => {
    if (!hasMouseDown || !leftCardWidth || !rightCardWidth) return 1
    const currentWidth =
      focusPosition === 'left' ? leftCardWidth : rightCardWidth

    return 1 + FOCUS_OVERLAY_SCALE_RATIO / currentWidth
  }

  return (
    <StyledDiv
      data-focusposition={focusPosition}
      style={{
        transform: `translate3d(${translateXValue}px, 0, 0) scale3d(${getScaleXValue()}, 1, 1)`,
        width: `${focusPosition === 'left' ? leftCardWidth : rightCardWidth}px`,
      }}
    />
  )
}
