import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent } from 'react'
import FlexBox from '../FlexBox'
import Typography from '../Typography'

const BarToolTipContainer = styled(FlexBox)`
  background: white;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px;
  padding: 5px 9px;
  align-items: center;
`

const BarColorSquare = styled.span`
  display: block;
  width: 12px;
  height: 12px;
  background: ${({ color }) => color};
  margin-right: 12px;
`

type BarChartToolTipProps = {
  color: string
  indexValue: string
  formattedValue: string
}

const BarChartToolTip: FunctionComponent<BarChartToolTipProps> = ({
  formattedValue,
  indexValue,
  color,
}) => (
  <BarToolTipContainer>
    <div>
      <BarColorSquare color={color} />
    </div>
    <div>
      <Typography variant="bodyA" fontWeight={600} color="primary">
        {formattedValue}
      </Typography>
      <Typography variant="bodyB" color="gray700">
        {indexValue}
      </Typography>
    </div>
  </BarToolTipContainer>
)

BarChartToolTip.propTypes = {
  color: PropTypes.string.isRequired,
  formattedValue: PropTypes.string.isRequired,
  indexValue: PropTypes.string.isRequired,
}

export default BarChartToolTip
