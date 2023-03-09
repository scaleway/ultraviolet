import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactElement, ReactNode, RefObject } from 'react'
import {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import type { DialogProps, DialogStateReturn } from 'reakit/Dialog'
import {
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  useDialogState,
} from 'reakit/Dialog'
import {
  scaleBack,
  scaleDown,
  scaleForward,
  scaleUp,
  sketchIn,
  sketchOut,
  slideFromBottom,
  slideFromLeft,
  slideFromRight,
  slideFromTop,
  slideToBottom,
  slideToLeft,
  slideToRight,
  slideToTop,
  unfoldIn,
  unfoldOut,
  zoomIn,
  zoomOut,
} from '../../utils'
import { Button } from '../Button'

export const MODAL_WIDTH = {
  large: 850,
  medium: 708,
  small: 616,
  xsmall: 400,
  xxsmall: 360,
}

type ModalWidth = keyof typeof MODAL_WIDTH

export const MODAL_PLACEMENT = {
  bottom: `
    margin: auto;
    margin-bottom: 0;
  `,
  'bottom-left': `
    margin: auto;
    margin-left: 0;
    margin-bottom: 0;
  `,
  'bottom-right': `
    margin: auto;
    margin-right: 0;
    margin-bottom: 0;
  `,
  center: `
    margin: auto;
  `,
  left: `
    margin: auto;
    margin-left: 0;
  `,
  right: `
    margin: auto;
    margin-right: 0;
  `,
  top: `
    margin: auto;
    margin-top: 0px;
  `,
  'top-left': `
    margin: auto;
    margin-left: 0;
    margin-top: 0;
  `,
  'top-right': `
    margin: auto;
    margin-right: 0;
    margin-top: 0;
  `,
}

type ModalPlacement = keyof typeof MODAL_PLACEMENT

export const MODAL_ANIMATION = {
  fold: {
    enter: unfoldIn,
    leave: unfoldOut,
  },
  scaleBack: {
    enter: scaleForward,
    leave: scaleBack,
  },
  scaleUp: {
    enter: scaleUp,
    leave: scaleDown,
  },
  sketch: {
    enter: sketchIn,
    leave: sketchOut,
  },
  slideBottom: {
    enter: slideFromBottom,
    leave: slideToBottom,
  },
  slideLeft: {
    enter: slideFromLeft,
    leave: slideToLeft,
  },
  slideRight: {
    enter: slideFromRight,
    leave: slideToRight,
  },
  slideTop: {
    enter: slideFromTop,
    leave: slideToTop,
  },
  zoom: {
    enter: zoomIn,
    leave: zoomOut,
  },
}

type ModalAnimation = keyof typeof MODAL_ANIMATION

const backdropAnimatedStyle = `
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

const dialogAnimatedStyle = ({
  animation,
}: {
  animation: ModalAnimation
}) => css`
  opacity: 0;
  &[data-enter] {
    opacity: 1;
    transition: opacity 500ms ease-in-out;
    animation: ${MODAL_ANIMATION[animation].enter} 500ms
      cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  &[data-leave] {
    opacity: 0;
    transition: opacity 500ms ease-in-out;
    animation: ${MODAL_ANIMATION[animation].leave} 500ms
      cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
`

type DisclosureParam =
  | ((dialog?: Partial<DialogStateReturn>) => ReactElement)
  | ReactElement

type DisclosureProps = {
  disclosure: DisclosureParam
  dialog: Partial<DialogStateReturn>
}
const Disclosure = ({ disclosure, dialog }: DisclosureProps) => {
  // if you need dialog inside your component, use function, otherwise component is fine
  const target = isValidElement(disclosure) ? disclosure : disclosure(dialog)
  const innerRef = useRef(target) as unknown as RefObject<HTMLButtonElement>

  return (
    // @ts-expect-error reakit types are invalid, no need to pass as something, default is div
    <DialogDisclosure {...dialog} ref={innerRef}>
      {disclosureProps => cloneElement(target, disclosureProps)}
    </DialogDisclosure>
  )
}

const MemoDisclosure = memo(Disclosure)

const StyledDialogBackdrop = styled(DialogBackdrop)`
  display: flex;
  position: fixed;
  overflow: auto;
  padding: 16px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
  ${({ animated }) => animated && backdropAnimatedStyle}
`

type StyledDialogProps = {
  animation: ModalAnimation
  placement: ModalPlacement
  bordered: boolean
  width: ModalWidth
  height: string
}

const StyledDialog = styled(Dialog, {
  shouldForwardProp: prop =>
    !['animation', 'placement', 'width', 'height', 'bordered'].includes(prop),
})<StyledDialogProps>`
  background-color: ${({ theme }) =>
    theme.colors.neutral.backgroundWeakElevated};
  position: relative;
  border-radius: ${({ bordered, theme }) =>
    bordered ? theme.radii.default : theme.radii.none};
  border: 0;
  padding: 32px;
  ${({ placement }) => MODAL_PLACEMENT[placement]}
  width: ${({ width }) => MODAL_WIDTH[width]}px;
  min-height: ${({ height }) => height};
  box-shadow: ${({ theme }) => theme.shadows.modal};
  opacity: 1;
  &::before {
    content: '';
    height: 100%;
    width: 100%;
  }
  ${({ animated, animation }) => animated && dialogAnimatedStyle({ animation })}
`

const StyledContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
  position: absolute;
  top: 16px;
  right: 16px;
  left: 16px;
`

type ModalProps = Partial<
  Pick<
    DialogProps,
    'animated' | 'id' | 'hideOnEsc' | 'hideOnClickOutside' | 'preventBodyScroll'
  >
> & {
  animation?: ModalAnimation
  ariaLabel?: string
  bordered?: boolean
  customDialogBackdropStyles?: JSX.IntrinsicAttributes['css']
  customDialogStyles?: JSX.IntrinsicAttributes['css']
  disclosure?: DisclosureParam
  height?: string
  isClosable?: boolean
  modal?: boolean
  onClose?: () => void
  onBeforeClose?: () => Promise<void> | void
  opened?: boolean
  placement?: ModalPlacement
  width?: ModalWidth
  children: ReactNode | ((args: DialogStateReturn) => ReactNode)
}

export const Modal = memo(
  ({
    animated = false,
    animation = 'zoom',
    ariaLabel = 'modal',
    id,
    bordered = true,
    children,
    customDialogBackdropStyles,
    customDialogStyles = {},
    disclosure,
    height = 'initial',
    hideOnClickOutside = true,
    hideOnEsc = true,
    isClosable = true,
    modal = true,
    onClose,
    onBeforeClose,
    opened = false,
    placement = 'center',
    preventBodyScroll = true,
    width = 'small',
  }: ModalProps) => {
    const dialog = useDialogState({
      animated,
      baseId: id,
      modal,
      visible: opened,
    })

    const { setVisible } = dialog
    useEffect(() => setVisible(opened), [setVisible, opened])

    const onCloseCallBack = useCallback(async () => {
      await onBeforeClose?.()
      dialog.toggle()
    }, [dialog, onBeforeClose])

    return (
      <>
        {disclosure && (
          <MemoDisclosure dialog={dialog} disclosure={disclosure} />
        )}
        <StyledDialogBackdrop {...dialog} css={customDialogBackdropStyles}>
          <StyledDialog
            aria-label={ariaLabel}
            role="dialog"
            animation={animation}
            bordered={bordered}
            height={height}
            placement={placement}
            width={width}
            css={customDialogStyles}
            hideOnClickOutside={hideOnClickOutside}
            hideOnEsc={hideOnEsc}
            preventBodyScroll={preventBodyScroll}
            {...dialog}
            hide={onClose || onCloseCallBack}
          >
            <>
              {dialog.visible &&
                (typeof children === 'function' ? children(dialog) : children)}
              <StyledContainer>
                {isClosable && (
                  <Button
                    onClick={onClose || onCloseCallBack}
                    title="close"
                    variant="transparent"
                    icon="close"
                    iconSize={20}
                    action
                  />
                )}
              </StyledContainer>
            </>
          </StyledDialog>
        </StyledDialogBackdrop>
      </>
    )
  },
)
