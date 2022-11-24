import { useTheme } from '@emotion/react'
import { ComponentProps, ReactNode } from 'react'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

type TooltipIconProps = {
  baseId?: string
  color?: string
  name?: ComponentProps<typeof Icon>['name']
  size?: number
  tooltip: ReactNode
}

const TooltipIcon = ({
  color,
  name = 'help-circle-outline',
  size = 20,
  tooltip,
  baseId,
}: TooltipIconProps) => {
  const theme = useTheme()

  return (
    <Tooltip text={tooltip} id={baseId}>
      <Icon
        color={color || theme.colors.neutral.textWeak}
        name={name}
        size={size}
        aria-label={name}
      />
    </Tooltip>
  )
}

export default TooltipIcon
