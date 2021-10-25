import { ResponsiveWrapper } from '@nivo/core'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { ComponentProps } from 'react'
import LineChart from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import {
  lineChartData,
  lineChartHoursData,
  lineChartMultipleData,
} from '../__stories__/mockData'

// HACK to allows snapshots rendering of responsive graphs
jest.mock('@nivo/core', () => ({
  ...jest.requireActual('@nivo/core'),
  ResponsiveWrapper: ({
    children,
  }: ComponentProps<typeof ResponsiveWrapper>) => (
    <div>{children({ height: 500, width: 1000 })}</div>
  ),
}))

describe('LineChart', () => {
  test('renders correctly without data', () =>
    shouldMatchEmotionSnapshot(<LineChart xScale={{ type: 'linear' }} />)) // default xScale type (time) triggers test failure !?!

  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(
      <LineChart data={lineChartData} xScale={{ type: 'linear' }} />,
    ))

  test('renders correctly with data transformer', () =>
    shouldMatchEmotionSnapshot(
      <LineChart
        data={lineChartData}
        axisFormatters={{
          bottom: value => value.toString(),
        }}
        xScale={{ type: 'linear' }}
      />,
    ))

  test('renders correctly with point formater', () =>
    shouldMatchEmotionSnapshot(
      <LineChart
        data={lineChartData}
        pointFormatters={{
          x: value => value.toString(),
          y: value => `${value as number} unit`,
        }}
        xScale={{ type: 'linear' }}
      />,
    ))

  test('renders correctly with detailed legend', () =>
    shouldMatchEmotionSnapshot(
      <LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />,
    ))

  test('renders correctly with timeline data', () =>
    shouldMatchEmotionSnapshot(
      <LineChart
        data={lineChartHoursData}
        withLegend
        xScale={{ type: 'linear' }}
      />,
    ))

  test('renders correctly with multiple series', () =>
    shouldMatchEmotionSnapshot(
      <LineChart
        data={lineChartMultipleData}
        withLegend
        xScale={{ type: 'linear' }}
      />,
    ))

  test('renders correctly when chart is hovered', () =>
    shouldMatchEmotionSnapshot(
      <LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />,
      {
        transform: () => {
          const line = document.querySelector('svg[role="img"] g path')
          if (!line) throw new Error('LineChart line path not found')
          userEvent.unhover(line)
          userEvent.hover(line)
        },
      },
    ))

  test('renders correctly when legend is deselected', () =>
    shouldMatchEmotionSnapshot(
      <LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />,
      {
        transform: ({ getByTestId }) => {
          const id = `label-${lineChartData[0].id.toString()}`
          fireEvent.click(getByTestId(id))
        },
      },
    ))
})
