'use client'

import { cn } from '@ultraviolet/themes'
import type { ComponentProps, Ref } from 'react'
import { forwardRef } from 'react'
import { Popup } from '../Popup'
import { tooltip } from './styles.css'

type TooltipProps = Pick<
  ComponentProps<typeof Popup>,
  | 'id'
  | 'children'
  | 'maxWidth'
  | 'text'
  | 'className'
  | 'visible'
  | 'innerRef'
  | 'role'
  | 'data-testid'
  | 'containerFullWidth'
  | 'containerFullHeight'
  | 'portalTarget'
  | 'tabIndex'
  | 'debounceDelay'
  | 'style'
> & {
  placement?: Exclude<ComponentProps<typeof Popup>['placement'], 'nested-menu'>
}

/**
 * Tooltip component is used to display additional information on hover or focus.
 * It is used to explain the purpose of the element it is attached to.
 */
export const Tooltip = forwardRef(
  (
    {
      children,
      text = '',
      placement = 'auto',
      id,
      className,
      containerFullWidth,
      containerFullHeight,
      maxWidth = 232,
      visible,
      innerRef,
      role = 'tooltip',
      'data-testid': dataTestId,
      portalTarget,
      debounceDelay,
      tabIndex,
      style,
    }: TooltipProps,
    tooltipRef: Ref<HTMLDivElement>,
  ) => (
    <Popup
      className={cn(className, tooltip)}
      containerFullHeight={containerFullHeight}
      containerFullWidth={containerFullWidth}
      data-testid={dataTestId}
      debounceDelay={debounceDelay}
      id={id}
      innerRef={innerRef}
      maxWidth={maxWidth}
      placement={placement}
      portalTarget={portalTarget}
      ref={tooltipRef}
      role={role}
      style={style}
      tabIndex={tabIndex}
      text={text}
      visible={visible}
    >
      {children}
    </Popup>
  ),
)
