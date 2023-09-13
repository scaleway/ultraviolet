import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { fadeIn } from '../../utils'

const HEIGHT = 56
const SPACING = 20

const StyledDiv = styled.div<{ rank: number }>`
  background: ${({ theme }) => theme.colors.neutral.backgroundWeakElevated};
  border-radius: ${({ theme }) => theme.radii.default};
  bottom: ${({ rank }) => SPACING + rank * (HEIGHT + SPACING)}px;
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};
  height: ${HEIGHT}px;
  left: 50%;
  position: fixed;
  transform: translate(-50%, 0);
  width: 600px;
  animation: ${fadeIn} 0.2s ease-in-out;
`

type ActionBarProps = {
  children: ReactNode
  /**
   * The position of the bar (start at 0)
   */
  rank?: number
  role?: string
  className?: string
  'data-testid'?: string
}

/**
 * The ActionBar is a floating bar that appears at the bottom of a page.
 * It can be used to display important actions or information to the user, and can be configured to display a variety of different content types.
 *
 * **Note:** ActionBar is added into a portal at the end of the body element. This means that it will always be on top of other elements without `z-index`,
 * and will not be affected by the layout of the page it is on.
 */
export const ActionBar = ({
  children,
  role = 'dialog',
  rank = 0,
  className,
  'data-testid': dataTestId,
}: ActionBarProps) =>
  createPortal(
    <StyledDiv
      rank={rank}
      role={role}
      className={className}
      data-testid={dataTestId}
    >
      {children}
    </StyledDiv>,
    document.body,
  )
