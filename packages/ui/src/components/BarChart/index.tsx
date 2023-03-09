import { useTheme } from '@emotion/react'
import type { BarDatum, BarSvgProps, BarTooltipProps } from '@nivo/bar'
import { ResponsiveBar } from '@nivo/bar'
import type { Box, DatumValue, ValueFormat } from '@nivo/core'
import type { ComponentProps } from 'react'
import { useCallback } from 'react'
import { getLegendColor } from '../../helpers/legend'
import BarChartTooltip from './Tooltip'

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
  tooltipFunction?: (
    props: BarTooltipProps<BarDatum>,
  ) => ComponentProps<typeof BarChartTooltip>
  chartProps?: Partial<BarSvgProps<BarDatum>>
}

const DEFAULT_MARGIN = { bottom: 50, left: 60, right: 25, top: 50 }
const DEFAULT_DATA: BarChartProps['data'] = []
const DEFAULT_AXISFORMATTER = {}
const DEFAULT_KEYS = ['value']

/**
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
}: BarChartProps) => {
  const theme = useTheme()
  const dataset = data?.map(d => {
    const colors = keys?.reduce<Record<string, string>>((acc, key, index) => {
      const colorKeyName = `${key}Color`
      acc[colorKeyName] = getLegendColor(index, theme)

      return acc
    }, {})

    return {
      ...d,
      ...colors,
    }
  })

  const chartTheme = {
    axis: {
      ticks: {
        line: {
          stroke: theme.colors.neutral.backgroundStrong,
          strokeWidth: 1,
        },
      },
    },
    fontFamily: theme.typography.body.fontFamily,
    fontSize: 12,
    textColor: theme.colors.neutral.textWeak,
  }

  const tooltip = useCallback(
    (props: BarTooltipProps<BarDatum>) => {
      const { indexValue, formattedValue, color } = tooltipFunction
        ? tooltipFunction(props)
        : props

      return (
        <BarChartTooltip
          formattedValue={formattedValue}
          indexValue={indexValue.toString()}
          color={color}
        />
      )
    },
    [tooltipFunction],
  )

  return (
    <div style={{ height }}>
      <ResponsiveBar
        colors={({ id, data: localData }) => String(localData[`${id}Color`])}
        data={dataset}
        margin={margin}
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
        theme={chartTheme}
        tooltip={tooltip}
        keys={keys}
        enableLabel={false}
        {...chartProps}
      />
    </div>
  )
}
