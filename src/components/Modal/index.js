import { css } from '@emotion/core'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  useDialogState,
} from 'reakit/Dialog'
import { theme } from '../../theme'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Touchable } from '../Touchable'

const MODAL_WIDTH = {
  large: 850,
  medium: 708,
  small: 616,
  xsmall: 400,
  xxsmall: 360,
}

const MODAL_PLACEMENT = {
  center: css`
    top: 50%;
    left: 50%;
    bottom: auto;
    right: auto;
    transform: translate3d(-50%, -50%, 0);
  `,
  'top-left': css`
    left: 0;
    bottom: auto;
    right: auto;
  `,
  top: css`
    top: 0;
    left: 45%;
    bottom: auto;
    right: auto;
    transform: translate3d(-45%, 0, 0);
  `,
  'top-right': css`
    top: 0;
    left: auto;
    bottom: auto;
    right: 0;
  `,
  right: css`
    top: 45%;
    left: auto;
    bottom: auto;
    right: 0;
    transform: translate3d(0, -45%, 0);
  `,
  'bottom-right': css`
    top: auto;
    left: auto;
    bottom: 0;
    right: 0;
  `,
  bottom: css`
    top: auto;
    left: 45%;
    right: auto;
    bottom: 0;
    transform: translate3d(-45%, 0, 0);
  `,
  'bottom-left': css`
    top: auto;
    right: auto;
    bottom: 0;
    left: 0;
  `,
  left: css`
    top: 45%;
    bottom: auto;
    right: auto;
    left: 0;
    transform: translate3d(0, -45%, 0);
  `,
}

const backdropStyles = css`
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  perspective: 800px;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  background-color: ${transparentize(0.8, theme.gray700)};
  &[data-enter] {
    opacity: 1;
  }
`

const dialogStyles = ({ width, height, placement, bordered }) => css`
  background-color: ${theme.white};
  position: fixed;
  border-radius: ${bordered ? 4 : 0}px;
  border: 0;
  padding: 32px;
  ${MODAL_PLACEMENT[placement]}
  width: ${MODAL_WIDTH[width]}px;
  min-height: ${height};
  box-shadow: 0 0 12px 18px ${transparentize(0.8, theme.shadow)};
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

const containerStyles = css`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
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

const Modal = memo(
  ({
    animated,
    arialabel,
    back,
    backContent,
    bordered,
    baseId,
    children,
    disclosure,
    height,
    hideOnClickOutside,
    hideOnEsc,
    isClosable,
    modal,
    onClose,
    opened,
    placement,
    preventBodyScroll,
    width,
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
        <DialogBackdrop {...dialog} css={backdropStyles}>
          <Dialog
            aria-label={arialabel}
            role="dialog"
            css={dialogStyles({ width, height, placement, bordered })}
            hideOnClickOutside={hideOnClickOutside}
            hideOnEsc={hideOnEsc}
            preventBodyScroll={preventBodyScroll}
            {...dialog}
            hide={onClose || dialog.toggle}
          >
            <div css={containerStyles}>
              {back && backContent && (
                <Button
                  icon={
                    <Icon
                      name="chevron-left"
                      size={12}
                      color="primary"
                      mr={1}
                    />
                  }
                  variant="link"
                  color="primary"
                  onClick={back}
                  mr="auto"
                  p={0}
                >
                  {backContent}
                </Button>
              )}
              {isClosable && (
                <Touchable
                  onClick={onClose || dialog.togle}
                  alignSelf="center"
                  title="close"
                  mb={0}
                >
                  <Icon name="close" size={20} color="darkGrey" />
                </Touchable>
              )}
            </div>
            {dialog.visible && typeof children === 'function'
              ? children(dialog)
              : children}
          </Dialog>
        </DialogBackdrop>
      </>
    )
  },
)

Modal.propTypes = {
  animated: PropTypes.bool,
  arialabel: PropTypes.string,
  back: PropTypes.func,
  backContent: PropTypes.node,
  bordered: PropTypes.bool,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  disclosure: PropTypes.func,
  height: PropTypes.string,
  hideOnClickOutside: PropTypes.bool,
  hideOnEsc: PropTypes.bool,
  isClosable: PropTypes.bool,
  modal: PropTypes.bool,
  onClose: PropTypes.func,
  opened: PropTypes.bool,
  placement: PropTypes.oneOf(Object.keys(MODAL_PLACEMENT)),
  preventBodyScroll: PropTypes.bool,
  width: PropTypes.oneOf(Object.keys(MODAL_WIDTH)),
}

Modal.defaultProps = {
  animated: true,
  arialabel: 'modal',
  backContent: 'Back',
  bordered: true,
  baseId: 'modal',
  height: 'initial',
  hideOnClickOutside: true,
  hideOnEsc: true,
  isClosable: true,
  modal: true,
  opened: false,
  placement: 'center',
  preventBodyScroll: true,
  width: 'small',
}

export { Modal, MODAL_WIDTH }
