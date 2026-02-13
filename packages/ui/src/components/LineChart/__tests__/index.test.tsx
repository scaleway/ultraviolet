// @vitest-environment jsdom
import type * as Nivo from '@nivo/core'
import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { LineChart } from '..'
import {
  lineChartData,
  lineChartHoursData,
  lineChartMultipleData,
} from '../__stories__/mockData'

// Mock the ResponsiveWrapper component
vi.mock('@nivo/core', async importOriginal => {
  const actual = await importOriginal<typeof Nivo>()
  return {
    ...actual,
    ResponsiveWrapper: ({
      children,
    }: ComponentProps<typeof actual.ResponsiveWrapper>) => (
      <div>{children({ height: 500, width: 1000 })}</div>
    ),
  }
})

describe('lineChart', () => {
  test('renders correctly without data', () =>
    shouldMatchSnapshot(<LineChart xScale={{ type: 'linear' }} />)) // default xScale type (time) triggers test failure !?!

  test('renders correctly with data', () =>
    shouldMatchSnapshot(
      <LineChart data={lineChartData} xScale={{ type: 'linear' }} />,
    ))

  test('renders correctly with data transformer', () =>
    shouldMatchSnapshot(
      <LineChart
        axisFormatters={{
          bottom: value => value.toString(),
        }}
        data={lineChartData}
        xScale={{ type: 'linear' }}
      />,
    ))

  test('renders correctly with point formatter', () =>
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
      <LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />,
    ))

  test('renders correctly with timeline data', () =>
    shouldMatchSnapshot(
      <LineChart
        data={lineChartHoursData}
        withLegend
        xScale={{ type: 'linear' }}
      />,
    ))

  test('renders correctly with multiple series', () =>
    shouldMatchSnapshot(
      <LineChart
        data={lineChartMultipleData}
        withLegend
        xScale={{ type: 'linear' }}
      />,
    ))

  // biome-ignore lint/suspicious/noSkippedTests: to fix
  test.skip('renders correctly when chart is hovered', async () => {
    const { asFragment } = renderWithTheme(
      <LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />,
    )
    // eslint-disable-next-line testing-library/no-node-access
    const line = document.querySelector('svg[role="img"] g path')
    if (!line) {
      throw new Error('LineChart line path not found')
    }
    await userEvent.unhover(line)
    await userEvent.hover(line)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly when legend is deselected', () => {
    const { asFragment } = renderWithTheme(
      <LineChart data={lineChartData} withLegend xScale={{ type: 'linear' }} />,
    )
    const id = `label-${lineChartData[0].id.toString()}`
    fireEvent.click(screen.getByTestId(id))
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly when data is async', () => {
    const AsyncLineChart = () => {
      const [data, setData] = useState<
        typeof lineChartMultipleData | undefined
      >()

      useEffect(() => {
        setData(lineChartMultipleData)
      }, [])

      return <LineChart data={data} withLegend xScale={{ type: 'linear' }} />
    }

    const { asFragment } = renderWithTheme(<AsyncLineChart />)
    expect(asFragment()).toMatchSnapshot()
  })
})
