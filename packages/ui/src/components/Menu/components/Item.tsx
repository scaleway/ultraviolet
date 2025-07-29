'use client'

import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
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

type MenuItemSentiment = 'neutral' | 'primary' | 'danger'

const ANIMATION_DURATION = 200 // in ms

const itemCoreStyle = ({
  theme,
  sentiment,
  disabled,
}: {
  theme: Theme
  borderless: boolean
  sentiment: MenuItemSentiment
  disabled: boolean
}) => `
  display: flex;
  justify-content: start;
  text-align: left;
  align-items: center;
  min-height: ${theme.sizing['400']};
  max-height: ${theme.sizing['500']};
  font-size: ${theme.typography.bodySmall.fontSize};
  line-height: ${theme.typography.bodySmall.lineHeight};
  font-weight: inherit;
  padding: ${`${theme.space['0.5']} ${theme.space['1']}`};
  border: none;
  cursor: pointer;
  min-width: 6.875rem;
  width: 100%;
  border-radius: ${theme.radii.default};
  transition: background-color ${ANIMATION_DURATION}ms, color ${ANIMATION_DURATION}ms;

  color: ${theme.colors[sentiment][disabled ? 'textDisabled' : 'text']};
  svg {
    fill: ${theme.colors[sentiment][disabled ? 'textDisabled' : 'text']};
  }

  ${
    disabled
      ? `
        cursor: not-allowed;
      `
      : `
          &:hover,
          &:focus-visible, &[data-active='true'] {
            background-color: ${theme.colors[sentiment].backgroundHover};
            color: ${theme.colors[sentiment].textHover};
            svg {
              fill: ${theme.colors[sentiment].textHover};
            }
          }`
  }
`

const Container = styled('div', {
  shouldForwardProp: prop => !['borderless'].includes(prop),
})<{ borderless: boolean }>`
  ${({ theme, borderless }) =>
    borderless
      ? ''
      : `border-bottom: 1px solid ${theme.colors.neutral.border};`}
  padding: ${({ theme, borderless }) =>
    `${borderless ? theme.space['0.25'] : theme.space['0.5']} ${
      theme.space['0.5']
    }`};
  &:last-child {
    border: none;
  }
  width: 100%;
`

const StyledItem = styled('button', {
  shouldForwardProp: prop => !['borderless', 'sentiment'].includes(prop),
})<{
  borderless: boolean
  disabled: boolean
  sentiment: MenuItemSentiment
}>`
  ${({ theme, borderless, sentiment, disabled }) =>
    itemCoreStyle({ borderless, disabled, sentiment, theme })}
  background: none;
`

const StyledLinkItem = styled('a', {
  shouldForwardProp: prop => !['borderless', 'sentiment'].includes(prop),
})<{
  borderless: boolean
  disabled: boolean
  sentiment: MenuItemSentiment
}>`
  ${({ theme, borderless, sentiment, disabled }) =>
    itemCoreStyle({ borderless, disabled, sentiment, theme })}
  text-decoration: none;

  &:focus {
    text-decoration: none;
  }
`

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
        <Container borderless={borderless} data-search-text={searchText}>
          <Tooltip text={tooltip}>
            <StyledLinkItem
              borderless
              className={className}
              data-active={active}
              data-is-disclosure={isDisclosure}
              data-is-menu-item
              data-testid={dataTestId}
              disabled={disabled}
              href={href}
              onClick={onClickHandle}
              onKeyDown={handleKeyDown}
              ref={ref as Ref<HTMLAnchorElement>}
              rel={rel}
              role="menuitem"
              sentiment={sentiment}
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
            </StyledLinkItem>
          </Tooltip>
        </Container>
      )
    }

    return (
      <Container borderless={borderless} data-search-text={searchText}>
        <Tooltip text={tooltip}>
          <StyledItem
            borderless={borderless}
            className={className}
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
            sentiment={sentiment}
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
          </StyledItem>
        </Tooltip>
      </Container>
    )
  },
)

export default Item
