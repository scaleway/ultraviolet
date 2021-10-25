import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import Box from '../Box'

const HEIGHT = 56
const SPACING = 20

const StyledBox = styled(Box)<{ rank: number }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  bottom: ${({ rank }) => SPACING + rank * (HEIGHT + SPACING)}px;
  box-shadow: 0 2px 14px 8px
    ${({ theme }) => transparentize(0.5, theme.colors.gray200)};
  display: flex;
  height: ${HEIGHT}px;
  left: 50%;
  padding: 16px;
  position: fixed;
  transform: translate(-50%, 0);
  width: 600px;
  z-index: 2;
`

export type ActionBarProps = {
  children: ReactNode
  /**
   * The position of the bar (start at 0)
   */
  rank?: number
  role?: string
}

const ActionBar: FunctionComponent<ActionBarProps> = ({
  children,
  rank = 0,
  ...props
}) => (
  <StyledBox rank={rank} {...props}>
    {children}
  </StyledBox>
)

ActionBar.propTypes = {
  children: PropTypes.node.isRequired,
  rank: PropTypes.number,
}

export default ActionBar
