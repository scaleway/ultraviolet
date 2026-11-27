'use client'

import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { cn } from '@ultraviolet/utils'
import { forwardRef } from 'react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { Stack } from '../../../Layout/Stack'
import { usePopupContext } from '../../Popup/v2/context'
import { Tooltip } from '../../Tooltip'
import { useDisclosureContext, useListNavigationProps, useMenu } from '../MenuProvider'
import { menuStyle } from '../styles.css'

type MenuItemSentiment = 'neutral' | 'primary' | 'danger'

// The item is either an <a> or a <button>, so its props are the intersection of both.
type MenuItemElementProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>

type ItemProps = {
  href?: HTMLAnchorElement['href']
  target?: HTMLAnchorElement['target']
  rel?: HTMLAnchorElement['rel']
  disabled?: boolean | undefined
  tooltip?: string | undefined
  className?: string | undefined
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement> | undefined
  borderless?: boolean
  sentiment?: MenuItemSentiment
  active?: boolean
  'data-testid'?: string
  /**
   * If you children is complex and you want to specify the search text use this prop.
   */
  searchText?: string
  style?: CSSProperties
  rightComponent?: ReactNode
  hideOnClick?: boolean | undefined
}

export const Item = forwardRef<HTMLElement, ItemProps>(
  (
    {
      borderless = false,
      disabled = false,
      onClick,
      sentiment = 'neutral',
      href,
      target,
      rel,
      children,
      tooltip,
      active,
      className,
      searchText,
      'data-testid': dataTestId,
      style,
      rightComponent,
      hideOnClick,
    },
    ref,
  ) => {
    const { hideOnClickItem, isNested, closeMenu: closeCurrentMenu, parentCloseMenu, disclosureRef } = useMenu()
    const { open, setOpen } = usePopupContext()
    const isDisclosure = useDisclosureContext()
    const listNavigationProps = useListNavigationProps()
    // `HTMLProps` types `type` as `string`, incompatible with the button's `type` union; list navigation never sets it.
    const { type: _type, ...listNavigationElementProps } = listNavigationProps ?? {}
    const closeMenu = isDisclosure ? parentCloseMenu : closeCurrentMenu

    const isLink = Boolean(href) && !disabled
    const Element = isLink ? 'a' : 'button'
    const linkProps: MenuItemElementProps = { href, rel, target }
    const buttonProps: MenuItemElementProps = { disabled, type: 'button' }

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      const focusedDialog = document.activeElement?.closest('dialog')
      // A dialog opened by this item (e.g. a Modal disclosure) already took focus: don't steal it back.
      if (!focusedDialog || focusedDialog.contains(event.currentTarget)) {
        listNavigationProps?.onClick?.(event)
      }
      // Items inside a submenu open it, they don't navigate.
      if (!isLink && isNested) {
        event.preventDefault()
      }
      onClick?.(event)
      if (hideOnClickItem || hideOnClick) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (isDisclosure && event.key === 'ArrowRight') {
        disclosureRef?.current?.click()
      } else if (event.key === 'ArrowLeft' && isNested && closeMenu?.()) {
        event.stopPropagation()
      }
    }

    return (
      <div className={menuStyle.itemContainer({ borderless })} data-search-text={searchText} style={style}>
        <Tooltip text={tooltip}>
          <Element
            {...listNavigationElementProps}
            {...(isLink ? linkProps : buttonProps)}
            className={cn(className, menuStyle.item({ disabled, sentiment }))}
            data-active={active || (open && isDisclosure)}
            data-is-disclosure={isDisclosure}
            data-is-menu-item
            data-testid={dataTestId}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            // oxlint-disable-next-line typescript/no-unsafe-type-assertion
            ref={ref as unknown as Ref<HTMLAnchorElement> & Ref<HTMLButtonElement>}
            role="menuitem"
          >
            {isDisclosure || rightComponent ? (
              <Stack alignItems="center" direction="row" justifyContent="space-between" width="100%">
                {children}
                {rightComponent ? (
                  // oxlint-disable-next-line jsx-a11y/interactive-supports-focus
                  <div
                    onClick={event => {
                      event.stopPropagation()
                      event.preventDefault()
                    }}
                    onKeyDown={event => {
                      if (event.key !== 'Tab') {
                        event.stopPropagation()
                        event.preventDefault()
                      }
                    }}
                    role="menuitem"
                  >
                    {rightComponent}
                  </div>
                ) : null}
                {isDisclosure ? <ArrowRightIcon /> : null}
              </Stack>
            ) : (
              children
            )}
          </Element>
        </Tooltip>
      </div>
    )
  },
)

Item.displayName = 'Menu.Item'
