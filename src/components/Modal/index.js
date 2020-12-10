import { css } from '@emotion/core'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import {
  useDialogState,
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
} from 'reakit/Dialog'
import { theme } from '../../theme'

const MODAL_SIZES = {
  large: 850,
  medium: 708,
  small: 616,
  xsmall: 360,
}

const backdropStyles = css`
  // perspective: 800px;
  overflow-x: auto;
  background-color: ${transparentize(0.6, theme.gray700)};
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

const dialogStyles = css`
  border-radius: 4px;
  border: 0;
  padding: 32px;
  box-shadow: 0 0 11px 19px ${transparentize(0.8, theme.shadow)};
  width: ${({ size }) => MODAL_SIZES[size || 'small']}px;
  min-height: ${p => (p.minHeight ? p.minHeight : 'initial')};
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: translate3d(-50%, -10%, 0) rotateX(90deg);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(-50%, 0, 0);
  }
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
  back,
  baseId,
  children,
  closable,
  dialogProps,
  disclosure,
  hideOnClickOutside,
  hideOnEsc,
  preventBodyScroll,
  modal,
  minHeight,
  onClose,
  opened,
  scrollable,
  size,
  variant,
  ...props
}) => {
  const dialog = useDialogState({
    animated,
    baseId,
    modal,
    visible: opened,
  })
  console.log(dialog, props)
  useEffect(() => dialog.setVisible(opened), [opened])
  return (
    <>
      {disclosure && <Disclosure dialog={dialog} disclosure={disclosure} />}
      <DialogBackdrop {...dialog} css={backdropStyles}>
        <Dialog
          hideOnClickOutside={hideOnClickOutside}
          hideOnEsc={hideOnEsc}
          preventBodyScroll={preventBodyScroll}
          aria-label="Welcome"
          css={dialogStyles}
          {...dialog}
        >
          <div>{children}</div>
        </Dialog>
      </DialogBackdrop>
    </>
  )
}

Modal.propTypes = {
  animated: PropTypes.bool,
  opened: PropTypes.bool,
  modal: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  animated: true,
  opened: false,
  modal: true,
  //   closable: true,
}

export { Modal }
