import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'

const StyledPentagon = styled('div', {
  shouldForwardProp: prop => !['color', 'size'].includes(prop),
})`
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);

  ${({ size, color, theme }) => `
    width: ${size};
    height: ${size};
    background-color: ${theme.colors[color] ?? color};
  `}
`

const Pentagon = props => <StyledPentagon {...props} />

Pentagon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

Pentagon.defaultProps = {
  color: 'pippin',
  size: '48px',
}

export default Pentagon
