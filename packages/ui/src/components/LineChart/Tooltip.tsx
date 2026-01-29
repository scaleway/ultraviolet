'use client'

import type { Point } from '@nivo/line'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Text } from '../Text'
import { colorLine, lineColorSquare, lineTooltipContainer } from './styles.css'

type LineChartTooltipProps = {
  point: Point
  xFormatted?: string
  yFormatted?: string
}

export const LineChartTooltip = ({
  point,
  xFormatted,
  yFormatted,
}: LineChartTooltipProps) => (
  <div className={lineTooltipContainer}>
    <div>
      <span
        className={lineColorSquare}
        style={assignInlineVars({
          [colorLine]: point.serieColor,
        })}
      />
    </div>
    <div>
      <Text
        as="div"
        prominence="stronger"
        sentiment="neutral"
        variant="bodyStronger"
      >
        {yFormatted ?? point.data.yFormatted}
      </Text>
      <Text
        as="div"
        prominence="stronger"
        sentiment="neutral"
        variant="bodySmall"
      >
        {xFormatted ?? point.data.xFormatted}
      </Text>
    </div>
  </div>
)
