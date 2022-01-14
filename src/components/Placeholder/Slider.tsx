import styled from '@emotion/styled'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import React from 'react'
=======
import { VoidFunctionComponent } from 'react'
import Box from '../Box'
>>>>>>> chore(react):react17 new jsx transform

const StyledContainer = styled.div<{ length: number }>`
  height: 277px;
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, 1fr);
  gap: ${({ theme }) => theme.space['2']};
  overflow: auto;
`

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: 4px;
  width: 239px;
  height: 261px;
  overflow: hidden;
`

const StyledBanner = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  width: 100%;
  height: 33%;
`

const Slider = ({ length = 4 }: { length?: number }) => (
  <StyledContainer length={length}>
    {Array.from({ length }, (_, i) => (
      <StyledCard key={`placeholder-slider-card-${i}`}>
        <StyledBanner />
      </StyledCard>
    ))}
  </StyledContainer>
)

Slider.propTypes = {
  length: PropTypes.number,
}

export default Slider
