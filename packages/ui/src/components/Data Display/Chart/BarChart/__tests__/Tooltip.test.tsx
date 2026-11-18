import { describe, it } from 'vitest'
import { shouldMatchSnapshot } from '../../../../../__tests__/helpers'
import { BarChartTooltip } from '../Tooltip'

describe('barChartTooltip', () => {
  it('renders correctly', () =>
    shouldMatchSnapshot(<BarChartTooltip color="#ff0000" formattedValue="10 kb" indexValue="2020-02-20" />))
})
