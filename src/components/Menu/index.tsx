import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  ComponentProps,
  ReactElement,
  ReactNode,
  RefObject,
  WeakValidationMap,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
} from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverDisclosure,
  PopoverProps,
  PopoverStateReturn,
  usePopoverState,
} from 'reakit/Popover'
import Item from './Item'

type DisclosureParam =
  | ((popover?: Partial<PopoverStateReturn>) => ReactElement)
  | ReactElement

type DisclosureProps = {
  disclosure: DisclosureParam
  popover: Partial<PopoverStateReturn>
}

const PopperDisclosure = ({
  disclosure,
  popover,
}: DisclosureProps): JSX.Element => {
  // if you need dialog inside your component, use function, otherwise component is fine
  const target = isValidElement(disclosure) ? disclosure : disclosure(popover)
  const innerRef = useRef(target) as unknown as RefObject<HTMLButtonElement>

  return (
    <PopoverDisclosure {...popover} ref={innerRef}>
      {disclosureProps => cloneElement(target, disclosureProps)}
    </PopoverDisclosure>
  )
}

const StyledPopover = styled(Popover)<{ name?: string }>`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  color: ${({ theme }) => theme.colors.neutral.text};
  fill: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => theme.shadows.dropdown};
`

type PopperProps = Partial<PopoverProps> &
  Partial<Pick<PopoverStateReturn, 'placement'>> & {
    disclosure: DisclosureParam
    hasArrow?: boolean
    name?: string
    children?: ((popover: PopoverStateReturn) => ReactNode) | ReactNode
  }

const Popper = ({
  animated = 100,
  baseId = '',
  children,
  disclosure,
  hasArrow = true,
  hideOnClickOutside = true,
  modal = true,
  name,
  placement = 'auto',
  preventBodyScroll = false,
  visible = false,
  ...props
}: PopperProps) => {
  const popover = usePopoverState({
    animated,
    baseId,
    modal,
    placement,
    visible,
  })

  const { setVisible } = popover
  useEffect(() => setVisible(visible), [setVisible, visible])

  return (
    <>
      {disclosure && (
        <PopperDisclosure popover={popover} disclosure={disclosure} />
      )}
      <StyledPopover
        name={name}
        aria-label={name}
        hideOnClickOutside={hideOnClickOutside}
        preventBodyScroll={preventBodyScroll}
        animated={popover.animated}
        baseId={popover.baseId}
        modal={popover.modal}
        placement={placement}
        visible={popover.visible}
        {...props}
      >
        {hasArrow && <PopoverArrow {...popover} />}
        {typeof children === 'function' ? children(popover) : children}
      </StyledPopover>
    </>
  )
}

const bottomStyles = (theme: Theme) => css`
  box-shadow: ${theme.shadows.menu};
  &:after,
  &:before {
    bottom: 100%;
  }
  &:after {
    border-bottom-color: ${theme.colors.primary.borderStrong};
  }
  &:before {
    border-bottom-color: rgba(165, 165, 205, 0.4);
  }
`
const topStyles = (theme: Theme) => css`
  box-shadow: ${theme.shadows.menu};
  &:after,
  &:before {
    top: 100%;
  }
  &:after {
    border-top-color: ${theme.colors.primary.background};
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
  align: AlignStyle
  hasArrow: boolean
  placement: ArrowPlacement
}
export const arrowPlacements = Object.keys(
  arrowPlacementStyles,
) as ArrowPlacement[]

type AlignStyle = {
  left?: string | null
  right?: string | null
}

interface ChildrenProps {
  placement: ComponentProps<typeof Popper>['placement']
  toggle: () => void
  visible: boolean
}

type MenuProps = Omit<ComponentProps<typeof Popper>, 'children'> & {
  align?: AlignStyle
  ariaLabel?: string
  placement?: ArrowPlacement
  children?: ((props: ChildrenProps) => ReactNode) | ReactNode
  className?: string
}

type MenuType = ((props: MenuProps) => JSX.Element) & {
  Item: typeof Item
  propTypes: WeakValidationMap<MenuProps>
}

const MenuList = styled.div<MenuListProps>`
  &:after,
  &:before {
    left: ${({ align }) => align.left};
    right: ${({ align }) => align.right};

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
  border-radius: 4px;
  position: relative;
  ${({ placement, theme, hasArrow }) =>
    hasArrow && arrowPlacementStyles[placement]?.(theme)}
`

const Menu: MenuType = ({
  align = { left: '50%', right: 'inherit' },
  ariaLabel = 'menu',
  baseId = '',
  children,
  disclosure,
  hasArrow = true,
  modal = false,
  name = 'menu',
  placement = 'bottom',
  visible = false,
  className,
}) => (
  <Popper
    aria-label={ariaLabel}
    baseId={baseId}
    disclosure={disclosure}
    hasArrow={false}
    modal={modal}
    name={name}
    placement={placement}
    visible={visible}
    className={className}
  >
    {({ placement: localPlacement, toggle, visible: isOpen }) =>
      isOpen ? (
        <MenuList
          align={align}
          hasArrow={hasArrow}
          placement={localPlacement as ArrowPlacement}
          role="menu"
        >
          {typeof children === 'function'
            ? children({ placement: localPlacement, toggle, visible })
            : children}
        </MenuList>
      ) : null
    }
  </Popper>
)

Menu.propTypes = {
  align: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  ariaLabel: PropTypes.string,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  disclosure: PropTypes.func.isRequired,
  hasArrow: PropTypes.bool,
  modal: PropTypes.bool,
  name: PropTypes.string,
  placement: PropTypes.oneOf<ArrowPlacement>(arrowPlacements),
  visible: PropTypes.bool,
}

Menu.Item = Item

export default Menu
