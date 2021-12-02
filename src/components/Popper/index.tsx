import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  RefObject,
  isValidElement,
  memo,
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
import { Color } from '../../theme/colors'

const buildVariant =
  ({
    bgColor,
    color,
    fill,
    shadow,
  }: {
    bgColor: string
    color: string
    fill: string
    shadow: string
  }) =>
  ({ theme }: { theme: Theme }) =>
    css`
      background-color: ${theme.colorsDeprecated[bgColor as Color] ?? bgColor};
      color: ${theme.colorsDeprecated[color as Color] ?? color};
      fill: ${theme.colorsDeprecated[fill as Color] ?? fill};
      box-shadow: 0 2px 5px 5px
        ${transparentize(
          0.7,
          theme.colorsDeprecated[shadow as Color] ?? shadow,
        )};
    `
const variants = {
  black: buildVariant({
    bgColor: 'black',
    color: 'white',
    fill: 'black',
    shadow: 'shadow',
  }),
  white: buildVariant({
    bgColor: 'white',
    color: 'black',
    fill: 'white',
    shadow: 'shadow',
  }),
} as const

type PopoverVariant = keyof typeof variants

export const popperVariants = Object.keys(variants) as PopoverVariant[]

const variantStyles = ({
  variant,
}: {
  theme: Theme
  variant: PopoverVariant
}) => variants[variant] ?? undefined

export type DisclosureParam =
  | ((popover?: Partial<PopoverStateReturn>) => ReactElement)
  | ReactElement

type DisclosureProps = {
  disclosure: DisclosureParam
  popover: Partial<PopoverStateReturn>
}

const Disclosure = ({ disclosure, popover }: DisclosureProps): JSX.Element => {
  // if you need dialog inside your component, use function, otherwise component is fine
  const target = isValidElement(disclosure) ? disclosure : disclosure(popover)
  const innerRef = useRef(target) as unknown as RefObject<HTMLButtonElement>

  return (
    <PopoverDisclosure {...popover} ref={innerRef}>
      {disclosureProps => React.cloneElement(target, disclosureProps)}
    </PopoverDisclosure>
  )
}

Disclosure.propTypes = {
  disclosure: PropTypes.func.isRequired,
  popover: PropTypes.shape({}).isRequired,
}

const MemoDisclosure = memo(Disclosure)

const StyledPopover = styled(Popover, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<{ variant: PopoverVariant; name?: string }>`
  border-radius: 4px;
  ${variantStyles}
`

export type PopperProps = Partial<PopoverProps> &
  Partial<Pick<PopoverStateReturn, 'placement'>> & {
    backgroundColor?: string
    disclosure: DisclosureParam
    hasArrow?: boolean
    variant?: PopoverVariant
    name?: string
    children?: ((popover: PopoverStateReturn) => ReactNode) | ReactNode
  }

const Popper: FunctionComponent<PopperProps> = ({
  animated = 100,
  backgroundColor,
  baseId = '',
  children,
  disclosure,
  hasArrow = true,
  hideOnClickOutside = true,
  modal = true,
  name,
  placement = 'auto',
  preventBodyScroll = false,
  variant = 'white',
  visible = false,
  ...props
}) => {
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
        <MemoDisclosure popover={popover} disclosure={disclosure} />
      )}
      <StyledPopover
        name={name}
        aria-label={name}
        variant={variant}
        hideOnClickOutside={hideOnClickOutside}
        preventBodyScroll={preventBodyScroll}
        {...popover}
        {...props}
      >
        {hasArrow && (
          <PopoverArrow {...popover} style={{ fill: backgroundColor }} />
        )}
        {typeof children === 'function' ? children({ ...popover }) : children}
      </StyledPopover>
    </>
  )
}

Popper.propTypes = {
  animated: PropTypes.number,
  backgroundColor: PropTypes.string,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  disclosure: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  /**
   * Determine if an arrow is added on the direction of main content.
   */
  hasArrow: PropTypes.bool,
  hideOnClickOutside: PropTypes.bool,
  modal: PropTypes.bool,
  name: PropTypes.string,
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  /**
   * Block main content / body scroll when popper is opened.
   */
  preventBodyScroll: PropTypes.bool,
  variant: PropTypes.oneOf<PopoverVariant>(
    Object.keys(variants) as PopoverVariant[],
  ),
  visible: PropTypes.bool,
}

const MemoPopper = memo(Popper)

export default MemoPopper
