import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import { Color } from '../../theme/colors'

interface PentagonProps {
  size?: string
  color?: string
}

const StyledPentagon = styled('div', {
  shouldForwardProp: prop => !['color', 'size'].includes(prop.toString()),
})<PentagonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);

  ${({ size = '48px', color = 'pippin', theme }) => `
    width: ${size};
    height: ${size};
    background-color: ${theme.colorsDeprecated[color as Color] ?? color};
  `}
`

const Pentagon: FunctionComponent<
  PentagonProps & HTMLAttributes<HTMLDivElement>
> = props => <StyledPentagon {...props} />

Pentagon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Pentagon
