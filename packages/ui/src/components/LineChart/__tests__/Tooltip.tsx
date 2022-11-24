import { Point } from '@nivo/line'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import LineChartTooltip from '../Tooltip'

describe('LineChart Tooltip', () => {
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
