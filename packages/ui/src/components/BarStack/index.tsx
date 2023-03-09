import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode } from 'react'
import { useMemo } from 'react'
import { Tooltip } from '../Tooltip'

type BarProps = {
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

type BarStackProps = {
  data: BarProps[]
  total?: number
}

const StyledBarWrapper = styled.div`
  width: 0px;
  transition: width 500ms;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`

const StyledBar = styled.div`
  height: 50px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space[1]};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: -1px 0
      ${({ theme }) => theme.colors.neutral.backgroundStronger}B3,
    0 1px ${({ theme }) => theme.colors.neutral.backgroundStronger}B3,
    1px 0 ${({ theme }) => theme.colors.neutral.backgroundStronger}B3,
    0 -1px ${({ theme }) => theme.colors.neutral.backgroundStronger}B3;
`

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};
  overflow: hidden;

  ${StyledBarWrapper}:nth-child(5n+1) {
    ${({
      theme,
    }) => `background: linear-gradient(-45deg, ${theme.colors.neutral.backgroundWeak}1A 25%,
      ${theme.colors.primary.backgroundStrong} 25%, ${theme.colors.primary.backgroundStrong} 50%,
      ${theme.colors.neutral.backgroundWeak}1A 50%, ${theme.colors.neutral.backgroundWeak}1A 75%, ${theme.colors.primary.backgroundStrong}
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};
  }

  ${StyledBarWrapper}:nth-child(5n+2) {
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong}D9;

    background-image: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.neutral.backgroundStrong}33 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${({ theme }) => theme.colors.neutral.backgroundStrong}33 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${({ theme }) => theme.colors.neutral.backgroundStrong}33 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${({ theme }) => theme.colors.neutral.backgroundStrong}33 25%,
        ${({ theme }) => theme.colors.primary.backgroundStrong}12 25%
      );
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;
  }

  ${StyledBarWrapper}:nth-child(5n+3) {
    ${({
      theme,
    }) => `background: linear-gradient(-45deg, ${theme.colors.neutral.backgroundWeak}1A 25%,
      ${theme.colors.primary.backgroundStrong}4D 25%, ${theme.colors.primary.backgroundStrong}4D 50%,
      ${theme.colors.neutral.backgroundWeak}1A 50%, ${theme.colors.neutral.backgroundWeak}1A 75%, ${theme.colors.primary.backgroundStrong}4D
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) => theme.colors.secondary.backgroundStrong};
  }

  ${StyledBarWrapper}:nth-child(5n+4) {
    background-color: ${({ theme }) => theme.colors.secondary.backgroundStrong};

    background-image: linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.neutral.backgroundWeak}33 25%,
        transparent 25%
      ),
      linear-gradient(
        225deg,
        ${({ theme }) => theme.colors.neutral.backgroundWeak}33 25%,
        transparent 25%
      ),
      linear-gradient(
        45deg,
        ${({ theme }) => theme.colors.neutral.backgroundWeak}33 25%,
        transparent 25%
      ),
      linear-gradient(
        315deg,
        ${({ theme }) => theme.colors.neutral.backgroundWeak}33 25%,
        ${({ theme }) => theme.colors.secondary.backgroundStrong} 25%
      );
    background-position: 10px 0, 10px 0, 0 0, 0 0;
    background-size: 10px 10px;
    background-repeat: repeat;
  }

  ${StyledBarWrapper}:nth-child(5n+5) {
    ${({
      theme,
    }) => `background: linear-gradient(-45deg, ${theme.colors.neutral.backgroundWeak}40 25%,
      ${theme.colors.secondary.backgroundStrong}40 25%, ${theme.colors.secondary.backgroundStrong}40 50%,
      ${theme.colors.neutral.backgroundWeak}40 50%, ${theme.colors.neutral.backgroundWeak}40 75%, ${theme.colors.secondary.backgroundStrong}40
       75%);`}
    background-size: 30px 30px;
    background-color: ${({ theme }) =>
      theme.colors.secondary.backgroundStrong}BF;
  }
`

export const BarStack = ({ data, total }: BarStackProps): JSX.Element => {
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
              <Tooltip id={`tooltip-${id}`} text={tooltip}>
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
