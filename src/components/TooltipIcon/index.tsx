import { useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import { ComponentProps, ReactNode } from 'react'
import Icon, { icons } from '../Icon'
import Tooltip from '../Tooltip'

type TooltipIconProps = {
  baseId?: string
  color?: string
  name?: ComponentProps<typeof Icon>['name']
  size?: number
  tooltip: ReactNode
  verticalAlign?: string
}

const TooltipIcon = ({
  color,
  name = 'help-circle-outline',
  size = 20,
  verticalAlign = 'middle',
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
        verticalAlign={verticalAlign}
        aria-label={name}
      />
    </Tooltip>
  )
}

TooltipIcon.propTypes = {
  baseId: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.oneOf(icons),
  size: PropTypes.number,
  tooltip: PropTypes.node.isRequired,
  verticalAlign: PropTypes.string,
}

export default TooltipIcon
