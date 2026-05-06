import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { PieChart } from '..'
import {
  data,
  dataWithLegends,
  dataWithLegendsAndDetails,
  dataWithLegendsDetailsAndDiscount,
} from '../__stories__/mockData'

describe('pieChart', () => {
  beforeAll(() => {
    // Have to mock ResizeObserver as Nivo doesn't add automatically ResizeObserver polyfill anymore (v0.79.0)
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    }))
  })

  it('renders correctly with no props', () => {
    const { asFragment } = renderWithTheme(<PieChart />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with data', () => {
    const { asFragment } = renderWithTheme(<PieChart data={data} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with data and content', () => {
    const { asFragment } = renderWithTheme(
      <PieChart content="Test" data={data} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with legend', () => {
    const { asFragment } = renderWithTheme(
      <PieChart data={dataWithLegends} withLegend />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with detailed legend', () => {
    const { asFragment } = renderWithTheme(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with detailed legend and discount', () => {
    const { asFragment } = renderWithTheme(
      <PieChart data={dataWithLegendsDetailsAndDiscount} withLegend />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with empty legend placeholder', () => {
    const { asFragment } = renderWithTheme(
      <PieChart emptyLegend="I am a legend" withLegend />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  // oxlint-disable-next-line vitest/no-disabled-tests
  it.skip('renders correctly when chart is hovered', async () => {
    const { container } = renderWithTheme(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    )
    const slice = container.querySelector('svg g path')
    // oxlint-disable-next-line vitest/no-conditional-in-test
    if (!slice) {
      throw new Error('PieChart slice path not found')
    }
    await userEvent.unhover(slice)
    await userEvent.hover(slice)
  })

  it('renders correctly when legend is hovered', async () => {
    const { asFragment } = renderWithTheme(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    )
    const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
    await userEvent.unhover(screen.getByTestId(id))
    await userEvent.hover(screen.getByTestId(id))
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when legend is focused', () => {
    const { asFragment } = renderWithTheme(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    )

    const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
    fireEvent.blur(screen.getByTestId(id))
    fireEvent.focus(screen.getByTestId(id))
    expect(asFragment()).toMatchSnapshot()
  })
})
