import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { ReactElement, ReactNode, memo, useEffect, useRef } from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverDisclosure,
  PopoverProps,
  PopoverState,
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
      background-color: ${theme.colors[bgColor as Color] ?? bgColor};
      color: ${theme.colors[color as Color] ?? color};
      fill: ${theme.colors[fill as Color] ?? fill};
      box-shadow: 0 2px 5px 5px
        ${transparentize(0.7, theme.colors[shadow as Color] ?? shadow)};
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
}

type PopoverVariant = keyof typeof variants

export const popperVariants = Object.keys(variants)

const variantStyles = ({
  variant,
}: {
  theme: Theme
  variant: PopoverVariant
}) => variants[variant] ?? undefined

type DisclosureProps = {
  disclosure: (popover?: Partial<PopoverStateReturn>) => ReactElement
  popover: Partial<PopoverStateReturn>
}

const Disclosure: React.VoidFunctionComponent<DisclosureProps> = ({
  disclosure,
  popover,
}) => {
  const innerRef = useRef(
    disclosure(popover),
  ) as unknown as React.RefObject<HTMLButtonElement>

  return (
    <PopoverDisclosure {...popover} ref={innerRef}>
      {disclosureProps =>
        React.cloneElement(disclosure(popover), disclosureProps)
      }
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
})<{ variant: PopoverVariant }>`
  border-radius: 4px;
  ${variantStyles}
`

type PopperProps = Partial<PopoverProps> &
  Partial<Pick<PopoverState, 'placement'>> & {
    backgroundColor?: string
    disclosure: (popover?: Partial<PopoverStateReturn>) => ReactElement
    hasArrow?: boolean
    variant?: PopoverVariant
  }

const Popper: React.FunctionComponent<PopperProps> = ({
  animated = 100,
  backgroundColor,
  baseId = '',
  children,
  disclosure,
  hasArrow = true,
  hideOnClickOutside = true,
  modal = true,
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
  disclosure: PropTypes.func.isRequired,
  /**
   * Determine if an arrow is added on the direction of main content.
   */
  hasArrow: PropTypes.bool,
  hideOnClickOutside: PropTypes.bool,
  modal: PropTypes.bool,
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
  variant: PropTypes.oneOf(Object.keys(variants) as [PopoverVariant]),
  visible: PropTypes.bool,
}

const MemoPopper = memo(Popper)

export default MemoPopper
