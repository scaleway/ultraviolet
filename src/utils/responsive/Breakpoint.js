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
  up: PropTypes.oneOf(Object.keys(screens)),
  down: PropTypes.oneOf(Object.keys(screens)),
}

Breakpoint.defaultProps = {
  up: null,
  down: null,
}

export default Breakpoint
