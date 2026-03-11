'use client'

import { cn } from '@ultraviolet/utils'

import { Item } from './Item'
import { stepListStyle } from './styles.css'

import type { CSSProperties, ReactNode } from 'react'

type StepListProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
  style?: CSSProperties
}

/**
 * StepList component is used to display a list of steps.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const StepList = ({
  children,
  className,
  style,
  'data-testid': dataTestId,
}: StepListProps) => (
  <ul
    className={cn(className, stepListStyle.steps)}
    data-testid={dataTestId}
    style={style}
  >
    {children}
  </ul>
)

StepList.Item = Item
