'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react'
import { useMemo } from 'react'
import { Tooltip } from '../Tooltip'
import {
  barStack,
  containerBarStack,
  wrapperBarStack,
  wrapperWidth,
} from './styles.css'

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
