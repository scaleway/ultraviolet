import { useTheme } from '@emotion/react'
import {
  BarDatum,
  BarSvgProps,
  BarTooltipProps,
  ResponsiveBar,
} from '@nivo/bar'
import { Box, DatumValue, ValueFormat } from '@nivo/core'
import PropTypes from 'prop-types'
import React, {
  ComponentProps,
  FunctionComponent,
  Validator,
  useCallback,
} from 'react'
import { getLegendColor } from '../../helpers/legend'
import BarChartTooltip from './Tooltip'

type Formater = ValueFormat<DatumValue>

type BarChartProps = {
  height?: string | number
  margin?: Box
  data?: BarDatum[]
  axisFormatters?: Partial<
    Record<'bottom' | 'left' | 'right' | 'top', Formater>
  >
  pointFormatters?: Partial<Record<'x' | 'y', Formater>>
  tickValues?: Box
  keys?: string[]
  tooltipFunction?: (
    props: BarTooltipProps<BarDatum>,
  ) => ComponentProps<typeof BarChartTooltip>
  chartProps?: Partial<BarSvgProps<BarDatum>>
}

const BarChart: FunctionComponent<BarChartProps> = ({
  height = '537px', // to maintain aspect ratio based on our standard 1074px width,
  margin = { bottom: 50, left: 60, right: 25, top: 50 },
  data = [],
  axisFormatters = {},
  tickValues,
  keys = ['value'],
  tooltipFunction,
  chartProps,
}) => {
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
          stroke: theme.colorsDeprecated.gray300,
          strokeWidth: 1,
        },
      },
    },
    fontFamily: theme.fonts.sansSerif,
    fontSize: 12,
    textColor: theme.colorsDeprecated.gray550,
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

BarChart.propTypes = {
  axisFormatters: PropTypes.shape({
    bottom: PropTypes.func,
    left: PropTypes.func,
    right: PropTypes.func,
    top: PropTypes.func,
  }) as Validator<BarChartProps['axisFormatters']>,
  chartProps: PropTypes.shape({}) as Validator<Partial<BarSvgProps<BarDatum>>>,
  data: PropTypes.arrayOf(PropTypes.shape({}) as Validator<BarDatum>),
  height: PropTypes.number,
  keys: PropTypes.arrayOf(PropTypes.string.isRequired),
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }) as Validator<BarChartProps['margin']>,
  tickValues: PropTypes.shape({
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }) as Validator<BarChartProps['tickValues']>,
  tooltipFunction: PropTypes.func,
}

export default BarChart
