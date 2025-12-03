'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  CSSProperties,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { useMemo, useState } from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import {
  barStack,
  barStackLegendCircle,
  barStackText,
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
  label?: string
  labelInformation?: ReactNode
  style?: CSSProperties
  /**
   * Whether to add a legend inside or outside the chart
   */
  legend?: 'inside' | 'outside'
  size?: 'large' | 'medium' | 'small' | 'xsmall'
}

/**
 * BarStack is a graphic component that is used to show data in one dimension.
 */
export const BarStack = ({
  data,
  total,
  className,
  'data-testid': dataTestId,
  style,
  label,
  labelInformation,
  legend = 'inside',
  size,
}: BarStackProps) => {
  const computedTotal = useMemo(
    () => total ?? data.reduce((acc, { value }) => acc + value, 0),
    [total, data],
  )

  const [hoveredBarId, setHoveredBarId] = useState<string | null>(null)

  return (
    <Stack gap={1}>
      <Stack direction="column" gap={0.25}>
        {labelInformation ? (
          <Stack direction="row" justifyContent="space-between">
            <Label>{label}</Label>
            <Text as="span" sentiment="neutral" variant="body">
              {labelInformation}
            </Text>
          </Stack>
        ) : (
          <Label>{label}</Label>
        )}
        <div
          className={`${className ? `${className} ` : ''}${containerBarStack}`}
          data-testid={dataTestId}
          style={style}
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
                <Tooltip
                  text={legend === 'outside' ? text : undefined}
                  visible={hoveredBarId === id}
                >
                  {tooltip ? (
                    <Tooltip id={`tooltip-${id}`} text={tooltip ?? text}>
                      <div
                        className={barStack({ size })}
                        data-testid={`content-${id}`}
                        onClick={onClick}
                        onDoubleClick={onDoubleClick}
                        onKeyDown={onKeyDown}
                        onMouseDown={onMouseDown}
                        onMouseEnter={event => {
                          onMouseEnter?.(event)
                        }}
                        onMouseLeave={event => {
                          onMouseLeave?.(event)
                        }}
                        onMouseUp={onMouseUp}
                      >
                        <Text
                          as="span"
                          className={barStackText}
                          prominence="stronger"
                          sentiment="neutral"
                          variant={
                            size === 'small' || size === 'xsmall'
                              ? 'captionSmallStrong'
                              : 'captionStrong'
                          }
                          whiteSpace="nowrap"
                        >
                          {legend === 'outside' ? '' : text}
                        </Text>
                      </div>
                    </Tooltip>
                  ) : (
                    <div
                      className={barStack({ size })}
                      data-testid={`content-${id}`}
                      onClick={onClick}
                      onDoubleClick={onDoubleClick}
                      onKeyDown={onKeyDown}
                      onMouseDown={onMouseDown}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onMouseUp={onMouseUp}
                    >
                      <Text
                        as="span"
                        className={barStackText}
                        prominence="stronger"
                        sentiment="neutral"
                        variant={
                          size === 'small' || size === 'xsmall'
                            ? 'captionSmallStrong'
                            : 'captionStrong'
                        }
                        whiteSpace="nowrap"
                      >
                        {legend === 'outside' ? '' : text}
                      </Text>
                    </div>
                  )}
                </Tooltip>
              </div>
            ),
          )}
        </div>
      </Stack>
      {legend === 'outside' ? (
        <Stack direction="row" gap={2}>
          {data.map(({ text, id }, index) => (
            <Stack
              alignItems="center"
              data-testid={`legend-${id}`}
              direction="row"
              gap="0.5"
              key={id}
              onMouseEnter={() => {
                setHoveredBarId(id)
              }}
              onMouseLeave={() => setHoveredBarId(null)}
            >
              <span
                className={barStackLegendCircle({
                  child: (index % 6) as 1 | 2 | 3 | 4 | 5 | 0,
                })}
              />
              <Text as="span" sentiment="neutral" variant="caption">
                {text}
              </Text>
            </Stack>
          ))}
        </Stack>
      ) : null}
    </Stack>
  )
}
