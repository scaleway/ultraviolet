import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ScreenSize, screens } from '../../theme'
import { down, up } from './utilities'

const Breakpoint = styled.div<{ down?: ScreenSize; up?: ScreenSize }>`
  display: none;
  ${props => `
    ${props.up ? up(props.up, 'display: block;') : ''}
    ${props.down ? down(props.down, 'display: block;') : ''}
  `}
`

Breakpoint.propTypes = {
  down: PropTypes.oneOf<ScreenSize>(Object.keys(screens) as ScreenSize[]),
  up: PropTypes.oneOf<ScreenSize>(Object.keys(screens) as ScreenSize[]),
}

export default Breakpoint
