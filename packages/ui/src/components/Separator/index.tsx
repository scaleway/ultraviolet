import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ComponentProps, JSX } from 'react'
import type { Color } from '../../theme'

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

const StyledIcon = styled(Icon)<{ color: Color }>`
  fill: ${({ color, theme }) => theme.colors[color].border};
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
  'data-testid'?: string
}

/**
 * Separator component used to separate content with a horizontal or vertical line.
 */
export const Separator = ({
  direction = 'horizontal',
  thickness = 1,
  color = 'neutral',
  icon,
  className,
  'data-testid': dataTestId,
}: SeparatorProps): JSX.Element =>
  icon ? (
    <StyledIconWrapper
      role="separator"
      aria-orientation={direction}
      direction={direction}
      className={className}
      data-testid={dataTestId}
    >
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        hasIcon
      />
      <StyledIcon name={icon} size={24} color={color} />
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
      data-testid={dataTestId}
    />
  )
