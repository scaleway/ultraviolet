import styled from '@emotion/styled'

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
  background-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  width: 100%;
  height: 33%;
`

export const Slider = ({ length = 4 }: { length?: number }) => (
  <StyledContainer length={length}>
    {Array.from({ length }, (_, i) => (
      <StyledCard key={`placeholder-slider-card-${i}`}>
        <StyledBanner />
      </StyledCard>
    ))}
  </StyledContainer>
)
