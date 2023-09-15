import type { ComponentProps, Ref } from 'react'
import { forwardRef } from 'react'
import { Popup } from '../../internalComponents'

type TooltipProps = Pick<
  ComponentProps<typeof Popup>,
  | 'id'
  | 'children'
  | 'maxWidth'
  | 'placement'
  | 'text'
  | 'className'
  | 'visible'
  | 'innerRef'
  | 'role'
  | 'data-testid'
  | 'containerFullWidth'
>

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
      maxWidth = 232,
      visible,
      innerRef,
      role = 'tooltip',
      'data-testid': dataTestId,
    }: TooltipProps,
    tooltipRef: Ref<HTMLDivElement>,
  ) => (
    <Popup
      id={id}
      ref={tooltipRef}
      role={role}
      data-testid={dataTestId}
      className={className}
      containerFullWidth={containerFullWidth}
      maxWidth={maxWidth}
      visible={visible}
      placement={placement}
      text={text}
      innerRef={innerRef}
    >
      {children}
    </Popup>
  ),
)
