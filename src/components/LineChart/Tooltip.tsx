import styled from '@emotion/styled'
import { Point } from '@nivo/line'
import PropTypes from 'prop-types'
import React, { FunctionComponent, Validator } from 'react'
import FlexBox from '../FlexBox'
import Typography from '../Typography'

const LineTooltipContainer = styled(FlexBox)`
  background: white;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows.tooltip};
  padding: 5px 9px;
  align-items: center;
`
const LineColorSquare = styled.span`
  display: block;
  width: 12px;
  height: 12px;
  background: ${({ color }) => color};
  margin-right: 12px;
`
type LineChartTooltipProps = { point: Point }

const LineChartTooltip: FunctionComponent<LineChartTooltipProps> = ({
  point,
}) => (
  <LineTooltipContainer>
    <div>
      <LineColorSquare color={point.serieColor} />
    </div>
    <div>
      <Typography variant="bodyA" fontWeight={600} color="primary">
        {point.data.yFormatted}
      </Typography>
      <Typography variant="bodyB" color="gray700">
        {point.data.xFormatted}
      </Typography>
    </div>
  </LineTooltipContainer>
)

LineChartTooltip.propTypes = {
  point: PropTypes.shape({
    color: PropTypes.string,
    data: PropTypes.shape({
      xFormatted: PropTypes.string,
      yFormatted: PropTypes.string,
    }),
  }).isRequired as Validator<Point>,
}

export default LineChartTooltip
