import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'

import { LineChartTooltip } from '../Tooltip'

import type { LineSeries, Point } from '@nivo/line'

describe('lineChart Tooltip', () => {
  test('renders correctly ', () =>
    shouldMatchSnapshot(
      <LineChartTooltip
        point={
          {
            data: { xFormatted: '05-05-2022', yFormatted: '15 kb' },
            serieColor: '#ff0000',
          } as unknown as Point<LineSeries>
        }
      />,
    ))
})
