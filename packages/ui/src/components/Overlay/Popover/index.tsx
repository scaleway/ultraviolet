'use client'

import { cn } from '@ultraviolet/utils'
import { forwardRef, useId } from 'react'
import type { Ref } from 'react'
import { Popup } from '../Popup/v2'
import { ContentWrapper } from './ContentWrapper'
import type { NewPopoverPlacement, PopoverProps } from './types'
import { popoverStyle } from './styles.css'

/**
 * Popover component is used to display additional information or actions on top of the main content of the page.
 * It is usually triggered by clicking on a button. It includes a title, a close button and a content area.
 */
export const Popover = forwardRef(
  (
    {
      visible,
      children,
      placement = 'top',
      content,
      title,
      sentiment = 'neutral',
      size = 'medium',
      onClose,
      className,
      'data-testid': dataTestId,
      portalTarget,
      style,
    }: PopoverProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const titleId = useId()

    const handleOpenChange = (open: boolean) => {
      if (!open) {
        onClose?.()
      }
    }

    // remove legacy "auto" placements, the panel always flips when needed
    const finalPlacement = (placement.replace(/auto-?/v, '') || 'top') as NewPopoverPlacement

    return (
      <Popup.Root visible={visible} onOpenChange={handleOpenChange}>
        <Popup.Trigger>{children}</Popup.Trigger>
        <Popup.Panel
          role="dialog"
          aria-labelledby={titleId}
          sentiment={sentiment}
          className={cn(className, popoverStyle.popover({ size }))}
          placement={finalPlacement}
          portalTarget={portalTarget}
          data-testid={dataTestId}
          ref={ref}
          focusTrap
          arrow
          style={style}
        >
          <ContentWrapper titleId={titleId} sentiment={sentiment} title={title}>
            {content}
          </ContentWrapper>
        </Popup.Panel>
      </Popup.Root>
    )
  },
)

Popover.displayName = 'Popover'
