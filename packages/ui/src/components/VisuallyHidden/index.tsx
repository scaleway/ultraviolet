'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, ElementType } from 'react'
import { visuallyHiddenStyle } from './styles.css'

type VisuallyHiddenProps<T extends ElementType = 'span'> = Omit<ComponentProps<T>, 'as'> & {
  /**
   * The element type for the container. By default `span`.
   * Any focusable element will be displayed when focused
   */
  as?: T
}

export const VisuallyHidden = <T extends ElementType = 'span'>({
  children,
  className,
  as: Component,
  ...props
}: VisuallyHiddenProps<T>) => {
  const ComponentElement = (Component ?? 'span') as ElementType
  const componentProps = props as ComponentProps<T>

  return (
    <ComponentElement className={cn(className, visuallyHiddenStyle.visuallyHidden)} {...componentProps}>
      {children}
    </ComponentElement>
  )
}

VisuallyHidden.displayName = 'VisuallyHidden'
