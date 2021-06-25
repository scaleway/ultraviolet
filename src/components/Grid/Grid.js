import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { screens, space } from '../../theme'
import { up } from '../../utils'
import Box from '../Box'

const gridMaxWidths = {
  large: '960px',
  medium: '720px',
  small: '540px',
  xlarge: '1140px',
}

const query = (brk, style) => (screens[brk] === 0 ? style : up(brk, style))

const StyledGrid = styled(Box, {
  shouldForwardProp: prop => !['gutter', 'fluid'].includes(prop),
})`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ gutter }) => space[gutter]};
  padding-right: ${({ gutter }) => space[gutter]};
  ${({ fluid }) =>
    fluid
      ? ''
      : Object.keys(screens).reduce(
          (style, brk) =>
            `${style} ${query(brk, `max-width: ${gridMaxWidths[brk]};`)}`,
          '',
        )}
`

const Grid = props => <StyledGrid {...props} />

Grid.defaultProps = {
  fluid: false,
  gutter: 1,
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * If true, take all the parent width
   */
  fluid: PropTypes.bool,
  /**
   * padding left and right space
   */
  gutter: PropTypes.oneOf(Object.keys(space).map(Number)),
}

export default Grid
