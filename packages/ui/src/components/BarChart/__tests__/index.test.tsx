import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, it, vi } from 'vitest'

import { BarChart } from '..'
import { barChartMultiData, barChartPositiveNegativeData, barChartSimpleData } from '../__stories__/mockData'

import type * as Nivo from '@nivo/core'
import type { ComponentProps } from 'react'

// Mock the ResponsiveWrapper component
vi.mock('@nivo/core', async importOriginal => {
  const actual = await importOriginal<typeof Nivo>()
  return {
    ...actual,
    ResponsiveWrapper: ({ children }: ComponentProps<typeof actual.ResponsiveWrapper>) => (
      <div>{children({ height: 500, width: 1000 })}</div>
    ),
  }
})

describe('barChart', () => {
  it('renders correctly without data', () => shouldMatchSnapshot(<BarChart />))

  it('renders correctly with data', () => shouldMatchSnapshot(<BarChart data={barChartSimpleData} />))

  it('renders correctly with data transformer', () =>
    shouldMatchSnapshot(
      <BarChart
        axisFormatters={{
          bottom: value => value.toString(),
        }}
        data={barChartSimpleData}
      />,
    ))

  it('renders correctly with multiple series', () => shouldMatchSnapshot(<BarChart data={barChartMultiData} />))

  it('renders correctly with negative values', () =>
    shouldMatchSnapshot(<BarChart data={barChartPositiveNegativeData} />))

  // oxlint-disable-next-line vitest/no-disabled-tests
  it.skip('renders correctly with custom tooltip format', async () => {
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
    // oxlint-disable-next-line vitest/no-conditional-in-test
    if (!bar) {
      throw new Error('BarChart column not found')
    }
    await userEvent.unhover(bar)
    await userEvent.hover(bar)
  })
})
