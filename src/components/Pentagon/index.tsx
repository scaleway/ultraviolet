import styled from '@emotion/styled'
import { HTMLAttributes } from 'react'
import { Color } from '../../theme'

interface PentagonProps {
  size?: string
  color?: string
}

const StyledPentagon = styled('div', {
  shouldForwardProp: prop => !['color', 'size'].includes(prop),
})<PentagonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);

  ${({ size = '48px', color = 'danger', theme }) => `
    width: ${size};
    height: ${size};
    background-color: ${theme.colors[color as Color]?.background ?? color};
  `}
`

const Pentagon = (props: PentagonProps & HTMLAttributes<HTMLDivElement>) => (
  <StyledPentagon {...props} />
)

export default Pentagon
