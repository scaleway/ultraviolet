'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Tooltip } from '../Tooltip'
import {
  bulletPie,
  colorBullet,
  labelPie,
  linePie,
  listItemPie,
  listPie,
  progressiveLinePie,
  textPie,
  toggleBoxPie,
  valuePie,
} from './styles.css'
import TooltipContainer from './Tooltip'
import type { Data } from './types'

type LegendsProps = {
  data?: Data[]
  focused?: string
  onFocusChange: (index?: string) => void
  colors: string[]
}

const Legends = ({ focused, data, onFocusChange, colors }: LegendsProps) => (
  <ul className={listPie}>
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
          <li className={listItemPie({ isFocused: isSegmentFocused })}>
            <div
              className={toggleBoxPie}
              data-testid={id}
              onBlur={() => onFocusChange()}
              onFocus={() => onFocusChange(item.id)}
              onMouseOut={() => onFocusChange()}
              onMouseOver={() => onFocusChange(item.id)}
            />
            <div
              className={bulletPie({ isFocused: isSegmentFocused })}
              color={colors[index]}
              id={`chart-legend-${item.id}`}
              style={assignInlineVars({
                [colorBullet]: colors[index],
              })}
            />
            <div className={labelPie}>
              <span className={textPie({ isFocused: isSegmentFocused })}>
                {item.name}
              </span>
              <span className={linePie}>
                <span
                  className={progressiveLinePie({
                    isFocused: isSegmentFocused,
                  })}
                />
              </span>
            </div>
            <div
              className={valuePie[isSegmentFocused ? 'isFocused' : 'default']}
            >
              {item.value}
            </div>
          </li>
        </Tooltip>
      )
    })}
  </ul>
)

export default Legends
