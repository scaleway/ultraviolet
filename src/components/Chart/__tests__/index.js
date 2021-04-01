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

  test('renders correctly with empty legend placeholder', () => {
    shouldMatchEmotionSnapshot(<Chart hasLegend emptyLegend="I am a legend"/>)
  })
})
