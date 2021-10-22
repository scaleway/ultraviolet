import styled from '@emotion/styled'
import { darken, lighten, transparentize } from 'polished'
import React, { MouseEventHandler, useMemo } from 'react'

export interface BarProps {
  id: string
  value: number
  text?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  onDoubleClick?: MouseEventHandler<HTMLDivElement>
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onMouseLeave?: MouseEventHandler<HTMLDivElement>
}

export interface BarStackProps {
  data: BarProps[]
  total?: number
}

const StyledBar = styled('div', {
  shouldForwardProp: prop => prop.toString() !== 'value',
})`
  height: 50px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space[1]};
  transition: width 500ms;
  width: 0px;
  text-shadow: -1px 0 ${({ theme }) => transparentize(0.7, theme.colors.black)},
    0 1px ${({ theme }) => transparentize(0.7, theme.colors.black)},
    1px 0 ${({ theme }) => transparentize(0.7, theme.colors.black)},
    0 -1px ${({ theme }) => transparentize(0.7, theme.colors.black)};
`

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.gray300};
  overflow: hidden;

  ${StyledBar}:nth-child(5n+1) {
    ${({ theme }) => `background: linear-gradient(-45deg, ${transparentize(
      0.9,
      theme.colors.white,
    )} 25%,
      ${theme.colors.primary} 25%, ${theme.colors.primary} 50%,
      ${transparentize(0.9, theme.colors.white)} 50%, ${transparentize(
      0.9,
      theme.colors.white,
    )} 75%, ${theme.colors.primary}
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${StyledBar}:nth-child(5n+2) {
    background-color: ${({ theme }) => theme.colors.primary};

    background-image: linear-gradient(
        135deg,
        ${({ theme }) => transparentize(0.75, theme.colors.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${({ theme }) => transparentize(0.75, theme.colors.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${({ theme }) => transparentize(0.75, theme.colors.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${({ theme }) => transparentize(0.75, theme.colors.white)} 25%,
        ${({ theme }) => theme.colors.primary} 25%
      );
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;
  }

  ${StyledBar}:nth-child(5n+3) {
    ${({ theme }) => `background: linear-gradient(-45deg, ${transparentize(
      0.9,
      theme.colors.white,
    )} 25%,
      ${theme.colors.lightViolet} 25%, ${theme.colors.lightViolet} 50%,
      ${transparentize(0.9, theme.colors.white)} 50%, ${transparentize(
      0.9,
      theme.colors.white,
    )} 75%, ${theme.colors.lightViolet}
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) => darken(0.2, theme.colors.lightViolet)};
  }

  ${StyledBar}:nth-child(5n+4) {
    background-color: ${({ theme }) => theme.colors.lightViolet};

    background-image: linear-gradient(
        135deg,
        ${({ theme }) => transparentize(0.8, theme.colors.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${({ theme }) => transparentize(0.8, theme.colors.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${({ theme }) => transparentize(0.8, theme.colors.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${({ theme }) => transparentize(0.8, theme.colors.white)} 25%,
        ${({ theme }) => theme.colors.lightViolet} 25%
      );
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;
  }

  ${StyledBar}:nth-child(5n+5) {
    ${({ theme }) => `background: linear-gradient(-45deg, ${transparentize(
      0.8,
      theme.colors.white,
    )} 25%,
      ${lighten(0.1, theme.colors.lightViolet)} 25%, ${lighten(
      0.1,
      theme.colors.lightViolet,
    )} 50%,
      ${transparentize(0.8, theme.colors.white)} 50%, ${transparentize(
      0.8,
      theme.colors.white,
    )} 75%, ${lighten(0.1, theme.colors.lightViolet)}
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) => lighten(0.1, theme.colors.lightViolet)};
  }
`

const BarStack = ({ data, total }: BarStackProps): JSX.Element => {
  const computedTotal = useMemo(
    () => total ?? data.reduce((acc, { value }) => acc + value, 0),
    [total, data],
  )

  return (
    <StyledContainer>
      {data.map(
        ({
          id,
          value,
          text,
          onClick,
          onDoubleClick,
          onMouseEnter,
          onMouseLeave,
          onMouseDown,
          onMouseUp,
        }) => (
          <StyledBar
            key={id}
            style={{ width: `${(value / computedTotal) * 100}%` }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {text}
          </StyledBar>
        ),
      )}
    </StyledContainer>
  )
}

export default BarStack
