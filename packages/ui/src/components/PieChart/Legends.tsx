'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { TooltipContent } from './Tooltip'
import type { Data } from './types'
import { colorBullet, pieChartStyle } from './styles.css'

type LegendsProps = {
  data?: Data[]
  legendHeader?: string
  focused?: string
  onFocusChange: (index?: string) => void
  colors: string[]
}

export const Legends = ({ focused, data, legendHeader, onFocusChange, colors }: LegendsProps) => (
  <div className={pieChartStyle.legendContainer}>
    {legendHeader ? (
      <Text
        as="span"
        variant="captionStrong"
        sentiment="neutral"
        prominence="weak"
        className={pieChartStyle.legendHeader}
      >
        {legendHeader}
      </Text>
    ) : null}
    <ul className={pieChartStyle.list}>
      {data?.map((item, index) => {
        const isSegmentFocused = focused !== undefined && item.id === focused

        const id = `chart-legend-${item.id}`

        return (
          <Tooltip key={item.id} text={<TooltipContent data={item} />} visible={isSegmentFocused}>
            <li
              className={pieChartStyle.listItem({
                isFocused: isSegmentFocused,
              })}
              onBlur={() => onFocusChange()}
              onFocus={() => onFocusChange(item.id)}
              onMouseOut={() => onFocusChange()}
              onMouseOver={() => onFocusChange(item.id)}
              data-testid={id}
            >
              <span
                className={pieChartStyle.bullet}
                color={colors[index]}
                id={id}
                style={assignInlineVars({
                  [colorBullet]: colors[index],
                })}
              />
              <Text as="span" variant={isSegmentFocused ? 'bodySmallStrong' : 'bodySmall'} oneLine>
                {item.name}
              </Text>
              <span className={pieChartStyle.line} />
              <Text as="span" variant="bodySmallStrong">
                {item.value}
              </Text>
            </li>
          </Tooltip>
        )
      })}
    </ul>
  </div>
)
