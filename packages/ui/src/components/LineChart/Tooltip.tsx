'use client'

import styled from '@emotion/styled'
import type { Point } from '@nivo/line'
import { Text } from '../Text'

const LineTooltipContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  border-radius: ${({ theme }) => theme.radii.small};
  box-shadow: ${({ theme }) => theme.shadows.tooltip};
  padding: ${({ theme }) => theme.space['0.5']} ${({ theme }) => theme.space['1']};
  align-items: center;
`
const LineColorSquare = styled.span`
  display: block;
  width: ${({ theme }) => theme.sizing['175']};
  height: ${({ theme }) => theme.sizing['175']};
  background: ${({ color }) => color};
  margin-right: ${({ theme }) => theme.space['1.5']};
`
type LineChartTooltipProps = { point: Point }

export const LineChartTooltip = ({ point }: LineChartTooltipProps) => (
  <LineTooltipContainer>
    <div>
      <LineColorSquare color={point.serieColor} />
    </div>
    <div>
      <Text
        as="div"
        prominence="stronger"
        sentiment="neutral"
        variant="bodyStronger"
      >
        {point.data.yFormatted}
      </Text>
      <Text
        as="div"
        prominence="stronger"
        sentiment="neutral"
        variant="bodySmall"
      >
        {point.data.xFormatted}
      </Text>
    </div>
  </LineTooltipContainer>
)
