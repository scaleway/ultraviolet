'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type { Color } from '../../theme'

type Direction = 'horizontal' | 'vertical'

type StyledIconProps = {
  direction: Direction
  sentiment: Color
}

const StyledIconWrapper = styled('div', {
  shouldForwardProp: prop => !['direction', 'sentiment'].includes(prop),
})<StyledIconProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === 'vertical' ? 'column' : 'row'};
  align-items: center;

  svg {
    fill: ${({ sentiment, theme }) => (sentiment === 'neutral' ? theme.colors.neutral.borderWeak : theme.colors[sentiment].border)};
  }
`

type HorizontalSeparatorProps = Omit<SeparatorProps, 'color' | 'sentiment'> & {
  hasIcon?: boolean
  sentiment: Color
}

const StyledHr = styled('hr', {
  shouldForwardProp: prop =>
    !['direction', 'thickness', 'hasIcon', 'sentiment'].includes(prop),
})<HorizontalSeparatorProps>`
  margin: 0;
  border: 0;
  width: ${({ direction, thickness = 1 }) =>
    direction === 'vertical' ? `${thickness}px` : 'auto'};
  height: ${({ direction, thickness = 1 }) =>
    direction === 'horizontal' ? `${thickness}px` : 'auto'};
  flex-shrink: 0;
  background-color: ${({ theme, sentiment }) =>
    sentiment === 'neutral'
      ? theme.colors.neutral.borderWeak
      : theme.colors[sentiment].border};
  ${({ hasIcon }) => hasIcon && `flex: 1;`}
`

type SeparatorProps = {
  direction?: Direction
  thickness?: number
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
  sentiment = 'neutral',
  className,
  'data-testid': dataTestId,
  children,
}: SeparatorProps) =>
  children ? (
    <StyledIconWrapper
      role="separator"
      aria-orientation={direction}
      direction={direction}
      className={className}
      data-testid={dataTestId}
      sentiment={sentiment}
    >
      <StyledHr
        direction={direction}
        thickness={thickness}
        sentiment={sentiment}
        hasIcon
      />
      {children}
      <StyledHr
        direction={direction}
        thickness={thickness}
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
      sentiment={sentiment}
      className={className}
      data-testid={dataTestId}
    />
  )
