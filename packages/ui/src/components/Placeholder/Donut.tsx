import styled from '@emotion/styled'
import { Line } from './Line'

const CIRCLE_SIZE = 206

const StyledContainer = styled.div`
  display: flex;
`

const StyledSVG = styled.svg`
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;
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
  gap: 16px;
`

export const Donut = () => (
  <StyledContainer>
    <StyledSVG>
      <StyledCircle cx={CIRCLE_SIZE / 2} cy={CIRCLE_SIZE / 2} r="90" />
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
