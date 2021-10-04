import { useTheme } from '@emotion/react'
import { Box, DatumValue, ValueFormat } from '@nivo/core'
import { LineSvgProps, Point, ResponsiveLine, Serie } from '@nivo/line'
import PropTypes from 'prop-types'
import React, { FunctionComponent, Validator, useState } from 'react'
import { getLegendColor } from '../../helpers/legend'
import CustomLegend, { Transformer } from './CustomLegend'
import LineChartTooltip from './Tooltip'
import { getMaxChartValue, getMinChartValue } from './helpers'

type LineChartProps = {
  height?: string | number
  margin?: Box
  xScale: LineSvgProps['xScale']
  yScale: LineSvgProps['yScale']
  data: LineSvgProps['data']
  withLegend?: boolean
  axisFormatters?: Record<'bottom' | 'left' | 'right' | 'top', Transformer>
  pointFormatters?: Record<'x' | 'y', ValueFormat<DatumValue>>
  tickValues?: Box
  chartProps?: Partial<LineSvgProps>
}

const LineChart: FunctionComponent<LineChartProps> = ({
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
}) => {
  const theme = useTheme()
  const hasData = !data.some(d => !d.data.length)
  const dataset = {
    datasets: data.map((d, i) => ({
      data: hasData ? d.data : [],
      id: d.id,
      label: d.label as string,
      serieColor: getLegendColor(i, theme),
    })),
  }

  const chartTheme = {
    axis: {
      ticks: {
        line: {
          stroke: theme.colors.gray300,
          strokeWidth: 1,
        },
      },
    },
    fontFamily: theme.fonts.sansSerif,
    fontSize: 12,
    textColor: theme.colors.gray550,
  }

  const [selected, setState] = useState(
    dataset.datasets.map(({ id }, index) => `${id}${index}`),
  )

  const finalData = dataset.datasets.filter(
    ({ id }, index) => selected.indexOf(`${id}${index}`) > -1,
  )

  return (
    <>
      <div style={{ height }}>
        <ResponsiveLine
          colors={(point: Point) => point.serieColor || theme.colors.gray550}
          data={finalData}
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
          selected={selected}
          setSelected={setState}
          axisTransformer={axisFormatters?.left}
        />
      )}
    </>
  )
}

LineChart.propTypes = {
  axisFormatters: PropTypes.shape({
    bottom: PropTypes.func,
    left: PropTypes.func,
    right: PropTypes.func,
    top: PropTypes.func,
  }) as Validator<LineChartProps['axisFormatters']>,
  chartProps: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired as Validator<Serie[]>,
  height: PropTypes.number,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }) as Validator<LineChartProps['margin']>,
  pointFormatters: PropTypes.shape({
    x: PropTypes.func,
    y: PropTypes.func,
  }) as Validator<LineChartProps['pointFormatters']>,
  tickValues: PropTypes.shape({
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }) as Validator<LineChartProps['tickValues']>,
  withLegend: PropTypes.bool,
  xScale: PropTypes.shape({
    format: PropTypes.string.isRequired,
    precision: PropTypes.string as Validator<
      'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
    >,
    type: PropTypes.string as Validator<'time'>,
    useUTC: PropTypes.bool.isRequired,
  }),
  yScale: PropTypes.shape({
    type: PropTypes.string as Validator<'time'>,
  }),
}

export default LineChart
