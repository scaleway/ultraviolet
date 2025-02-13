import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ComponentProps, ReactNode } from 'react'
import type { Color } from '../../theme'

type Direction = 'horizontal' | 'vertical'

type StyledIconProps = {
  direction: Direction
  color: Color
  sentiment?: Color
}

const StyledIconWrapper = styled('div', {
  shouldForwardProp: prop =>
    !['direction', 'color', 'sentiment'].includes(prop),
})<StyledIconProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: center;

  svg {
    fill: ${({ sentiment, color, theme }) => (sentiment ? theme.colors[sentiment].borderWeak : theme.colors[color].borderWeak)};
  }
`

type HorizontalSeparatorProps = SeparatorProps & {
  hasIcon?: boolean
}

const StyledHr = styled('hr', {
  shouldForwardProp: prop =>
    !['direction', 'thickness', 'color', 'hasIcon', 'sentiment'].includes(prop),
})<HorizontalSeparatorProps>`
  margin: 0;
  border: 0;
  width: ${({ direction, thickness = 1 }) =>
    direction === 'vertical' ? `${thickness}px` : 'auto'};
  height: ${({ direction, thickness = 1 }) =>
    direction === 'horizontal' ? `${thickness}px` : 'auto'};
  flex-shrink: 0;
  background-color: ${({ theme, color, sentiment }) =>
    sentiment
      ? theme.colors[sentiment].borderWeak
      : theme.colors[color as Color].borderWeak};
  ${({ hasIcon }) => hasIcon && `flex: 1;`}
`

type SeparatorProps = {
  /**
   * @deprecated Use the icon directly in children
   */
  icon?: ComponentProps<typeof Icon>['name']
  direction?: Direction
  thickness?: number
  /**
   * @deprecated Use `sentiment` instead
   */
  color?: Color
  sentiment?: Color
  className?: string
  'data-testid'?: string
  children?: ReactNode
}

/**
 * Separator component used to separate content with a horizontal or vertical line.
 */
export const Separator = ({
  direction = 'horizontal',
  thickness = 1,
  color = 'neutral',
  sentiment,
  icon,
  className,
  'data-testid': dataTestId,
  children,
}: SeparatorProps) =>
  icon || children ? (
    <StyledIconWrapper
      role="separator"
      aria-orientation={direction}
      direction={direction}
      className={className}
      data-testid={dataTestId}
      sentiment={sentiment}
      color={color}
    >
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        sentiment={sentiment}
        hasIcon
      />
      {children}
      {icon ? <Icon name={icon} size={24} color={color} /> : null}
      <StyledHr
        direction={direction}
        thickness={thickness}
        color={color}
        sentiment={sentiment}
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
