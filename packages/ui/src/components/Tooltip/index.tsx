import type { ComponentProps, ReactNode, Ref, RefObject } from 'react'
import { forwardRef } from 'react'
import { Popup } from '../../internalComponents'

type TooltipProps = {
  /**
   * Id is automatically generated if not set. It is used for associating tooltip wrapper with tooltip portal.
   */
  id?: string
  children:
    | ReactNode
    | ((renderProps: {
        className?: string
        onBlur: () => void
        onFocus: () => void
        onPointerEnter: () => void
        onPointerLeave: () => void
        ref: RefObject<HTMLDivElement>
      }) => ReactNode)
  maxWidth?: number
  /**
   * `auto` placement will change the position of the tooltip if it doesn't fit in the viewport.
   */
  placement?: ComponentProps<typeof Popup>['placement']
  /**
   * Content of the tooltip, preferably text inside.
   */
  text?: ReactNode
  className?: string
  /**
   * It will force display tooltip. This can be useful if you need to always display the tooltip without hover needed.
   */
  visible?: boolean
  innerRef?: Ref<HTMLDivElement | null>
  role?: string
  'data-testid'?: string
}

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
