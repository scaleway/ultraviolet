import { CalculatorIcon } from '@ultraviolet/icons/CalculatorIcon'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { estimateCostCompact, estimateCostCompactText } from './styles.css'
import type { Iteration } from './types'

type TotalPrice = {
  hourly: number
  maxHourly: number
  maxOverlayHourly: number
  maxTotal: number
  overlayHourly: number
  total: number
}

export const CompactEstimateCost = ({
  label,
  totalPrice,
  iteration,
}: {
  label: string
  totalPrice: TotalPrice
  iteration: Iteration
}) => (
  <Stack
    alignItems="center"
    className={estimateCostCompact}
    direction="row"
    justifyContent="space-between"
  >
    <Text as="p" className={estimateCostCompactText} variant="bodyStrong">
      <CalculatorIcon sentiment="primary" size="medium" />
      {label}
    </Text>
    <Stack alignItems="center" direction="row">
      <Text as="span" variant="headingSmallStrong">
        €{totalPrice.total}
      </Text>
      <Text as="span" variant="bodyStrong">
        /
        {iteration.unit.length > 1 && iteration.unit.endsWith('s')
          ? iteration.unit.slice(0, -1)
          : iteration.unit}
      </Text>
    </Stack>
  </Stack>
)
