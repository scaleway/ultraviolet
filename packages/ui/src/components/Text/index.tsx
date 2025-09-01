'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useRef } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { useIsOverflowing } from '../../hooks/useIsOverflowing'
import type { ExtendedColor } from '../../theme'
import { typography } from '../../theme'
import { Tooltip } from '../Tooltip'
import type { PROMINENCES } from './constant'
import { text } from './style.css'
import { placementText, whiteSpaceText } from './variables.css'

type ProminenceProps = keyof typeof PROMINENCES
type PlacementProps = CSSProperties['textAlign']
type WhiteSpaceProps = CSSProperties['whiteSpace']
type TextVariant = keyof typeof typography
export const textVariants = Object.keys(typography) as TextVariant[]

type TextProps = {
  className?: string
  children: ReactNode
  placement?: PlacementProps
  variant: TextVariant
  sentiment?: ExtendedColor
  prominence?: ProminenceProps
  as: ElementType
  oneLine?: boolean
  disabled?: boolean
  italic?: boolean
  underline?: boolean
  id?: string
  dir?: 'ltr' | 'rtl' | 'auto'
  htmlFor?: string
  'data-testid'?: string
  'aria-hidden'?: boolean
  strikeThrough?: boolean
  whiteSpace?: WhiteSpaceProps
}

/**
 * Text component is used to display text with different variants and sentiments.
 */
export const Text = ({
  variant,
  children,
  as: Component = 'div',
  sentiment,
  oneLine = false,
  placement,
  prominence = 'default',
  className,
  disabled = false,
  italic = false,
  underline = false,
  strikeThrough = false,
  id,
  dir,
  whiteSpace,
  htmlFor,
  'data-testid': dataTestId,
  'aria-hidden': ariaHidden,
}: TextProps) => {
  const elementRef = useRef(null)
  const isOverflowing = useIsOverflowing(elementRef)

  const finalStringChildren = recursivelyGetChildrenString(children)

  return (
    <Tooltip text={oneLine && isOverflowing ? finalStringChildren : ''}>
      <Component
        aria-hidden={ariaHidden}
        className={`${className ? `${className} ` : ''}${text({ disabled, italic, oneLine, prominence, sentiment, strikeThrough, underline, variant })}`}
        data-testid={dataTestId}
        dir={dir}
        htmlFor={htmlFor}
        id={id}
        ref={elementRef}
        style={assignInlineVars({
          [placementText]: placement,
          [whiteSpaceText]: whiteSpace,
        })}
      >
        {children}
      </Component>
    </Tooltip>
  )
}
