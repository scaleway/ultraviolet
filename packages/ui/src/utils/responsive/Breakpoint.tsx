import styled from '@emotion/styled'
import type { ScreenSize } from '../../theme'
import { down, up } from './utilities'

const Breakpoint = styled.div<{ down?: ScreenSize; up?: ScreenSize }>`
  display: none;
  ${props => `
    ${props.up ? up(props.up, 'display: block;') : ''}
    ${props.down ? down(props.down, 'display: block;') : ''}
  `}
`

export default Breakpoint
