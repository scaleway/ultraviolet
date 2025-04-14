'use client'

import styled from '@emotion/styled'
import type { ComponentProps, Ref } from 'react'
import { forwardRef } from 'react'
import { Popup } from '../Popup'

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
  | 'portalTarget'
  | 'tabIndex'
  | 'debounceDelay'
>

const StyledPopup = styled(Popup)`
  pointer-events: none;
`

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
      portalTarget,
      debounceDelay,
      tabIndex,
    }: TooltipProps,
    tooltipRef: Ref<HTMLDivElement>,
  ) => (
    <StyledPopup
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
      portalTarget={portalTarget}
      tabIndex={tabIndex}
      debounceDelay={debounceDelay}
    >
      {children}
    </StyledPopup>
  ),
)
