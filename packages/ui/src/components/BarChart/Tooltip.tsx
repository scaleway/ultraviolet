'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Text } from '../Text'
import { barColorSquare, barTooltipContainer, colorBar } from './styles.css'

type BarChartTooltipProps = {
  color: string
  indexValue: string
  formattedValue: string
  className?: string
  'data-testid'?: string
}

export const BarChartTooltip = ({
  formattedValue,
  indexValue,
  color,
  className,
  'data-testid': dataTestId,
}: BarChartTooltipProps) => (
  <div className={cn(className, barTooltipContainer)} data-testid={dataTestId}>
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
