'use client'

import { Text } from '../Text'
import type { DataType } from './types'
import { treeMapChartStyle } from './styles.css'

type TooltipProps = Pick<DataType, 'content' | 'value'> & {
  'data-testid'?: string
}

export const Tooltip = ({ value, content, 'data-testid': dataTestId }: TooltipProps) => (
  <div className={treeMapChartStyle.tooltipContainer} data-testid={dataTestId}>
    <Text as="p" sentiment="primary" variant="bodyStronger">
      {content}
    </Text>
    {value ? (
      <Text as="p" sentiment="primary" variant="bodyStronger">
        {value}
      </Text>
    ) : null}
  </div>
)
