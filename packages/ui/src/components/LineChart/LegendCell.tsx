import { cn } from '@ultraviolet/utils'

import { Text } from '../Text'

import { lineChartStyle } from './styles.css'

import type { DatumValue } from '@nivo/core'
import type { ComponentProps } from 'react'

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
