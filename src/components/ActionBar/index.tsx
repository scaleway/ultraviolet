import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

const HEIGHT = 56
const SPACING = 20

const StyledDiv = styled.div<{ rank: number }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeakElevated};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: 4px;
  bottom: ${({ rank }) => SPACING + rank * (HEIGHT + SPACING)}px;
  box-shadow: ${({ theme }) => theme.shadows.bulk};
  display: flex;
  height: ${HEIGHT}px;
  left: 50%;
  padding: 16px;
  position: fixed;
  transform: translate(-50%, 0);
  width: 600px;
  z-index: 2;
`

type ActionBarProps = {
  children: ReactNode
  /**
   * The position of the bar (start at 0)
   */
  rank?: number
  role?: string
  'aria-modal'?: 'true' | 'false'
}

const ActionBar = ({
  children,
  role,
  rank = 0,
  'aria-modal': ariaModal,
}: ActionBarProps): JSX.Element => (
  <StyledDiv rank={rank} role={role} aria-modal={ariaModal}>
    {children}
  </StyledDiv>
)

ActionBar.propTypes = {
  'aria-modal': PropTypes.oneOf(['true', 'false']),
  children: PropTypes.node.isRequired,
  rank: PropTypes.number,
  role: PropTypes.string,
}

export default ActionBar
