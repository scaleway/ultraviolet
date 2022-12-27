import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import type { Color } from '../../theme'
import Icon from '../Icon'

type Direction = 'horizontal' | 'vertical'

type StyledIconProps = {
  direction: Direction
}

const StyledIconWrapper = styled('div', {
  shouldForwardProp: prop => !['direction'].includes(prop),
})<StyledIconProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: center;
`

const StyledIcon = styled(Icon)`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  fill: ${({ theme }) => theme.colors.neutral.border};
`

type HorizontalSeparatorProps = SeparatorProps & {
  hasIcon?: boolean
}

const StyledHr = styled('hr', {
  shouldForwardProp: prop =>
    !['direction', 'thickness', 'color', 'hasIcon'].includes(prop),
})<HorizontalSeparatorProps>`
  margin: 0;
  border: 0;
  width: ${({ direction, thickness = 1 }) =>
    direction === 'vertical' ? `${thickness}px` : 'auto'};
  height: ${({ direction, thickness = 1 }) =>
    direction === 'horizontal' ? `${thickness}px` : 'auto'};
  flex-shrink: 0;
  background-color: ${({ theme, color }) =>
    theme.colors[color as Color].border};
  ${({ hasIcon }) => hasIcon && `flex: 1;`}
`

type SeparatorProps = {
  icon?: ComponentProps<typeof Icon>['name']
  direction?: Direction
  thickness?: number
  color?: Color
  className?: string
}

const Separator = ({
  direction = 'horizontal',
  thickness = 1,
  color = 'neutral',
  icon,
  className,
}: SeparatorProps): JSX.Element =>
  icon ? (
    <StyledIconWrapper
      role="separator"
      aria-orientation={direction}
      direction={direction}
      className={className}
    >
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        hasIcon
      />
      <StyledIcon name={icon} size={24} color="neutral" />
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        hasIcon
      />
    </StyledIconWrapper>
  ) : (
    <StyledHr
      role="separator"
      aria-orientation={direction}
      direction={direction}
      thickness={thickness}
      color={color}
      className={className}
    />
  )

export default Separator
