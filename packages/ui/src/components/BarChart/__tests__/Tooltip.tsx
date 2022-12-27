import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import BarChartTooltip from '../Tooltip'

describe('BarChartTooltip', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <BarChartTooltip
        color="#ff0000"
        formattedValue="10 kb"
        indexValue="2020-02-20"
      />,
    ))
})
