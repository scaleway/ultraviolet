import * as nivo from '@nivo/core'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'
import BarChart from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'
import {
  barChartMultiData,
  barChartPositiveNegativeData,
  barChartSimpleData,
} from '../__stories__/mockData'

describe('BarChart', () => {
  beforeAll(() => {
    jest
      .spyOn(nivo, 'ResponsiveWrapper')
      .mockImplementation(
        ({ children }: ComponentProps<typeof nivo.ResponsiveWrapper>) => (
          <div>{children({ height: 500, width: 1000 })}</div>
        ),
      )
  })

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

  test('renders correctly with custom tooltip format', async () => {
    const { container } = renderWithTheme(
      <BarChart
        data={barChartPositiveNegativeData}
        tooltipFunction={({ value, indexValue, color }) => ({
          color,
          formattedValue: `${value} kb`,
          indexValue: indexValue.toString(),
        })}
      />,
    )

    const bar = container.querySelector('svg[role="img"] g line')
    if (!bar) throw new Error('BarChart column not found')
    await userEvent.unhover(bar)
    await userEvent.hover(bar)
  })
})
