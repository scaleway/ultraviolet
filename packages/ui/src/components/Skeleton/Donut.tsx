import styled from '@emotion/styled'
import { Line } from './Line'

const CIRCLE_SIZE = 12.875 // in rem

const StyledContainer = styled.div`
  display: flex;
`

const StyledSVG = styled.svg`
  height: ${CIRCLE_SIZE}rem;
  width: ${CIRCLE_SIZE}rem;
  transform: rotate(-90deg);
`

const StyledCircle = styled.circle`
  transform-origin: 50% 50%;
  stroke: ${({ theme }) => theme.colors.neutral.borderWeak};
  stroke-width: 18;
  stroke-linecap: butt;
  fill: none;
`

const LineList = styled.ul`
  display: grid;
  list-style: none;
  gap: ${({ theme }) => theme.space['2']};
`

export const Donut = () => (
  <StyledContainer>
    <StyledSVG>
      <StyledCircle
        cx={`${CIRCLE_SIZE / 2}rem`}
        cy={`${CIRCLE_SIZE / 2}rem`}
        r="90"
      />
    </StyledSVG>
    <LineList>
      <li>
        <Line />
      </li>
      <li>
        <Line />
      </li>
      <li>
        <Line />
      </li>
      <li>
        <Line />
      </li>
    </LineList>
  </StyledContainer>
)
