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

const backdropAnimatedStyle = css`
  opacity: 0;
  &[data-enter] {
    opacity: 1;
    transition: opacity 100ms ease-in-out;
  }
  &[data-leave] {
    opacity: 0;
    transition: opacity 500ms ease-in-out;
  }
`

const dialogAnimatedStyle = css`
  opacity: 0;
  transition: opacity 300ms ease-in-out, transform 250ms ease-in-out;
  &[data-enter] {
    opacity: 1;
  }
  &[data-leave] {
    opacity: 0;
    transform: translateY(-500px);
  }
`

const backdropStyles = ({ animated }) => css`
  display: flex;
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  opacity: 1;
  background-color: ${transparentize(0.8, theme.gray700)};
  ${animated && backdropAnimatedStyle}
`

const dialogStyles = ({ animated, width, height, placement, bordered }) => css`
  background-color: ${theme.white};
  position: relative;
  border-radius: ${bordered ? 4 : 0}px;
  border: 0;
  padding: 32px;
  ${MODAL_PLACEMENT[placement]}
  width: ${MODAL_WIDTH[width]}px;
  min-height: ${height};
  box-shadow: 0 0 12px 18px ${transparentize(0.8, theme.shadow)};
  opacity: 1;
  &::before {
    content: '';
    height: 100%;
    width: 100%;
  }
  ${animated && dialogAnimatedStyle}
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
    ariaLabel,
    back,
    backContent,
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

    useEffect(() => dialog.setVisible(opened), [opened])

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
            {dialog.visible && (
              <>
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
                      onClick={onClose || dialog.toggle}
                      alignSelf="center"
                      title="close"
                      mb={0}
                    >
                      <Icon name="close" size={20} color="gray550" />
                    </Touchable>
                  )}
                </div>
                {typeof children === 'function' ? children(dialog) : children}
              </>
            )}
          </Dialog>
        </DialogBackdrop>
      </>
    )
  },
)

Modal.propTypes = {
  animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  ariaLabel: PropTypes.string,
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
  animated: false,
  ariaLabel: 'modal',
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
