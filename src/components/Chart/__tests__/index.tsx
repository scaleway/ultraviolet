import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Chart from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

const data = [
  {
    color: '#4F1A81',
    percent: 50,
    product: 'compute',
  },
  {
    color: '#F4306C',
    percent: 50,
    product: 'gpu',
  },
]

const dataWithLegends = [
  {
    color: '#4F1A81',
    name: 'Compute',
    percent: 50,
    product: 'compute',
    value: '20',
  },
  {
    color: '#F4306C',
    name: 'GPU Instances',
    percent: 50,
    product: 'gpu',
    value: '20',
  },
]

const dataWithLegendsAndDetails = [
  {
    color: '#4F1A81',
    details: [
      {
        name: 'Start-1S',
        value: '€10',
      },
      {
        name: 'Start-2L',
        value: '€10',
      },
    ],
    name: 'Compute',
    percent: 50,
    product: 'compute',
    value: '20',
  },
  {
    color: '#F4306C',
    details: [
      {
        name: 'Start-1S',
        value: '€10',
      },
      {
        name: 'Start-2L',
        value: '€10',
      },
    ],
    name: 'GPU Instances',
    percent: 50,
    product: 'gpu',
    value: '20',
  },
]

const dataWithLegendsDetailsAndDiscount = [
  {
    color: '#F4306C',
    details: [
      {
        name: 'Start-1S',
        value: '€10',
      },
      {
        name: 'Start-2L',
        value: '€10',
      },
    ],
    name: 'GPU Instances',
    needPattern: true,
    percent: 100,
    product: 'discount',
    value: '20',
  },
]

describe('Chart', () => {
  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(<Chart data={data} />))

  test('renders correctly with data and content', () =>
    shouldMatchEmotionSnapshot(<Chart data={data} content="Test" />))

  test('renders correctly with legend', () =>
    shouldMatchEmotionSnapshot(<Chart data={dataWithLegends} hasLegend />))

  test('renders correctly with detailed legend', () =>
    shouldMatchEmotionSnapshot(
      <Chart data={dataWithLegendsAndDetails} hasLegend />,
    ))

  test('renders correctly with detailed legend and discount', () =>
    shouldMatchEmotionSnapshot(
      <Chart data={dataWithLegendsDetailsAndDiscount} hasLegend />,
    ))

  test('renders correctly with empty legend placeholder', () =>
    shouldMatchEmotionSnapshot(
      <Chart data={[]} hasLegend emptyLegend="I am a legend" />,
    ))

  test('renders correctly when chart is hovered', () =>
    shouldMatchEmotionSnapshot(
      <Chart chartId="test-chart" data={dataWithLegendsAndDetails} hasLegend />,
      {
        transform: ({ getByTestId }) => {
          const id = `test-chart-donut-${dataWithLegendsAndDetails[0].product}`
          userEvent.unhover(getByTestId(id))
          userEvent.hover(getByTestId(id))
        },
      },
    ))

  test('renders correctly when legend is hovered', () =>
    shouldMatchEmotionSnapshot(
      <Chart chartId="test-chart" data={dataWithLegendsAndDetails} hasLegend />,
      {
        transform: ({ getByTestId }) => {
          const id = `test-chart-chart-tooltip-${dataWithLegendsAndDetails[0].product}`
          userEvent.unhover(getByTestId(id))
          userEvent.hover(getByTestId(id))
        },
      },
    ))

  test('renders correctly when legend is focused', () =>
    shouldMatchEmotionSnapshot(
      <Chart chartId="test-chart" data={dataWithLegendsAndDetails} hasLegend />,
      {
        transform: ({ getByTestId }) => {
          const id = `test-chart-chart-tooltip-${dataWithLegendsAndDetails[0].product}`
          fireEvent.blur(getByTestId(id))
          fireEvent.focus(getByTestId(id))
        },
      },
    ))
})
