'use client'

import type { TextVariant } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  ComponentType,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react'
import { useRef } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { useIsOverflowing } from '../../hooks/useIsOverflowing'
import type { ExtendedColor } from '../../theme'
import { Tooltip } from '../Tooltip'
import type { PROMINENCES } from './constants'
import { text } from './style.css'
import { textVars } from './variables.css'

type ProminenceProps = keyof typeof PROMINENCES
type PlacementProps = CSSProperties['textAlign']
type WhiteSpaceProps = CSSProperties['whiteSpace']

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
  style?: CSSProperties
}

/**
 * Text component is used to display text with different variants and sentiments.
 */
export const Text: ComponentType<TextProps> = ({
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
  style,
}) => {
  const elementRef = useRef(null)
  const isOverflowing = useIsOverflowing(elementRef)

  const finalStringChildren = recursivelyGetChildrenString(children)

  return (
    <Tooltip text={oneLine && isOverflowing ? finalStringChildren : ''}>
      <Component
        aria-hidden={ariaHidden}
        className={cn(
          className,
          text({
            disabled,
            italic,
            oneLine,
            prominence,
            sentiment,
            strikeThrough,
            underline,
            variant,
          }),
        )}
        data-testid={dataTestId}
        dir={dir}
        htmlFor={htmlFor}
        id={id}
        ref={elementRef}
        style={{
          ...assignInlineVars(textVars, {
            textAlign: placement ?? '',
            whiteSpace: whiteSpace ?? '',
          }),
          ...style,
        }}
      >
        {children}
      </Component>
    </Tooltip>
  )
}
