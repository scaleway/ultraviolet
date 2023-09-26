import styled from '@emotion/styled'
import { Text } from '../Text'

const BarToolTipContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeakElevated};
  border-radius: ${({ theme }) => theme.radii.small};
  box-shadow: ${({ theme }) => theme.shadows.tooltip};
  padding: 5px 9px;
  align-items: center;
`

const BarColorSquare = styled('span', {
  shouldForwardProp: prop => !['color'].includes(prop),
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
  className?: string
  'data-testid'?: string
}

const BarChartToolTip = ({
  formattedValue,
  indexValue,
  color,
  className,
  'data-testid': dataTestId,
}: BarChartToolTipProps) => (
  <BarToolTipContainer className={className} data-testid={dataTestId}>
    <div>
      <BarColorSquare color={color} />
    </div>
    <div>
      <Text variant="bodyStronger" as="p" sentiment="primary">
        {formattedValue}
      </Text>
      <Text variant="bodySmall" as="p">
        {indexValue}
      </Text>
    </div>
  </BarToolTipContainer>
)

export default BarChartToolTip
