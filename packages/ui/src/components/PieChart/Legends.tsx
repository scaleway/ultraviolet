'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'

import { Tooltip } from '../Tooltip'

import { colorBullet, pieChartStyle } from './styles.css'
import { Tooltip as TooltipContainer } from './Tooltip'

import type { Data } from './types'

type LegendsProps = {
  data?: Data[]
  focused?: string
  onFocusChange: (index?: string) => void
  colors: string[]
}

export const Legends = ({
  focused,
  data,
  onFocusChange,
  colors,
}: LegendsProps) => (
  <ul className={pieChartStyle.list}>
    {data?.map((item, index) => {
      const isSegmentFocused = focused !== undefined && item.id === focused

      const id = `chart-legend-${item.id}`

      return (
        <Tooltip
          id={id}
          key={item.id}
          text={<TooltipContainer data={item} />}
          visible={isSegmentFocused}
        >
          <li
            className={pieChartStyle.listItem({ isFocused: isSegmentFocused })}
          >
            <div
              className={pieChartStyle.toggleBox}
              data-testid={id}
              onBlur={() => onFocusChange()}
              onFocus={() => onFocusChange(item.id)}
              onMouseOut={() => onFocusChange()}
              onMouseOver={() => onFocusChange(item.id)}
            />
            <div
              className={pieChartStyle.bullet({ isFocused: isSegmentFocused })}
              color={colors[index]}
              id={`chart-legend-${item.id}`}
              style={assignInlineVars({
                [colorBullet]: colors[index],
              })}
            />
            <div className={pieChartStyle.label}>
              <span
                className={pieChartStyle.text({ isFocused: isSegmentFocused })}
              >
                {item.name}
              </span>
              <span className={pieChartStyle.line}>
                <span
                  className={pieChartStyle.progressiveLine({
                    isFocused: isSegmentFocused,
                  })}
                />
              </span>
            </div>
            <div
              className={
                pieChartStyle.value[isSegmentFocused ? 'isFocused' : 'default']
              }
            >
              {item.value}
            </div>
          </li>
        </Tooltip>
      )
    })}
  </ul>
)
