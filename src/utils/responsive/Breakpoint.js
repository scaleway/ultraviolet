import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { breakpoints, down, up } from './utilities'

const Breakpoint = styled.div`
  display: none;
  ${props => `
    ${props.up ? up(props.up, 'display: block;') : ''}
    ${props.down ? down(props.down, 'display: block;') : ''}
  `}
`

Breakpoint.propTypes = {
  up: PropTypes.oneOf(Object.keys(breakpoints)),
  down: PropTypes.oneOf(Object.keys(breakpoints)),
}

Breakpoint.defaultProps = {
  up: null,
  down: null,
}

export default Breakpoint
