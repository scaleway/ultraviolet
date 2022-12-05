import { useTheme } from '@emotion/react'
import { DatumValue, Box as NivoBox, ValueFormat } from '@nivo/core'
import { LineSvgProps, Point, ResponsiveLine, Serie } from '@nivo/line'
import type { ScaleSpec } from '@nivo/scales'
import { ComponentProps, useEffect, useState } from 'react'
import { getLegendColor } from '../../helpers/legend'
import CustomLegend from './CustomLegend'
import LineChartTooltip from './Tooltip'
import { getMaxChartValue, getMinChartValue } from './helpers'

type LineChartProps = {
  height?: string | number
  margin?: NivoBox
  xScale?: ScaleSpec
  yScale?: ScaleSpec
  data?: Serie[]
  withLegend?: boolean
  axisFormatters?: Partial<
    Record<
      'bottom' | 'left' | 'right' | 'top',
      ComponentProps<typeof CustomLegend>['axisTransformer']
    >
  >
  pointFormatters?: Partial<Record<'x' | 'y', ValueFormat<DatumValue>>>
  tickValues?: Partial<
    Record<'bottom' | 'left' | 'right' | 'top', number | string>
  >
  chartProps?: Partial<LineSvgProps>
}

const LineChart = ({
  height = '537px', // to maintain aspect ratio based on our standard 1074px width
  margin = { bottom: 50, left: 60, right: 25, top: 50 },
  xScale = {
    format: '%Y-%m-%dT%H:%M:%S%Z', // 2021-08-30T02:56:07Z
    precision: 'minute',
    type: 'time',
    useUTC: false,
  },
  yScale = { type: 'linear' },
  data,
  withLegend = false,
  axisFormatters,
  pointFormatters,
  tickValues,
  chartProps = {},
}: LineChartProps) => {
  const theme = useTheme()
  const dataset = {
    datasets: data?.map((d, i) => ({
      data: d.data,
      id: d.id,
      label: d?.['label'] as string,
      serieColor: getLegendColor(i, theme),
    })),
  }

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

  const [selected, setSelected] = useState(
    dataset.datasets?.map(({ id }, index) => `${id}${index}`),
  )

  const finalData = dataset.datasets?.filter(({ id }, index) =>
    selected ? selected.indexOf(`${id}${index}`) > -1 : false,
  )

  useEffect(() => {
    if (selected !== undefined) {
      return
    }
    setSelected(dataset.datasets?.map(({ id }, index) => `${id}${index}`))
  }, [dataset.datasets, selected])

  return (
    <>
      <div style={{ height }}>
        <ResponsiveLine
          colors={(point: Point) => point.serieColor}
          data={finalData ?? []}
          margin={margin}
          xScale={xScale}
          yScale={
            {
              max: getMaxChartValue(finalData),
              min: getMinChartValue(finalData),
              ...yScale,
            } as LineSvgProps['yScale']
          }
          xFormat={pointFormatters?.x}
          yFormat={pointFormatters?.y}
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
          pointSize={10}
          useMesh
          theme={chartTheme}
          curve="monotoneX"
          tooltip={LineChartTooltip}
          {...chartProps}
        />
      </div>
      {withLegend && (
        <CustomLegend
          data={dataset.datasets}
          selected={selected ?? []}
          setSelected={setSelected}
          axisTransformer={axisFormatters?.left}
        />
      )}
    </>
  )
}

export default LineChart
