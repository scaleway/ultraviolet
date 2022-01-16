import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import IconPlaceholder from './IconPlaceholder'
import Line from './Line'

const StyledContainer = styled.div<{ col: number }>`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: ${({ theme }) => theme.space['2']};
`

const Block = styled.div`
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: 4px;
  overflow: hidden;
`

const BoxWithIcon = ({
  col = 4,
  length = 8,
}: {
  col?: number
  length?: number
}) => (
  <StyledContainer col={col}>
    {Array.from({ length }, (_, i) => (
      <Block key={`placeholder-box-${i}`}>
        <IconPlaceholder />
        <Line />
      </Block>
    ))}
  </StyledContainer>
)

BoxWithIcon.propTypes = {
  length: PropTypes.number,
}

export default BoxWithIcon
