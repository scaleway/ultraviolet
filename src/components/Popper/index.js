import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverDisclosure,
  usePopoverState,
} from 'reakit/Popover'
import { colors } from '../../theme'

const variants = {
  white: css`
    background-color: ${colors.white};
    color: ${colors.black};
    fill: ${colors.white};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, colors.shadow)};
  `,
  black: css`
    background-color: ${colors.black};
    color: ${colors.white};
    fill: ${colors.black};
    box-shadow: 0 2px 5px 5px ${transparentize(0.7, colors.shadow)};
  `,
}
const popoverStyle = css`
  border-radius: 4px;
`

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

    useEffect(() => popover.setVisible(visible), [popover, visible])

    return (
      <>
        {disclosure && <Disclosure popover={popover} disclosure={disclosure} />}
        <Popover
          css={[popoverStyle, variants[variant]]}
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

export { Popper }
