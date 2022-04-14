import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import FlexBox from '../FlexBox'
import Typography from '../Typography'

const BarToolTipContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.colors.neutral.backgroundWeakElevated};
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows.tooltip};
  padding: 5px 9px;
  align-items: center;
`

const BarColorSquare = styled('span', {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})<{ color: string }>`
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

const BarChartToolTip = ({
  formattedValue,
  indexValue,
  color,
}: BarChartToolTipProps) => (
  <BarToolTipContainer>
    <div>
      <BarColorSquare color={color} />
    </div>
    <div>
      <Typography variant="bodyA" fontWeight={600} color="primary">
        {formattedValue}
      </Typography>
      <Typography variant="bodyC">{indexValue}</Typography>
    </div>
  </BarToolTipContainer>
)

BarChartToolTip.propTypes = {
  color: PropTypes.string.isRequired,
  formattedValue: PropTypes.string.isRequired,
  indexValue: PropTypes.string.isRequired,
}

export default BarChartToolTip
