import type { Point } from '@nivo/line'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { LineChartTooltip } from '../Tooltip'

describe('lineChart Tooltip', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <LineChartTooltip
        point={
          {
            data: { xFormatted: '05-05-2022', yFormatted: '15 kb' },
            serieColor: '#ff0000',
          } as Point
        }
      />,
    ))
})
