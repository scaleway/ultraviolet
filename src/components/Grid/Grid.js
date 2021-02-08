import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { screens, space } from '../../theme'
import { up } from '../../utils'
import { Box } from '../Box'

const gridMaxWidths = {
  small: '540px',
  medium: '720px',
  large: '960px',
  xlarge: '1140px',
}

const query = (brk, style) => (screens[brk] === 0 ? style : up(brk, style))

const Grid = styled(Box, {
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

Grid.defaultProps = {
  gutter: 1,
  fluid: false,
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  gutter: PropTypes.oneOf(Object.keys(space).map(Number)),
  fluid: PropTypes.bool,
}

export default Grid
