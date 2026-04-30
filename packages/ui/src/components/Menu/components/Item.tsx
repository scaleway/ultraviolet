'use client'

import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { cn } from '@ultraviolet/utils'
import { forwardRef, useCallback } from 'react'

import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { getListItem } from '../helpers'
import { useDisclosureContext, useMenu } from '../MenuProvider'
import { menuStyle } from '../styles.css'

import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'

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

const focusFistElement = (
  firstElementInNestedMenu: HTMLAnchorElement | HTMLButtonElement,
) => {
  if (['BUTTON', 'A'].includes(firstElementInNestedMenu.tagName)) {
    ;(firstElementInNestedMenu as HTMLElement).focus()
  } else if (firstElementInNestedMenu.firstChild instanceof HTMLElement) {
    // Another nested menu
    firstElementInNestedMenu.firstChild.focus()
  }
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
    const {
      hideOnClickItem,
      setIsVisible,
      isVisible,
      menuRef,
      isNested,
      parentDisclosureRef,
      disclosureRef,
    } = useMenu()
    const isDisclosure = useDisclosureContext()

    const onClickHandle = useCallback(
      (event: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          return undefined
        }
        onClick?.(event)
        if (hideOnClickItem || hideOnClick) {
          setIsVisible(false)
        }

        return undefined
      },
      [disabled, hideOnClickItem, hideOnClick, onClick, setIsVisible],
    )

    const handleKeyDown = (
      event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      if (isDisclosure && ['Enter', ' ', 'ArrowRight'].includes(event.key)) {
        disclosureRef?.current?.click()
        setTimeout(() => {
          if (menuRef.current?.children) {
            const listItem = getListItem([
              ...menuRef.current.children[0].children[0].children,
            ])
            if (listItem[0]) {
              focusFistElement(listItem[0])
            }
          }
        }, 50)
      } else if (
        event.key === 'ArrowLeft' &&
        isNested &&
        ((isDisclosure &&
          parentDisclosureRef?.current?.dataset['isMenuItem']) ||
          !isDisclosure) &&
        parentDisclosureRef?.current
      ) {
        // Focus the disclosure in the parent menu & close the nested menu
        // When the item is a disclosure, we must click the parent disclosure (since disclosureRef is the Item itself)
        ;(isDisclosure ? parentDisclosureRef : disclosureRef).current?.click()
      }
    }

    if (href && !disabled) {
      return (
        <div
          className={menuStyle.itemContainer({ borderless })}
          data-search-text={searchText}
          style={style}
        >
          <Tooltip text={tooltip}>
            <a
              className={cn(
                className,
                menuStyle.item({ borderless: true, disabled, sentiment }),
              )}
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
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  {children}
                  {rightComponent ? (
                    <div
                      onClick={event => {
                        event.stopPropagation()
                        event.preventDefault()
                      }}
                      onKeyDown={event => {
                        event.stopPropagation()
                        event.preventDefault()
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
      <div
        className={menuStyle.itemContainer({ borderless })}
        data-search-text={searchText}
        style={style}
      >
        <Tooltip text={tooltip}>
          <button
            className={cn(
              className,
              menuStyle.item({ borderless, disabled, sentiment }),
            )}
            data-active={active || (isVisible && isDisclosure)}
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
                setIsVisible(false)
              }
            }}
            onKeyDown={handleKeyDown}
            // oxlint-disable-next-line typescript/no-unsafe-type-assertion
            ref={ref as Ref<HTMLButtonElement>}
            role="menuitem"
            type="button"
          >
            {isDisclosure || rightComponent ? (
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                {children}
                {rightComponent ? (
                  <div
                    onClick={event => {
                      event.stopPropagation()
                      event.preventDefault()
                    }}
                    onKeyDown={event => {
                      event.stopPropagation()
                      event.preventDefault()
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
