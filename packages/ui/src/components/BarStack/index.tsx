'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'
import { useMemo } from 'react'
import { useTheme } from '../../theme'
import { Tooltip } from '../Tooltip'
import { barStack, containerBarStack, wrapperBarStack } from './styles.css'
import {
  neutralStrong33,
  neutralStrongerB3,
  neutralWeak1A,
  neutralWeak33,
  neutralWeak40,
  primaryStrong4D,
  primaryStrong12,
  primaryStrongD9,
  secondaryStrong40,
  secondaryStrongBF,
  wrapperWidth,
} from './variables.css'

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
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>
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
  className?: string
  'data-testid'?: string
}

/**
 * BarStack is a graphic component that is used to show data in one dimension.
 */
export const BarStack = ({
  data,
  total,
  className,
  'data-testid': dataTestId,
}: BarStackProps) => {
  const computedTotal = useMemo(
    () => total ?? data.reduce((acc, { value }) => acc + value, 0),
    [total, data],
  )
  const theme = useTheme()

  return (
    <div
      className={`${className ? `${className} ` : ''}${containerBarStack}`}
      data-testid={dataTestId}
    >
      {data.map(
        ({
          id,
          value,
          text,
          onClick,
          onDoubleClick,
          onKeyDown,
          onMouseEnter,
          onMouseLeave,
          onMouseDown,
          onMouseUp,
          tooltip,
        }) => (
          <div
            className={wrapperBarStack}
            key={id}
            style={assignInlineVars({
              [wrapperWidth]: `${(value / computedTotal) * 100}%`,
              [neutralWeak1A]: `${theme.colors.neutral.backgroundWeak}1A`,
              [neutralStrong33]: `${theme.colors.neutral.backgroundStrong}33`,
              [primaryStrongD9]: `${theme.colors.primary.backgroundStrong}D9`,
              [primaryStrong4D]: `${theme.colors.primary.backgroundStrong}4D`,
              [neutralWeak33]: `${theme.colors.neutral.backgroundWeak}33`,
              [neutralWeak40]: `${theme.colors.neutral.backgroundWeak}40`,
              [secondaryStrong40]: `${theme.colors.secondary.borderStrong}40`,
              [secondaryStrongBF]: `${theme.colors.secondary.borderStrong}BF`,
              [primaryStrong12]: `${theme.colors.primary.backgroundStrong}12`,
            })}
          >
            {tooltip ? (
              <Tooltip id={`tooltip-${id}`} text={tooltip}>
                <div
                  className={barStack}
                  onClick={onClick}
                  onDoubleClick={onDoubleClick}
                  onKeyDown={onKeyDown}
                  onMouseDown={onMouseDown}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onMouseUp={onMouseUp}
                  style={assignInlineVars({
                    [neutralStrongerB3]: `${theme.colors.neutral.backgroundStronger}B3`,
                  })}
                >
                  {text}
                </div>
              </Tooltip>
            ) : (
              <div
                className={barStack}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
              >
                {text}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}
