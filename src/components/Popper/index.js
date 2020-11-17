import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import {
  usePopoverState,
  Popover,
  PopoverDisclosure,
  PopoverArrow,
} from 'reakit/Popover'
import { theme } from '../../theme'

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
    ...props
  }) => {
    const popover = usePopoverState({
      baseId,
      animated,
      modal,
      placement,
      visible,
    })

    useEffect(() => popover.setVisible(visible), [visible])

    return (
      <>
        {disclosure && <Disclosure popover={popover} disclosure={disclosure} />}
        <Popover
          style={{ backgroudColor }}
          hideOnClickOutside={hideOnClickOutside}
          preventBodyScroll={preventBodyScroll}
          {...popover}
          {...props}
        >
          {hasArrow && (
            <PopoverArrow {...popover} style={{ fill: backgroudColor }} />
          )}
          {children({ ...popover })}
        </Popover>
      </>
    )
  },
)

Popper.propTypes = {
  animated: PropTypes.number,
  backgroudColor: PropTypes.string,
  baseId: PropTypes.string,
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
}

Popper.defaultProps = {
  animated: 200,
  backgroudColor: theme.white,
  baseId: '',
  hasArrow: true,
  hideOnClickOutside: true,
  modal: true,
  placement: 'bottom',
  preventBodyScroll: false,
  visible: false,
}

export { Popper }
