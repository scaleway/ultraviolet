'use client'

import { Text } from '../Text'
import { pieChartStyle } from './styles.css'

type TooltipProps = {
  data: {
    name?: string | null
    value?: string | null
    details?:
      | {
          name?: string | null
          value?: string | null
        }[]
      | null
  }
}

export const Tooltip = ({ data }: TooltipProps) => (
  <div role="tooltip" tabIndex={-1}>
    <ul className={pieChartStyle.listTooltip}>
      <li className={pieChartStyle.itemTooltip}>
        <Text as="p" prominence="stronger" variant="body">
          {data.name}
        </Text>
        <Text as="p" prominence="stronger" variant="body">
          {data.value}
        </Text>
      </li>
      {data.details?.map(detail => (
        <li className={pieChartStyle.itemTooltip} key={detail.name}>
          <Text as="p" prominence="stronger" variant="bodySmall">
            {detail.name}
          </Text>
          <Text as="p" prominence="stronger" variant="bodySmall">
            {detail.value}
          </Text>
        </li>
      ))}
    </ul>
  </div>
)
