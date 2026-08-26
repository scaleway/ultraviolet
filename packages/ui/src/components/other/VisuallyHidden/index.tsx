'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, ElementType, ForwardedRef } from 'react'
import { createElement, forwardRef } from 'react'
import { visuallyHiddenStyle } from './styles.css'

type VisuallyHiddenProps<T extends ElementType = 'span'> = {
  /**
   * The element type for the container. By default `span`.
   * Any focusable element will be displayed when focused
   */
  as?: T
} & Omit<ComponentProps<T>, 'as'>

export const VisuallyHidden = forwardRef(
  <T extends ElementType = 'span'>(
    { children, className, as = 'span' as T, ...props }: VisuallyHiddenProps<T>,
    ref: ForwardedRef<ComponentProps<T>>,
  ) => {
    return createElement(
      as,
      {
        className: cn(className, visuallyHiddenStyle.visuallyHidden),
        ...props,
        ref,
      },
      children,
    )
  },
)

VisuallyHidden.displayName = 'VisuallyHidden'
