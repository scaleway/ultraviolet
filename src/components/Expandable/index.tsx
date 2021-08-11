import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import Box from '../Box'

type ExpandableProps = {
  children: ReactNode
  opened?: boolean
  height?: number
} & XStyledProps

const StyledExpandable = styled(Box, {
  shouldForwardProp: prop => !['opened', 'height'].includes(prop.toString()),
})<ExpandableProps>`
  transition: max-height 300ms ease-out, opacity 300ms ease-out;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  height: auto;
  margin-top: 0;

  ${({ opened = false, height = 5000 }) =>
    opened &&
    `
    transition: max-height 300ms ease-in, opacity 300ms ease-in;
    max-height: ${height}px;
    opacity: 1;
    overflow: visible;
  `}
`

const Expandable: FunctionComponent<ExpandableProps> = props => (
  <StyledExpandable {...props} />
)

Expandable.propTypes = {
  /**
   * The content to display
   */
  children: PropTypes.node.isRequired,
  /**
   * The maxHeight of the content to make the opening and closing animation
   */
  height: PropTypes.number,
  /**
   * To display or not the content
   */
  opened: PropTypes.bool,
}

export default Expandable
