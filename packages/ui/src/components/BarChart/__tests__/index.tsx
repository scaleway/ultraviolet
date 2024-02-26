import { beforeAll, describe, jest, test } from '@jest/globals'
import * as nivo from '@nivo/core'
import type { ComponentProps } from 'react'
import { BarChart } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import {
  barChartMultiData,
  barChartPositiveNegativeData,
  barChartSimpleData,
} from '../__stories__/mockData'

describe('BarChart', () => {
  beforeAll(() => {
    jest
      .spyOn(nivo, 'ResponsiveWrapper')
      .mockImplementation(
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
        data={barChartSimpleData}
        axisFormatters={{
          bottom: value => value.toString(),
        }}
      />,
    ))

  test('renders correctly with multiple series', () =>
    shouldMatchEmotionSnapshot(<BarChart data={barChartMultiData} />))

  test('renders correctly with negative values', () =>
    shouldMatchEmotionSnapshot(
      <BarChart data={barChartPositiveNegativeData} />,
    ))
})
