import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Popup } from '../../internalComponents'
import { Stack } from '../Stack'
import Item from './Item'

type PopoverStateReturn = any
export type DisclosureProps = Partial<PopoverStateReturn>

type DisclosureElement =
  | ((
      popover: Partial<PopoverStateReturn>,
    ) => ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>)
  | (ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> & {
      ref?: Ref<HTMLButtonElement>
    })

const StyledPopup = styled(Popup)`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  box-shadow: ${({ theme }) => theme.shadows.menu};
  padding: 0;

  &[data-has-arrow='true'] {
    &::after {
      border-color: ${({ theme }) => theme.colors.neutral.background}
        transparent transparent transparent;
    }
  }
`

type MenuProps = {
  id?: string
  ariaLabel?: string
  placement?: ComponentProps<typeof Popup>['placement']
  children?: ((props: PopoverStateReturn) => ReactNode) | ReactNode
  className?: string
  disclosure: DisclosureElement
  hasArrow?: boolean
  visible?: boolean
  'data-testid'?: string
}

const MenuList = styled(Stack)`
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
  color: ${({ theme }) => theme.colors.neutral.text};
  border-radius: ${({ theme }) => theme.radii.default};
  position: relative;
`

const FwdMenu = forwardRef(
  (
    {
      id,
      ariaLabel = 'Menu',
      children,
      disclosure,
      hasArrow = true,
      placement = 'bottom',
      visible = false,
      className,
      'data-testid': dataTestId,
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const [isVisible, setIsVisible] = useState(visible)
    const popupRef = useRef<HTMLDivElement>(null)
    const tempId = useId()
    const finalId = `menu-${id ?? tempId}`

    // if you need dialog inside your component, use function, otherwise component is fine
    const target = isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(
      disclosure,
    )
      ? disclosure
      : disclosure({})
    const innerRef = useRef(target as unknown as HTMLButtonElement)
    useImperativeHandle(ref, () => innerRef.current)

    const toggleVisible = () => {
      setIsVisible(!isVisible)

      if (!isVisible) {
        // We have to wait for the popup to be inserted in the DOM
        requestIdleCallback(() => {
          // @ts-expect-error to fix
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          popupRef.current?.firstChild?.firstChild?.focus()
        })
      }
    }

    const finalDisclosure = cloneElement(target, {
      onClick: toggleVisible,
      'aria-haspopup': 'dialog',
      'aria-expanded': isVisible,
      'aria-controls': finalId,
    })

    return (
      <StyledPopup
        aria-label={ariaLabel}
        className={className}
        visible={isVisible}
        placement={placement}
        hasArrow={hasArrow}
        data-has-arrow={hasArrow}
        role="dialog"
        id={finalId}
        ref={popupRef}
        tabIndex={-1}
        text={
          <MenuList data-testid={dataTestId} className={className} role="menu">
            {typeof children === 'function' ? children({}) : children}
          </MenuList>
        }
      >
        {finalDisclosure}
      </StyledPopup>
    )
  },
)

export const MenuV2 = Object.assign(FwdMenu, { Item })
