import { ResponsiveWrapper } from '@nivo/core'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'
import BarChart from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import {
  barChartMultiData,
  barChartPositiveNegativeData,
  barChartSimpleData,
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

describe('BarChart', () => {
  test('renders correctly without data', () =>
    shouldMatchEmotionSnapshot(<BarChart />))

  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(<BarChart data={barChartSimpleData} />))

  test('renders correctly with data transformer', () =>
    shouldMatchEmotionSnapshot(
      <BarChart
        data={barChartSimpleData}
        axisFormatters={{
          bottom: value => value.toString(),
        }}
      />,
    ))

  test('renders correctly with multiple series', () =>
    shouldMatchEmotionSnapshot(<BarChart data={barChartMultiData} />))

  test('renders correctly with negative values', () =>
    shouldMatchEmotionSnapshot(
      <BarChart data={barChartPositiveNegativeData} />,
    ))

  test('renders correctly with custom tooltip format', () =>
    shouldMatchEmotionSnapshot(
      <BarChart
        data={barChartPositiveNegativeData}
        tooltipFunction={({ value, indexValue, color }) => ({
          color,
          formattedValue: `${value} kb`,
          indexValue: indexValue.toString(),
        })}
      />,
      {
        transform: () => {
          const bar = document.querySelector('svg[role="img"] g line')
          if (!bar) throw new Error('BarChart column not found')
          userEvent.unhover(bar)
          userEvent.hover(bar)
        },
      },
    ))
})
