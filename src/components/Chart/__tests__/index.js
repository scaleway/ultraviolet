import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Chart from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

const data = [
  {
    product: 'compute',
    color: '#4F1A81',
    percent: 50,
  },
  {
    product: 'gpu',
    color: '#F4306C',
    percent: 50,
  },
]

const dataWithLegends = [
  {
    product: 'compute',
    name: 'Compute',
    color: '#4F1A81',
    percent: 50,
    value: '20',
  },
  {
    product: 'gpu',
    name: 'GPU Instances',
    color: '#F4306C',
    percent: 50,
    value: '20',
  },
]

const dataWithLegendsAndDetails = [
  {
    product: 'compute',
    name: 'Compute',
    color: '#4F1A81',
    percent: 50,
    value: '20',
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
  },
  {
    product: 'gpu',
    name: 'GPU Instances',
    color: '#F4306C',
    percent: 50,
    value: '20',
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
  },
]

const dataWithLegendsDetailsAndDiscount = [
  {
    product: 'discount',
    needPattern: true,
    name: 'GPU Instances',
    color: '#F4306C',
    percent: 100,
    value: '20',
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
  },
]

describe('Chart', () => {
  test('renders correctly with no props', () => {
    shouldMatchEmotionSnapshot(<Chart />)
  })

  test('renders correctly with data', () => {
    shouldMatchEmotionSnapshot(<Chart data={data} />)
  })

  test('renders correctly with data and content', () => {
    shouldMatchEmotionSnapshot(<Chart data={data} content="Test"/>)
  })

  test('renders correctly with legend', () => {
    shouldMatchEmotionSnapshot(<Chart data={dataWithLegends} hasLegend />)
  })

  test('renders correctly with detailed legend', () => {
    shouldMatchEmotionSnapshot(<Chart data={dataWithLegendsAndDetails} hasLegend />)
  })

  test('renders correctly with detailed legend and discount', () => {
    shouldMatchEmotionSnapshot(<Chart data={dataWithLegendsDetailsAndDiscount} hasLegend />)
  })

  test('renders correctly with empty legend placeholder', () => {
    shouldMatchEmotionSnapshot(<Chart hasLegend emptyLegend="I am a legend"/>)
  })

  test('renders correctly when chart is hovered', async () => {
    await shouldMatchEmotionSnapshot(<Chart chartId="test-chart" data={dataWithLegendsAndDetails} hasLegend />, {
      transform: async ({ getByTestId }) => {
        const id = `test-chart-donut-${dataWithLegendsAndDetails[0].product}`
        await userEvent.unhover(getByTestId(id))
        await userEvent.hover(getByTestId(id))
      }
    })
  })

  test('renders correctly when legend is hovered', async () => {
    await shouldMatchEmotionSnapshot(<Chart chartId="test-chart" data={dataWithLegendsAndDetails} hasLegend />, {
      transform: async ({ getByTestId }) => {
        const id = `test-chart-chart-tooltip-${dataWithLegendsAndDetails[0].product}`
        await userEvent.unhover(getByTestId(id))
        await userEvent.hover(getByTestId(id))
      }
    })
  })

  test('renders correctly when legend is focused', async () => {
    await shouldMatchEmotionSnapshot(<Chart chartId="test-chart" data={dataWithLegendsAndDetails} hasLegend />, {
      transform: async ({ getByTestId }) => {
        const id = `test-chart-chart-tooltip-${dataWithLegendsAndDetails[0].product}`
        await fireEvent.blur(getByTestId(id))
        await fireEvent.focus(getByTestId(id))
      }
    })
  })
})
