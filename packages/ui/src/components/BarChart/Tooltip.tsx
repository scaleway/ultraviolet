'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Text } from '../Text'
import { barColorSquare, barTooltipContainer, colorBar } from './styles.css'

type BarChartToolTipProps = {
  color: string
  indexValue: string
  formattedValue: string
  className?: string
  'data-testid'?: string
}

const BarChartToolTip = ({
  formattedValue,
  indexValue,
  color,
  className,
  'data-testid': dataTestId,
}: BarChartToolTipProps) => (
  <div
    className={`${className ? `${className} ` : ''}${barTooltipContainer}`}
    data-testid={dataTestId}
  >
    <div>
      <span
        className={barColorSquare}
        style={assignInlineVars({
          [colorBar]: color,
        })}
      />
    </div>
    <div>
      <Text as="p" sentiment="primary" variant="bodyStronger">
        {formattedValue}
      </Text>
      <Text as="p" variant="bodySmall">
        {indexValue}
      </Text>
    </div>
  </div>
)

export default BarChartToolTip
