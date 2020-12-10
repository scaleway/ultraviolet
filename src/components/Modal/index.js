import { css } from '@emotion/core'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog'
import { theme } from '../../theme'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Touchable } from '../Touchable'

const MODAL_SIZES = {
  large: 850,
  medium: 708,
  small: 616,
  xsmall: 360,
}

// const MODAL_POSITION = {
//   center: {},
//   right: {
//     margin: 0,
//     maxWidth: '400px',
//     marginLeft: 'auto',
//     height: '100%',
//   },
// }

const dialogStyles = ({ size, minHeight }) => css`
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.25rem;
  padding: 1em;
  max-height: calc(100vh - 56px);
  outline: 0px;
  border: 1px solid rgba(33, 33, 33, 0.25);
  color: rgb(33, 33, 33);
  z-index: 999;
  border-radius: 4px;
  border: 0;
  padding: 32px;
  box-shadow: 0 0 11px 19px ${transparentize(0.8, theme.shadow)};
  width: ${MODAL_SIZES[size || 'small']}px;
  min-height: ${minHeight ?? 'initial'};
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(-50%, -10%, 0) rotateX(90deg);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
`

const containerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 16px;
  right: 16px;
  left: 16px;
`

const Disclosure = memo(({ disclosure, dialog }) => {
  const innerRef = useRef(disclosure(dialog))
  return (
    <DialogDisclosure {...dialog} ref={innerRef} {...disclosure.props}>
      {disclosureProps =>
        React.cloneElement(disclosure(dialog), disclosureProps)
      }
    </DialogDisclosure>
  )
})

const Modal = ({
  animated,
  //   back,
  baseId,
  children,
  closable,
  disclosure,
  hideOnClickOutside,
  hideOnEsc,
  minHeight,
  modal,
  onClose,
  opened,
  preventBodyScroll,
  //   scrollable,
  size,
  //   variant,
}) => {
  const dialog = useDialogState({
    animated,
    baseId,
    modal,
    visible: opened,
  })
  useEffect(() => dialog.setVisible(opened), [opened])

  return (
    <>
      {disclosure && <Disclosure dialog={dialog} disclosure={disclosure} />}
      <Dialog
        aria-label="Welcome"
        css={dialogStyles({ size, minHeight })}
        hideOnClickOutside={hideOnClickOutside}
        hideOnEsc={hideOnEsc}
        preventBodyScroll={preventBodyScroll}
        {...dialog}
      >
        <div css={containerStyles}>
          <Button
            icon={<Icon name="chevron-left" size={12} color="primary" mr={1} />}
            variant="link"
            color="primary"
            // onClick={back}
          >
            back
          </Button>
          {closable && (
            <Touchable
              onClick={onClose || dialog.setVisible(false)}
              title="close"
              mb={0}
            >
              <Icon name="close" size={20} color="darkGrey" />
            </Touchable>
          )}
        </div>
        {children}
      </Dialog>
    </>
  )
}

Modal.propTypes = {
  animated: PropTypes.bool,
  opened: PropTypes.bool,
  closable: PropTypes.bool,
  modal: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(Object.keys(MODAL_SIZES)),
}

Modal.defaultProps = {
  animated: true,
  opened: false,
  modal: true,
  closable: true,
  size: 'small',
}

export { Modal }
