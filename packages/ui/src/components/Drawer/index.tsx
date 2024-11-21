import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { type ComponentProps } from 'react'
import { Modal, type ModalProps } from '../Modal'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'
import './style.css'

export const SIZES = {
  small: 356,
  medium: 783,
  large: 1209,
}
const slideIn = (translation: number) => keyframes`
  from {
    transform: translateX(${translation}px);
  }
  to {
    transform: translateX(0);
  }
 `

const slideAnimation = (size: 'small' | 'medium' | 'large') => {
  if (size === 'small') return css`animation: ${slideIn(300)} linear 150ms;`
  if (size === 'medium') return css`animation: ${slideIn(500)} linear 250ms;`

  return css`animation: ${slideIn(1000)} linear 400ms;`
}

const StyledModal = styled(Modal)`
  margin-right: 0;
  height: 100%;
  border-radius: 0;
  padding: ${({ theme }) => theme.space[2]} ;

  &[data-size="small"]{
    width: ${SIZES.small}px;
    ${slideAnimation('small')}
  }

  &[data-size="medium"]{
    width: ${SIZES.medium}px;
    ${slideAnimation('medium')}
  }

  &[data-size="large"]{
    width: ${SIZES.large}px;
    ${slideAnimation('large')}
  }
`
const CustomStack = styled(Stack)`
  height: 100%;
`

const ChildrenContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
`

type DrawerProps = Pick<
  ComponentProps<typeof Modal>,
  | 'ariaLabel'
  | 'children'
  | 'className'
  | 'data-testid'
  | 'disclosure'
  | 'hideOnClickOutside'
  | 'hideOnEsc'
  | 'id'
  | 'onClose'
  | 'open'
  | 'placement'
> & {
  title: string
  size?: keyof typeof SIZES
  /**
   * Fixed info at the bottom of the
   */
  footer?: ModalProps['children']
}

export const Drawer = ({
  size = 'medium',
  onClose,
  open = false,
  title,
  footer,
  disclosure,
  children,
  ariaLabel,
  className,
  'data-testid': dataTestId,
  hideOnClickOutside,
  hideOnEsc,
  id,
}: DrawerProps) => (
  <StyledModal
    disclosure={disclosure}
    size={size}
    onClose={onClose}
    open={open}
    ariaLabel={ariaLabel}
    className={className}
    data-testid={dataTestId}
    hideOnClickOutside={hideOnClickOutside}
    hideOnEsc={hideOnEsc}
    id={id}
    data-size={size}
    placement="top-right"
    backdropClassName="backdrop-drawer"
  >
    {modalProps => (
      <CustomStack gap={2}>
        <Text
          as="h2"
          variant="headingSmallStrong"
          sentiment="neutral"
          prominence="default"
        >
          {title}
        </Text>
        <Separator />
        <ChildrenContainer>
          {typeof children === 'function' ? children(modalProps) : children}
        </ChildrenContainer>
        {typeof footer === 'function' ? footer(modalProps) : footer}
      </CustomStack>
    )}
  </StyledModal>
)
