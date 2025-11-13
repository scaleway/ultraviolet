'use client'

import type { BarDatum, BarSvgProps, BarTooltipProps } from '@nivo/bar'
import { ResponsiveBar } from '@nivo/bar'
import type { Box, DatumValue, ValueFormat } from '@nivo/core'
import { useTheme } from '@ultraviolet/themes'
import type { ComponentProps, CSSProperties } from 'react'
import { useCallback } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { getNivoTheme } from '../../helpers/nivoTheme'
import { BarChartTooltip } from './Tooltip'

type Formatter = ValueFormat<DatumValue>

type TickSpec = NonNullable<
  ComponentProps<typeof ResponsiveBar>['axisBottom']
>['tickValues']

type BarChartProps = {
  height?: string | number
  margin?: Box
  data?: BarDatum[]
  axisFormatters?: Partial<
    Record<'bottom' | 'left' | 'right' | 'top', Formatter>
  >
  pointFormatters?: Partial<Record<'x' | 'y', Formatter>>
  tickValues?: Partial<Record<'bottom' | 'left' | 'right' | 'top', TickSpec>>
  keys?: string[]
  className?: string
  tooltipFunction?: (
    props: BarTooltipProps<BarDatum>,
  ) => ComponentProps<typeof BarChartTooltip>
  chartProps?: Partial<BarSvgProps<BarDatum>>
  'data-testid'?: string
  style?: CSSProperties
}

const DEFAULT_MARGIN = { bottom: 50, left: 60, right: 25, top: 50 }
const DEFAULT_DATA: BarChartProps['data'] = []
const DEFAULT_AXISFORMATTER = {}
const DEFAULT_KEYS = ['value']

/**
 * BarChart component is used to display data in a bar chart format. It uses the Nivo library under the hood.
 * See https://nivo.rocks/bar/ for more information.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const BarChart = ({
  height = '537px', // to maintain aspect ratio based on our standard 1074px width,
  margin = DEFAULT_MARGIN,
  data = DEFAULT_DATA,
  axisFormatters = DEFAULT_AXISFORMATTER,
  tickValues,
  keys = DEFAULT_KEYS,
  tooltipFunction,
  chartProps,
  className,
  'data-testid': dataTestId,
  style,
}: BarChartProps) => {
  const theme = useTheme()

  const tooltip = useCallback(
    (props: BarTooltipProps<BarDatum>) => {
      const { indexValue, formattedValue, color } = tooltipFunction
        ? tooltipFunction(props)
        : props

      return (
        <BarChartTooltip
          color={color}
          formattedValue={formattedValue}
          indexValue={indexValue.toString()}
        />
      )
    },
    [tooltipFunction],
  )

  return (
    <div
      className={className}
      data-testid={dataTestId}
      style={{ height, ...style }}
    >
      <ResponsiveBar
        axisBottom={{
          format: axisFormatters?.bottom,
          tickPadding: 5,
          tickRotation: 0,
          tickSize: 5,
          tickValues: tickValues?.bottom,
        }}
        axisLeft={{
          format: axisFormatters?.left,
          tickPadding: 5,
          tickRotation: 0,
          tickSize: 5,
          tickValues: tickValues?.left,
        }}
        colors={getLegendColor(theme)}
        data={data}
        enableLabel={false}
        keys={keys}
        margin={margin}
        theme={getNivoTheme(theme)}
        tooltip={tooltip}
        {...chartProps}
      />
    </div>
  )
}
