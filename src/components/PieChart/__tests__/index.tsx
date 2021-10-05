import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import PieChart from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import {
  data,
  dataWithLegends,
  dataWithLegendsAndDetails,
  dataWithLegendsDetailsAndDiscount,
} from '../__stories__/mockData'

describe('Chart', () => {
  test('renders correctly with no props', () =>
    shouldMatchEmotionSnapshot(<PieChart />))

  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(<PieChart data={data} />))

  test('renders correctly with data and content', () =>
    shouldMatchEmotionSnapshot(<PieChart data={data} content="Test" />))

  test('renders correctly with legend', () =>
    shouldMatchEmotionSnapshot(<PieChart data={dataWithLegends} hasLegend />))

  test('renders correctly with detailed legend', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} hasLegend />,
    ))

  test('renders correctly with detailed legend and discount', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsDetailsAndDiscount} hasLegend />,
    ))

  test('renders correctly with empty legend placeholder', () =>
    shouldMatchEmotionSnapshot(
      <PieChart hasLegend emptyLegend="I am a legend" />,
    ))

  test('renders correctly when chart is hovered', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} hasLegend />,
      {
        transform: () => {
          const slice = document.querySelector('svg g path')!
          userEvent.unhover(slice)
          userEvent.hover(slice)
        },
      },
    ))

  test('renders correctly when legend is hovered', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} hasLegend />,
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
      <PieChart data={dataWithLegendsAndDetails} hasLegend />,
      {
        transform: ({ getByTestId }) => {
          const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
          fireEvent.blur(getByTestId(id))
          fireEvent.focus(getByTestId(id))
        },
      },
    ))
})
