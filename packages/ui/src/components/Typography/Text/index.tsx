'use client'

import type { TextVariant } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { AriaAttributes, AriaRole, CSSProperties, ElementType, ReactNode } from 'react'
import { useCallback, useRef } from 'react'
import recursivelyGetChildrenString from '../../../helpers/recursivelyGetChildrenString'
import { useIsOverflowing } from '../../../hooks/useIsOverflowing'
import type { ExtendedColor } from '../../../theme'
import { Tooltip } from '../../Overlay/Tooltip'
import type { TooltipRenderProps } from '../../Overlay/Tooltip'
import type { PROMINENCES } from './constants'
import { textStyle } from './style.css'
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
  'aria-live'?: AriaAttributes['aria-live']
  'aria-atomic'?: AriaAttributes['aria-atomic']
  strikeThrough?: boolean
  whiteSpace?: WhiteSpaceProps
  role?: Extract<AriaRole, 'status' | 'alert'>
  style?: CSSProperties
}

/**
 * Text component is used to display text with different variants and sentiments.
 */
export const Text = ({
  variant,
  children,
  as: Component,
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
  role,
  'data-testid': dataTestId,
  'aria-hidden': ariaHidden,
  'aria-live': ariaLive,
  'aria-atomic': ariaAtomic,
  style,
}: TextProps) => {
  const [setElement, isOverflowing] = useIsOverflowing({ enabled: oneLine })

  const finalStringChildren = recursivelyGetChildrenString(children)

  const tooltipRef = useRef<TooltipRenderProps['ref']>(undefined)
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      setElement(node)
      const ref = tooltipRef.current
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [setElement],
  )

  return (
    <Tooltip text={isOverflowing ? finalStringChildren : ''}>
      {tooltipProps => {
        tooltipRef.current = tooltipProps.ref

        return (
          <Component
            {...tooltipProps}
            aria-hidden={ariaHidden}
            aria-live={ariaLive}
            aria-atomic={ariaAtomic}
            className={cn(
              className,
              textStyle.text({
                disabled,
                italic,
                oneLine,
                prominence,
                sentiment,
                strikeThrough,
                underline,
                variant,
              }),
              oneLine ? textStyle.oneLine : '',
            )}
            data-testid={dataTestId}
            dir={dir}
            htmlFor={htmlFor}
            id={id}
            ref={setRef}
            role={role}
            style={{
              ...assignInlineVars(textVars, {
                textAlign: placement ?? '',
                whiteSpace: whiteSpace ?? '',
              }),
              ...style,
            }}
            tabIndex={isOverflowing ? 0 : undefined}
          >
            {children}
          </Component>
        )
      }}
    </Tooltip>
  )
}

Text.displayName = 'Text'
