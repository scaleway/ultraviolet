import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PieChart from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import {
  data,
  dataWithLegends,
  dataWithLegendsAndDetails,
  dataWithLegendsDetailsAndDiscount,
} from '../__stories__/mockData'

// Have to mock ResizeObserver as Nivo doesn't add automatically ResizeObserver polyfill anymore (v0.79.0)
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}))

describe('PieChart', () => {
  test('renders correctly with no props', () =>
    shouldMatchEmotionSnapshot(<PieChart />))

  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(<PieChart data={data} />))

  test('renders correctly with data and content', () =>
    shouldMatchEmotionSnapshot(<PieChart data={data} content="Test" />))

  test('renders correctly with legend', () =>
    shouldMatchEmotionSnapshot(<PieChart data={dataWithLegends} withLegend />))

  test('renders correctly with detailed legend', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    ))

  test('renders correctly with detailed legend and discount', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsDetailsAndDiscount} withLegend />,
    ))

  test('renders correctly with empty legend placeholder', () =>
    shouldMatchEmotionSnapshot(
      <PieChart withLegend emptyLegend="I am a legend" />,
    ))

  test('renders correctly when chart is hovered', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
      {
        transform: () => {
          const slice = document.querySelector('svg g path')
          if (!slice) throw new Error('PieChart slice path not found')
          userEvent.unhover(slice)
          userEvent.hover(slice)
        },
      },
    ))

  test('renders correctly when legend is hovered', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
      {
        transform: ({ getByTestId }) => {
          const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
          userEvent.unhover(getByTestId(id))
          userEvent.hover(getByTestId(id))
        },
      },
    ))

  test('renders correctly when legend is focused', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
      {
        transform: ({ getByTestId }) => {
          const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
          fireEvent.blur(getByTestId(id))
          fireEvent.focus(getByTestId(id))
        },
      },
    ))
})
