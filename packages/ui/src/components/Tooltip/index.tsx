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
>

export const Tooltip = forwardRef(
  (
    {
      children,
      text = '',
      placement = 'auto',
      id,
      className,
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
