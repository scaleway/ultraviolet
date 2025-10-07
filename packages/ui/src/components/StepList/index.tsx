'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Bullet } from '../Bullet'
import { step, stepDiv, steps } from './styles.css'

export type Sizes = 'small' | 'medium'

type ItemProps = {
  sentiment?: ComponentProps<typeof Bullet>['sentiment']
  prominence?: ComponentProps<typeof Bullet>['prominence']
  size?: Sizes
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
  onKeyDown?: () => void
  className?: string
  bulletContent?: ReactNode
}

const Item = ({
  bulletContent,
  sentiment,
  prominence,
  children,
  onClick,
  onKeyDown,
  size = 'medium',
  disabled = false,
  className,
}: ItemProps) => (
  <li
    className={`${className ? `${className} ` : ''}${step({ disabled })}`}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {bulletContent ? (
      <Bullet
        prominence={prominence}
        sentiment={disabled ? 'disabled' : sentiment}
        size={size}
      >
        {bulletContent}
      </Bullet>
    ) : null}
    <div className={stepDiv({ size })}>{children}</div>
  </li>
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
  <ul
    className={`${className ? `${className} ` : ''}${steps}`}
    data-testid={dataTestId}
  >
    {children}
  </ul>
)

StepList.Item = Item
