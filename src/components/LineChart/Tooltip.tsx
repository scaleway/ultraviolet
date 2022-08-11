import styled from '@emotion/styled'
import { Point } from '@nivo/line'
import PropTypes from 'prop-types'
import { Validator } from 'react'
import Text from '../Text'

const LineTooltipContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
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

const LineChartTooltip = ({ point }: LineChartTooltipProps) => (
  <LineTooltipContainer>
    <div>
      <LineColorSquare color={point.serieColor} />
    </div>
    <div>
      <Text
        variant="bodyStronger"
        color="neutral"
        prominence="stronger"
        as="div"
      >
        {point.data.yFormatted}
      </Text>
      <Text variant="bodySmall" color="neutral" prominence="stronger" as="div">
        {point.data.xFormatted}
      </Text>
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
