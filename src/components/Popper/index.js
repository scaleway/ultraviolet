import PropTypes from 'prop-types'
import React from 'react'
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from 'reakit/Popover'
import { theme } from '../../theme'

const Popper = ({
  animated,
  backgroudColor,
  children,
  disclosure,
  hasArrow,
  hideOnClickOutside,
  modal,
  placement,
  visible,
  ...props
}) => {
  const popover = usePopoverState({
    animated,
    modal,
    placement,
    visible,
  })
  console.log('Popper', popover)
  return (
    <>
      {disclosure && (
        <PopoverDisclosure
          {...popover}
          ref={disclosure.ref}
          {...disclosure.props}
        >
          {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
        </PopoverDisclosure>
      )}
      <Popover
        style={{ backgroudColor }}
        hideOnClickOutside={hideOnClickOutside}
        {...popover}
        {...props}
      >
        {hasArrow && (
          <PopoverArrow {...popover} style={{ fill: backgroudColor }} />
        )}
        {children({ placement: popover?.placement })}
      </Popover>
    </>
  )
}

Popper.propTypes = {
  animated: PropTypes.number,
  backgroudColor: PropTypes.string,
  hasArrow: PropTypes.bool,
  hasDisclosure: PropTypes.bool,
  hideOnClickOutside: PropTypes.bool,
  modal: PropTypes.bool,
  visible: PropTypes.bool,
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
}

Popper.defaultProps = {
  animated: 200,
  backgroudColor: theme.white,
  hasArrow: true,
  hideOnClickOutside: true,
  modal: false,
  placement: 'bottom',
  visible: false,
}

export { Popper }
