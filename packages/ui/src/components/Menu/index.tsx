import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactElement, ReactNode, Ref } from 'react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useRef,
} from 'react'
import type { PopoverStateReturn } from 'reakit/Popover'
import { Popover, PopoverDisclosure, usePopoverState } from 'reakit/Popover'
import { Portal } from 'reakit/Portal'
import Item from './Item'

export type DisclosureProps = Partial<PopoverStateReturn>

type DisclosureElement =
  | ((popover: Partial<PopoverStateReturn>) => ReactElement)
  | (ReactElement & { ref?: Ref<HTMLButtonElement> })

const StyledPopover = styled(Popover)`
  border-radius: ${({ theme }) => theme.radii.default};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
`

const bottomStyles = (theme: Theme) => css`
  box-shadow: ${theme.shadows.menu};
  &:after,
  &:before {
    bottom: 100%;
  }
  &:after {
    border-bottom-color: ${theme.colors.neutral.background};
  }
  &:before {
    border-bottom-color: transparent;
  }
`
const topStyles = (theme: Theme) => css`
  box-shadow: ${theme.shadows.menu};
  &:after,
  &:before {
    top: 100%;
  }
  &:after {
    border-top-color: ${theme.colors.neutral.background};
  }
  &:before {
    border-top-color: rgba(165, 165, 205, 0.4);
  }
`
const endStyles = css`
  &:after {
    margin-left: -9px;
    right: 24px;
  }
  &:before {
    margin-left: -11px;
    right: 24px;
  }
`
const startStyles = css`
  &:after {
    margin-right: -9px;
    left: 24px;
  }
  &:before {
    margin-right: -11px;
    left: 24px;
  }
`

const centerStyles = css`
  &:after,
  &:before {
    left: 50%;
    transform: translateX(-50%);
  }
`

const arrowPlacementStyles = {
  bottom: (theme: Theme) => css`
    ${centerStyles};
    ${bottomStyles(theme)};
  `,
  'bottom-end': (theme: Theme) => css`
    ${endStyles};
    ${bottomStyles(theme)};
  `,
  'bottom-start': (theme: Theme) => css`
    ${startStyles};
    ${bottomStyles(theme)};
  `,
  top: (theme: Theme) => css`
    ${centerStyles};
    ${topStyles(theme)};
  `,
  'top-end': (theme: Theme) => css`
    ${endStyles};
    ${topStyles(theme)};
  `,
  'top-start': (theme: Theme) => css`
    ${startStyles};
    ${topStyles(theme)};
  `,
} as const

type ArrowPlacement = keyof typeof arrowPlacementStyles
type MenuListProps = {
  hasArrow: boolean
  placement: ArrowPlacement
}
export const arrowPlacements = Object.keys(
  arrowPlacementStyles,
) as ArrowPlacement[]

type MenuProps = {
  ariaLabel?: string
  id?: string
  placement?: ArrowPlacement
  children?: ((props: PopoverStateReturn) => ReactNode) | ReactNode
  className?: string
  disclosure: DisclosureElement
  hasArrow?: boolean
  visible?: boolean
}

const MenuList = styled.div<MenuListProps>`
  &:after,
  &:before {
    border: solid transparent;
    border-width: 9px;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: transparent;
  }
  &:before {
    border-color: transparent;
  }
  background-color: ${({ theme }) =>
    theme.colors.neutral.backgroundWeakElevated};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral.text};
  border-radius: ${({ theme }) => theme.radii.default};
  position: relative;
  ${({ placement, theme, hasArrow }) =>
    hasArrow && arrowPlacementStyles[placement]?.(theme)}
`

const FwdMenu = forwardRef(
  (
    {
      ariaLabel = 'Menu',
      id,
      children,
      disclosure,
      hasArrow = true,
      placement = 'bottom',
      visible = false,
      className,
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const popover = usePopoverState({
      baseId: id,
      placement,
      visible,
    })

    // if you need dialog inside your component, use function, otherwise component is fine
    const target = isValidElement(disclosure) ? disclosure : disclosure(popover)
    const innerRef = useRef(target as unknown as HTMLButtonElement)
    useImperativeHandle(ref, () => innerRef.current)

    return (
      <>
        {disclosure && (
          // @ts-expect-error reakit types are invalid, no need to pass as something, default is div
          <PopoverDisclosure {...popover} ref={innerRef}>
            {disclosureProps => cloneElement(target, disclosureProps)}
          </PopoverDisclosure>
        )}
        <Portal>
          <StyledPopover
            {...popover}
            aria-label={ariaLabel}
            className={className}
          >
            {
              /* Required to avoid loading menu content if not visible */
              popover.visible ? (
                <MenuList
                  hasArrow={hasArrow}
                  placement={popover.placement as ArrowPlacement}
                  role="menu"
                >
                  {typeof children === 'function'
                    ? children(popover)
                    : children}
                </MenuList>
              ) : null
            }
          </StyledPopover>
        </Portal>
      </>
    )
  },
)

export const Menu = Object.assign(FwdMenu, { Item })
