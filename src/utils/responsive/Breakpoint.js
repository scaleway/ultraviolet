import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { screens } from '../../theme'
import { down, up } from './utilities'

const Breakpoint = styled.div`
  display: none;
  ${props => `
    ${props.up ? up(props.up, 'display: block;') : ''}
    ${props.down ? down(props.down, 'display: block;') : ''}
  `}
`

Breakpoint.propTypes = {
  down: PropTypes.oneOf(Object.keys(screens)),
  up: PropTypes.oneOf(Object.keys(screens)),
}

Breakpoint.defaultProps = {
  down: null,
  up: null,
}

export default Breakpoint
