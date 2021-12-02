import styled from '@emotion/styled'
import { darken, lighten, transparentize } from 'polished'
import React, { MouseEventHandler, ReactNode, useMemo } from 'react'
import Tooltip from '../Tooltip'

export type BarProps = {
  /**
   * Unique id of the bar
   */
  id: string
  /**
   * The value of the bar
   */
  value: number
  /**
   * Text to display inside the bar
   */
  text?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  onDoubleClick?: MouseEventHandler<HTMLDivElement>
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onMouseLeave?: MouseEventHandler<HTMLDivElement>
  /**
   * A tooltip to display when hovering the bar
   */
  tooltip?: ReactNode
}

export interface BarStackProps {
  data: Array<BarProps>
  total?: number
}

const StyledBarWrapper = styled.div`
  width: 0px;
  transition: width 500ms;
  background-color: ${({ theme }) => theme.colorsDeprecated.white};
`

const StyledBar = styled.div`
  height: 50px;
  font-weight: 600;
  color: ${({ theme }) => theme.colorsDeprecated.white};
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space[1]};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: -1px 0
      ${({ theme }) => transparentize(0.7, theme.colorsDeprecated.black)},
    0 1px ${({ theme }) => transparentize(0.7, theme.colorsDeprecated.black)},
    1px 0 ${({ theme }) => transparentize(0.7, theme.colorsDeprecated.black)},
    0 -1px ${({ theme }) => transparentize(0.7, theme.colorsDeprecated.black)};
`

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colorsDeprecated.gray100};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: inset 0px 0px 0px 1px
    ${({ theme }) => theme.colorsDeprecated.gray300};
  overflow: hidden;

  ${StyledBarWrapper}:nth-child(5n+1) {
    ${({ theme }) => `background: linear-gradient(-45deg, ${transparentize(
      0.9,
      theme.colorsDeprecated.white,
    )} 25%,
      ${theme.colorsDeprecated.primary} 25%, ${
      theme.colorsDeprecated.primary
    } 50%,
      ${transparentize(
        0.9,
        theme.colorsDeprecated.white,
      )} 50%, ${transparentize(0.9, theme.colorsDeprecated.white)} 75%, ${
      theme.colorsDeprecated.primary
    }
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) => theme.colorsDeprecated.primary};
  }

  ${StyledBarWrapper}:nth-child(5n+2) {
    background-color: ${({ theme }) =>
      lighten(0.1, theme.colorsDeprecated.primary)};

    background-image: linear-gradient(
        135deg,
        ${({ theme }) => transparentize(0.75, theme.colorsDeprecated.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${({ theme }) => transparentize(0.75, theme.colorsDeprecated.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${({ theme }) => transparentize(0.75, theme.colorsDeprecated.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${({ theme }) => transparentize(0.75, theme.colorsDeprecated.white)} 25%,
        ${({ theme }) => lighten(0.1, theme.colorsDeprecated.primary)} 25%
      );
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;
  }

  ${StyledBarWrapper}:nth-child(5n+3) {
    ${({ theme }) => `background: linear-gradient(-45deg, ${transparentize(
      0.9,
      theme.colorsDeprecated.white,
    )} 25%,
      ${theme.colorsDeprecated.lightViolet} 25%, ${
      theme.colorsDeprecated.lightViolet
    } 50%,
      ${transparentize(
        0.9,
        theme.colorsDeprecated.white,
      )} 50%, ${transparentize(0.9, theme.colorsDeprecated.white)} 75%, ${
      theme.colorsDeprecated.lightViolet
    }
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) =>
      darken(0.2, theme.colorsDeprecated.lightViolet)};
  }

  ${StyledBarWrapper}:nth-child(5n+4) {
    background-color: ${({ theme }) => theme.colorsDeprecated.lightViolet};

    background-image: linear-gradient(
        135deg,
        ${({ theme }) => transparentize(0.8, theme.colorsDeprecated.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${({ theme }) => transparentize(0.8, theme.colorsDeprecated.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${({ theme }) => transparentize(0.8, theme.colorsDeprecated.white)} 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${({ theme }) => transparentize(0.8, theme.colorsDeprecated.white)} 25%,
        ${({ theme }) => theme.colorsDeprecated.lightViolet} 25%
      );
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;
  }

  ${StyledBarWrapper}:nth-child(5n+5) {
    ${({ theme }) => `background: linear-gradient(-45deg, ${transparentize(
      0.8,
      theme.colorsDeprecated.white,
    )} 25%,
      ${lighten(0.1, theme.colorsDeprecated.lightViolet)} 25%, ${lighten(
      0.1,
      theme.colorsDeprecated.lightViolet,
    )} 50%,
      ${transparentize(
        0.8,
        theme.colorsDeprecated.white,
      )} 50%, ${transparentize(
      0.8,
      theme.colorsDeprecated.white,
    )} 75%, ${lighten(0.1, theme.colorsDeprecated.lightViolet)}
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) =>
      lighten(0.1, theme.colorsDeprecated.lightViolet)};
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
          tooltip,
        }) => (
          <StyledBarWrapper
            style={{ width: `${(value / computedTotal) * 100}%` }}
            key={id}
          >
            {tooltip ? (
              <Tooltip baseId={`tooltip-${id}`} text={tooltip}>
                <StyledBar
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onClick={onClick}
                  onDoubleClick={onDoubleClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  {text}
                </StyledBar>
              </Tooltip>
            ) : (
              <StyledBar
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                {text}
              </StyledBar>
            )}
          </StyledBarWrapper>
        ),
      )}
    </StyledContainer>
  )
}

export default BarStack
