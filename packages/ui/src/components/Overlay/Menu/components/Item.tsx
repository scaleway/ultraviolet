'use client'

import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { cn } from '@ultraviolet/utils'
import { forwardRef, useCallback } from 'react'
import type { CSSProperties, KeyboardEvent, MouseEvent, MouseEventHandler, ReactNode, Ref } from 'react'
import { Stack } from '../../../Layout/Stack'
import { usePopupContext } from '../../Popup/v2/context'
import { Tooltip } from '../../Tooltip'
import { useDisclosureContext, useMenu } from '../MenuProvider'
import { menuStyle } from '../styles.css'

type MenuItemSentiment = 'neutral' | 'primary' | 'danger'

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
    const closeMenu = isDisclosure ? parentCloseMenu : closeCurrentMenu

    const onClickHandle = useCallback(
      (event: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          return undefined
        }
        onClick?.(event)
        if (hideOnClickItem || hideOnClick) {
          setOpen(false)
        }

        return undefined
      },
      [disabled, hideOnClickItem, hideOnClick, onClick, setOpen],
    )

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (isDisclosure && event.key === 'ArrowRight') {
        disclosureRef?.current?.click()
      } else if (event.key === 'ArrowLeft' && isNested && closeMenu?.()) {
        event.stopPropagation()
      }
    }

    if (href && !disabled) {
      return (
        <div className={menuStyle.itemContainer({ borderless })} data-search-text={searchText} style={style}>
          <Tooltip text={tooltip}>
            <a
              className={cn(className, menuStyle.item({ borderless: true, disabled, sentiment }))}
              data-active={active}
              data-is-disclosure={isDisclosure}
              data-is-menu-item
              data-testid={dataTestId}
              href={href}
              onClick={onClickHandle}
              onKeyDown={handleKeyDown}
              // oxlint-disable-next-line typescript/no-unsafe-type-assertion
              ref={ref as Ref<HTMLAnchorElement>}
              rel={rel}
              role="menuitem"
              target={target}
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
            </a>
          </Tooltip>
        </div>
      )
    }

    return (
      <div className={menuStyle.itemContainer({ borderless })} data-search-text={searchText} style={style}>
        <Tooltip text={tooltip}>
          <button
            className={cn(className, menuStyle.item({ borderless, disabled, sentiment }))}
            data-active={active || (open && isDisclosure)}
            data-is-disclosure={isDisclosure}
            data-is-menu-item
            data-testid={dataTestId}
            disabled={disabled}
            onClick={event => {
              if (isNested) {
                event.preventDefault()
              }
              onClick?.(event)
              if (hideOnClickItem || hideOnClick) {
                setOpen(false)
              }
            }}
            onKeyDown={handleKeyDown}
            // oxlint-disable-next-line typescript/no-unsafe-type-assertion
            ref={ref as Ref<HTMLButtonElement>}
            role="menuitem"
            type="button"
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
          </button>
        </Tooltip>
      </div>
    )
  },
)

Item.displayName = 'Menu.Item'
