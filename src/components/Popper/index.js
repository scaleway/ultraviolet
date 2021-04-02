import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverDisclosure,
  usePopoverState,
} from 'reakit/Popover'

const buildVariant = ({ bgColor, color, fill, shadow }) => ({ theme }) => css`
  background-color: ${theme.colors[bgColor] ?? bgColor};
  color: ${theme.colors[color] ?? color};
  fill: ${theme.colors[fill] ?? fill};
  box-shadow: 0 2px 5px 5px
    ${transparentize(0.7, theme.colors[shadow] ?? shadow)};
`
const variants = {
  white: buildVariant({
    bgColor: 'white',
    color: 'black',
    fill: 'white',
    shadow: 'shadow',
  }),
  black: buildVariant({
    bgColor: 'black',
    color: 'white',
    fill: 'black',
    shadow: 'shadow',
  }),
}

export const popperVariants = Object.keys(variants)

const variantStyles = ({ variant }) => variants[variant] ?? undefined

const Disclosure = memo(({ disclosure, popover }) => {
  const innerRef = useRef(disclosure(popover))

  return (
    <PopoverDisclosure {...popover} ref={innerRef} {...disclosure.props}>
      {disclosureProps =>
        React.cloneElement(disclosure(popover), disclosureProps)
      }
    </PopoverDisclosure>
  )
})

Disclosure.propTypes = {
  disclosure: PropTypes.func.isRequired,
  popover: PropTypes.shape({}),
}
Disclosure.defaultProps = {
  popover: {},
}

const StyledPopover = styled(Popover, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})`
  border-radius: 4px;
  ${variantStyles}
`
const Popper = memo(
  ({
    animated,
    backgroudColor,
    baseId,
    children,
    disclosure,
    hasArrow,
    hideOnClickOutside,
    modal,
    placement,
    preventBodyScroll,
    visible,
    variant,
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
        {disclosure && <Disclosure popover={popover} disclosure={disclosure} />}
        <StyledPopover
          variant={variant}
          hideOnClickOutside={hideOnClickOutside}
          preventBodyScroll={preventBodyScroll}
          {...popover}
          {...props}
        >
          {hasArrow && (
            <PopoverArrow {...popover} style={{ fill: backgroudColor }} />
          )}
          {typeof children === 'function' ? children({ ...popover }) : children}
        </StyledPopover>
      </>
    )
  },
)

Popper.propTypes = {
  animated: PropTypes.number,
  backgroudColor: PropTypes.string,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  disclosure: PropTypes.func,
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
  preventBodyScroll: PropTypes.bool,
  visible: PropTypes.bool,
  variant: PropTypes.oneOf(Object.keys(variants)),
}

Popper.defaultProps = {
  animated: 100,
  variant: 'white',
  baseId: '',
  hasArrow: true,
  hideOnClickOutside: true,
  modal: true,
  placement: 'auto',
  preventBodyScroll: false,
  visible: false,
  backgroudColor: undefined,
  disclosure: undefined,
}

export default Popper
