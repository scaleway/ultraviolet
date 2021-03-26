import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  useDialogState,
} from 'reakit/Dialog'
import { colors } from '../../theme'
import * as animations from '../../utils'
import Icon from '../Icon'
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
    margin: auto;
  `,
  'top-left': css`
    margin: auto;
    margin-left: 0;
    margin-top: 0;
  `,
  top: css`
    margin: auto;
    margin-top: 0px;
  `,
  'top-right': css`
    margin: auto;
    margin-right: 0;
    margin-top: 0;
  `,
  right: css`
    margin: auto;
    margin-right: 0;
  `,
  'bottom-right': css`
    margin: auto;
    margin-right: 0;
    margin-bottom: 0;
  `,
  bottom: css`
    margin: auto;
    margin-bottom: 0;
  `,
  'bottom-left': css`
    margin: auto;
    margin-left: 0;
    margin-bottom: 0;
  `,
  left: css`
    margin: auto;
    margin-left: 0;
  `,
}

const MODAL_ANNIMATION = {
  fold: {
    enter: animations.unfoldIn,
    leave: animations.unfoldOut,
  },
  zoom: {
    enter: animations.zoomIn,
    leave: animations.zoomOut,
  },
  scaleUp: {
    enter: animations.scaleUp,
    leave: animations.scaleDown,
  },
  scaleBack: {
    enter: animations.scaleForward,
    leave: animations.scaleBack,
  },
  sketch: {
    enter: animations.sketchIn,
    leave: animations.sketchOut,
  },
  slideTop: {
    enter: animations.slideFromTop,
    leave: animations.slideToTop,
  },
  slideBottom: {
    enter: animations.slideFromBottom,
    leave: animations.slideToBottom,
  },
  slideRight: {
    enter: animations.slideFromRight,
    leave: animations.slideToRight,
  },
  slideLeft: {
    enter: animations.slideFromLeft,
    leave: animations.slideToLeft,
  },
}

const backdropAnimatedStyle = css`
  opacity: 0;
  transition: opacity 250ms ease-in-out;
  &[data-enter] {
    opacity: 1;
    transition: opacity 250ms ease-in-out;
  }
  &[data-leave] {
    opacity: 0;
    transition: opacity 400ms ease-in-out;
  }
`

const dialogAnimatedStyle = ({ animation }) => css`
  opacity: 0;
  &[data-enter] {
    opacity: 1;
    transition: opacity 500ms ease-in-out;
    animation: ${MODAL_ANNIMATION[animation].enter} 500ms
      cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  &[data-leave] {
    opacity: 0;
    transition: opacity 500ms ease-in-out;
    animation: ${MODAL_ANNIMATION[animation].leave} 500ms
      cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
`

const backdropStyles = ({ animated }) => css`
  display: flex;
  position: fixed;
  overflow: auto;
  padding: 16px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  opacity: 1;
  background-color: ${transparentize(0.8, colors.gray700)};
  ${animated && backdropAnimatedStyle}
`

const dialogStyles = ({
  animated,
  animation,
  width,
  height,
  placement,
  bordered,
}) => css`
  background-color: ${colors.white};
  position: relative;
  border-radius: ${bordered ? 4 : 0}px;
  border: 0;
  padding: 32px;
  ${MODAL_PLACEMENT[placement]}
  width: ${MODAL_WIDTH[width]}px;
  min-height: ${height};
  box-shadow: 0 0 12px 18px ${transparentize(0.8, colors.shadow)};
  opacity: 1;
  &::before {
    content: '';
    height: 100%;
    width: 100%;
  }
  ${animated && dialogAnimatedStyle({ animation })}
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

Disclosure.propTypes = {
  disclosure: PropTypes.func.isRequired,
  dialog: PropTypes.shape({}).isRequired,
}

const Modal = memo(
  ({
    animated,
    animation,
    ariaLabel,
    baseId,
    bordered,
    children,
    customDialogBackdropStyles,
    customDialogStyles,
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

    const { setVisible } = dialog
    useEffect(() => setVisible(opened), [setVisible, opened])

    return (
      <>
        {disclosure && <Disclosure dialog={dialog} disclosure={disclosure} />}
        <DialogBackdrop
          {...dialog}
          css={[backdropStyles({ animated }), customDialogBackdropStyles]}
        >
          <Dialog
            aria-label={ariaLabel}
            role="dialog"
            css={[
              dialogStyles({
                animated,
                animation,
                bordered,
                height,
                placement,
                width,
              }),
              customDialogStyles,
            ]}
            hideOnClickOutside={hideOnClickOutside}
            hideOnEsc={hideOnEsc}
            preventBodyScroll={preventBodyScroll}
            {...dialog}
            hide={onClose || dialog.toggle}
          >
            <>
              <div css={containerStyles}>
                {isClosable && (
                  <Touchable
                    onClick={onClose || dialog.toggle}
                    alignSelf="center"
                    title="close"
                    mb={0}
                  >
                    <Icon name="close" size={20} color="gray550" />
                  </Touchable>
                )}
              </div>
              {dialog.visible &&
                (typeof children === 'function' ? children(dialog) : children)}
            </>
          </Dialog>
        </DialogBackdrop>
      </>
    )
  },
)

Modal.propTypes = {
  animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  animation: PropTypes.oneOf(Object.keys(MODAL_ANNIMATION)),
  ariaLabel: PropTypes.string,
  bordered: PropTypes.bool,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  customDialogBackdropStyles: PropTypes.shape({}),
  customDialogStyles: PropTypes.shape({}),
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
  animated: false,
  animation: 'zoom',
  ariaLabel: 'modal',
  bordered: true,
  baseId: 'modal',
  customDialogBackdropStyles: {},
  customDialogStyles: {},
  height: 'initial',
  hideOnClickOutside: true,
  hideOnEsc: true,
  isClosable: true,
  modal: true,
  opened: false,
  placement: 'center',
  preventBodyScroll: true,
  width: 'small',
  disclosure: undefined,
  onClose: undefined,
}

export default Modal
