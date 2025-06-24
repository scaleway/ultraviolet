'use client'

import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { Bullet } from '../Bullet'

const Steps = styled.ul`
  list-style: none;
  padding-left: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']};
  font-size: ${({ theme }) => theme.typography.body};
`

const Step = styled('li', {
  shouldForwardProp: prop => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space['2']};
  justify-content: center;
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.neutral.textDisabled
      : theme.colors.neutral.textStrong};
`

const StyledDiv = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Sizes }>`
  flex: 1;
  margin: auto;
  line-height: ${({ size }) => (size === 'medium' ? '32px' : '24px')};
  font-size: ${({ size }) => (size === 'medium' ? '24px' : '16px')};
  min-width: 0;
`

export type Sizes = 'small' | 'medium'

type ItemProps = {
  sentiment?: ComponentProps<typeof Bullet>['sentiment']
  prominence?: ComponentProps<typeof Bullet>['prominence']
  size?: Sizes
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
  className?: string
  bulletContent?: ReactNode
}

const Item = ({
  bulletContent,
  sentiment,
  prominence,
  children,
  onClick,
  size = 'medium',
  disabled = false,
  className,
}: ItemProps) => (
  <Step disabled={disabled} className={className} onClick={onClick}>
    {bulletContent ? (
      <Bullet
        size={size}
        sentiment={disabled ? 'disabled' : sentiment}
        prominence={prominence}
      >
        {bulletContent}
      </Bullet>
    ) : null}
    <StyledDiv size={size}>{children}</StyledDiv>
  </Step>
)

type StepListProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
}

/**
 * StepList component is used to display a list of steps.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const StepList = ({
  children,
  className,
  'data-testid': dataTestId,
}: StepListProps) => (
  <Steps className={className} data-testid={dataTestId}>
    {children}
  </Steps>
)

StepList.Item = Item
