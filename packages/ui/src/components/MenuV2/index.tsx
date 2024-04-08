import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  MouseEvent,
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
import { Popup } from '../Popup'
import { Stack } from '../Stack'
import Item from './Item'

const SIZES = {
  small: '180px',
  medium: '280px',
  large: '380px',
}

export type DisclosureProps = { visible: boolean }

type DisclosureElement =
  | ((
      disclosure: DisclosureProps,
    ) => ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>)
  | (ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> & {
      ref?: Ref<HTMLButtonElement>
    })

const StyledPopup = styled(Popup, {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: keyof typeof SIZES }>`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  box-shadow: ${({ theme }) => theme.shadows.menu};
  padding: 0;

  &[data-has-arrow='true'] {
    &::after {
      border-color: ${({ theme }) => theme.colors.neutral.background}
        transparent transparent transparent;
    }
  }

  width: ${({ size }) => SIZES[size]};
  max-width: none;
`

const MenuList = styled(Stack)`
  max-height: 480px;
  overflow-y: auto;
  overflow-x: hidden;
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

type ChildMenuProps = {
  toggle: () => void
}

type MenuProps = {
  id?: string
  ariaLabel?: string
  placement?: ComponentProps<typeof Popup>['placement']
  children?: ReactNode | (({ toggle }: ChildMenuProps) => ReactNode)
  className?: string
  disclosure: DisclosureElement
  hasArrow?: boolean
  visible?: boolean
  'data-testid'?: string
  maxHeight?: string
  /**
   * @deprecated: use `size` instead
   */
  maxWidth?: string
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
  size?: keyof typeof SIZES
}

const FwdMenu = forwardRef(
  (
    {
      id,
      ariaLabel = 'Menu',
      children,
      disclosure,
      hasArrow = false,
      placement = 'bottom',
      visible = false,
      className,
      'data-testid': dataTestId,
      maxHeight,
      maxWidth,
      portalTarget,
      size = 'small',
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const [isVisible, setIsVisible] = useState(visible)
    const popupRef = useRef<HTMLDivElement>(null)
    const disclosureRef = useRef<HTMLButtonElement>(null)
    const tempId = useId()
    const finalId = `menu-${id ?? tempId}`

    // if you need dialog inside your component, use function, otherwise component is fine
    const target = isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(
      disclosure,
    )
      ? disclosure
      : disclosure({ visible: isVisible })
    const innerRef = useRef(target as unknown as HTMLButtonElement)
    useImperativeHandle(ref, () => innerRef.current)

    const finalDisclosure = cloneElement(target, {
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        target.props.onClick?.(event)
        setIsVisible(!isVisible)
      },
      'aria-haspopup': 'dialog',
      'aria-expanded': isVisible,
      // @ts-expect-error not sure how to fix this
      ref: disclosureRef,
    })

    return (
      <StyledPopup
        needDebounce={false}
        hideOnClickOutside
        aria-label={ariaLabel}
        className={className}
        visible={isVisible}
        placement={placement}
        hasArrow={hasArrow}
        data-has-arrow={hasArrow}
        role="dialog"
        id={finalId}
        ref={popupRef}
        onClose={() => setIsVisible(false)}
        tabIndex={-1}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        size={size}
        text={
          <MenuList data-testid={dataTestId} className={className} role="menu">
            {typeof children === 'function'
              ? children({ toggle: () => setIsVisible(!isVisible) })
              : children}
          </MenuList>
        }
        portalTarget={portalTarget}
      >
        {finalDisclosure}
      </StyledPopup>
    )
  },
)

/**
 * A menu is a widget that offers a list of choices to the user, such as a set of actions or functions.
 * A menu is usually opened, or made visible, by activating a menu button, choosing an item in a menu that opens a
 * sub menu, or by invoking a command, such as `Shift + F10` on Windows, that opens a context specific menu.
 * When a user activates a choice in a menu, the menu usually closes unless the choice opened a submenu.
 */
export const MenuV2 = Object.assign(FwdMenu, { Item })
