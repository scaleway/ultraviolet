'use client'

import { ArrowRightIcon } from '@ultraviolet/icons'
import type {
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useCallback } from 'react'
import { Stack } from '../../Stack'
import { Tooltip } from '../../Tooltip'
import { getListItem } from '../helpers'
import { useDisclosureContext, useMenu } from '../MenuProvider'
import { itemContainer, styledItem, styledLinkItem } from '../styles.css'

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
}

const Item = forwardRef<HTMLElement, ItemProps>(
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
        if (hideOnClickItem) {
          setIsVisible(false)
        }

        return undefined
      },
      [disabled, hideOnClickItem, onClick, setIsVisible],
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
            if (listItem) {
              const firstElementInNestedMenu = listItem[0]
              if (
                firstElementInNestedMenu &&
                ['BUTTON', 'A'].includes(firstElementInNestedMenu.tagName)
              ) {
                ;(firstElementInNestedMenu as HTMLElement).focus()
              } else if (
                firstElementInNestedMenu &&
                firstElementInNestedMenu.firstChild instanceof HTMLElement
              ) {
                // Another nested menu
                firstElementInNestedMenu.firstChild.focus()
              }
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
        <div className={itemContainer({ borderless })} data-search-text={searchText}>
          <Tooltip text={tooltip}>
            <a
              className={`${styledLinkItem({ sentiment, disabled })} ${className || ''}`.trim()}
              data-active={active}
              data-is-disclosure={isDisclosure}
              data-is-menu-item
              data-testid={dataTestId}
              href={href}
              onClick={onClickHandle}
              onKeyDown={handleKeyDown}
              ref={ref as Ref<HTMLAnchorElement>}
              rel={rel}
              role="menuitem"
              target={target}
            >
              {isDisclosure ? (
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  {children} <ArrowRightIcon />
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
      <div className={itemContainer({ borderless })} data-search-text={searchText}>
        <Tooltip text={tooltip}>
          <button
            className={`${styledItem({ sentiment, disabled })} ${className || ''}`.trim()}
            data-active={active || (isVisible && isDisclosure)}
            data-is-disclosure={isDisclosure}
            data-is-menu-item
            data-testid={dataTestId}
            disabled={disabled}
            onClick={event => {
              onClick?.(event)
              if (hideOnClickItem) {
                setIsVisible(false)
              }
            }}
            onKeyDown={handleKeyDown}
            ref={ref as Ref<HTMLButtonElement>}
            role="menuitem"
            type="button"
          >
            {isDisclosure ? (
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                {children} <ArrowRightIcon />
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

export default Item
