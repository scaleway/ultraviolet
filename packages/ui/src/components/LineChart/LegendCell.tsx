import type { DatumValue } from '@nivo/core'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { Text } from '../Text'
import { lineChartStyle } from './styles.css'

type CellProps = {
  value?: DatumValue
  variant: ComponentProps<typeof Text>['variant']
}

export const Cell = ({ value, variant }: CellProps) => (
  <Text
    as="span"
    className={cn(lineChartStyle.textLegend, lineChartStyle.headTitle)}
    sentiment="neutral"
    variant={variant}
  >
    {value?.toString()}
  </Text>
)
