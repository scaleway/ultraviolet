// @vitest-environment jsdom
import type * as Nivo from '@nivo/core'
import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { useEffect, useState } from 'react'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { LineChart } from '..'
import { lineChartData, lineChartHoursData, lineChartMultipleData } from '../__stories__/mockData'

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

describe('lineChart', () => {
  it('renders correctly without data', () => shouldMatchSnapshot(<LineChart xScale={{ type: 'linear' }} />)) // default xScale type (time) triggers test failure !?!

  it('renders correctly with data', () =>
    shouldMatchSnapshot(<LineChart data={lineChartData} xScale={{ type: 'linear' }} />))

  it('renders correctly with data transformer', () =>
    shouldMatchSnapshot(
      <LineChart
        axisFormatters={{
          bottom: value => value.toString(),
        }}
        data={lineChartData}
        xScale={{ type: 'linear' }}
      />,
    ))

  it('renders correctly with point formatter', () =>
    shouldMatchSnapshot(
      <LineChart
        data={lineChartData}
        pointFormatters={{
          // oxlint-disable-next-line vitest/no-conditional-in-test
          x: value => value?.toString() ?? '',
          y: value => `${value as number} unit`,
        }}
        xScale={{ type: 'linear' }}
      />,
    ))

  it('renders correctly with detailed legend', () =>
    shouldMatchSnapshot(<LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />))

  it('renders correctly with timeline data', () =>
    shouldMatchSnapshot(<LineChart data={lineChartHoursData} withLegend xScale={{ type: 'linear' }} />))

  it('renders correctly with multiple series', () =>
    shouldMatchSnapshot(<LineChart data={lineChartMultipleData} withLegend xScale={{ type: 'linear' }} />))

  // oxlint-disable-next-line vitest/no-disabled-tests
  it.skip('renders correctly when chart is hovered', async () => {
    const { asFragment } = renderWithTheme(<LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />)
    const line = document.querySelector('svg[role="img"] g path')
    // oxlint-disable-next-line vitest/no-conditional-in-test
    if (!line) {
      throw new Error('LineChart line path not found')
    }
    await userEvent.unhover(line)
    await userEvent.hover(line)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when legend is deselected', () => {
    const { asFragment } = renderWithTheme(<LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />)
    const id = `label-${lineChartData[0].id.toString()}`
    fireEvent.click(screen.getByTestId(id))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when data is async', () => {
    const AsyncLineChart = () => {
      const [data, setData] = useState<typeof lineChartMultipleData | undefined>()

      useEffect(() => {
        setData(lineChartMultipleData)
      }, [])

      return <LineChart data={data} withLegend xScale={{ type: 'linear' }} />
    }

    const { asFragment } = renderWithTheme(<AsyncLineChart />)
    expect(asFragment()).toMatchSnapshot()
  })
})
