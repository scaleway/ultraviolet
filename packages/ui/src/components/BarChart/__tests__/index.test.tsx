import * as nivo from '@nivo/core'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { beforeAll, describe, test, vi } from 'vitest'
import { BarChart } from '..'
import {
  barChartMultiData,
  barChartPositiveNegativeData,
  barChartSimpleData,
} from '../__stories__/mockData'

describe('BarChart', () => {
  beforeAll(() => {
    vi.spyOn(nivo, 'ResponsiveWrapper').mockImplementation(
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
        axisFormatters={{
          bottom: value => value.toString(),
        }}
        data={barChartSimpleData}
      />,
    ))

  test('renders correctly with multiple series', () =>
    shouldMatchEmotionSnapshot(<BarChart data={barChartMultiData} />))

  test('renders correctly with negative values', () =>
    shouldMatchEmotionSnapshot(
      <BarChart data={barChartPositiveNegativeData} />,
    ))

  test.skip('renders correctly with custom tooltip format', async () => {
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

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const bar = container.querySelector('svg[role="img"] g line')
    if (!bar) {throw new Error('BarChart column not found')}
    await userEvent.unhover(bar)
    await userEvent.hover(bar)
  })
})
