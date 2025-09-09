import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import BarChartTooltip from '../Tooltip'

describe('barChartTooltip', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <BarChartTooltip
        color="#ff0000"
        formattedValue="10 kb"
        indexValue="2020-02-20"
      />,
    ))
})
