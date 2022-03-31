import { ResponsiveWrapper } from '@nivo/core'
import { ComponentProps } from 'react'
import Barchart from '..'
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
    shouldMatchEmotionSnapshot(<Barchart />))

  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(<Barchart data={barChartSimpleData} />))

  test('renders correctly with data transformer', () =>
    shouldMatchEmotionSnapshot(
      <Barchart
        data={barChartSimpleData}
        axisFormatters={{
          bottom: value => value.toString(),
        }}
      />,
    ))

  test('renders correctly with multiple series', () =>
    shouldMatchEmotionSnapshot(<Barchart data={barChartMultiData} />))

  test('renders correctly with negative values', () =>
    shouldMatchEmotionSnapshot(
      <Barchart data={barChartPositiveNegativeData} />,
    ))

  test('renders correctly with custom tooltip format', () =>
    shouldMatchEmotionSnapshot(
      <Barchart
        data={barChartPositiveNegativeData}
        tooltipFunction={({ value, indexValue, ...props }) => ({
          ...props,
          formattedValue: `${value} kb`,
          indexValue: indexValue.toString(),
        })}
      />,
    ))
})
