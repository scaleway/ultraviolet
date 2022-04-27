import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ComponentProps, ReactNode } from 'react'
import Bullet from '../Bullet'

export const Step = styled('div', {
  shouldForwardProp: prop => !['disabled'].includes(prop.toString()),
})<{ disabled: boolean }>`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral.textWeak : theme.colors.neutral.textStrong};
`

const StyledDiv = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})<{ size: Sizes }>`
  flex: 1;
  margin-left: ${({ theme, size }) =>
    size === 'medium' ? theme.space['2'] : theme.space['1']};
  font-size: ${({ size }) => (size === 'medium' ? '24px' : '16px')};
`

export type Sizes = 'small' | 'medium'

type ContentProps =
  | { bulletIcon: ComponentProps<typeof Bullet>['icon']; bulletText?: never }
  | { bulletIcon?: never; bulletText: string }

type StepTitleProps = {
  variant?: ComponentProps<typeof Bullet>['variant']
  size?: Sizes
  disabled?: boolean
  children: ReactNode
} & ContentProps

const StepTitle = ({
  bulletText,
  bulletIcon,
  variant,
  children,
  size = 'medium',
  disabled = false,
}: StepTitleProps) => (
  <Step disabled={disabled}>
    {bulletIcon ? (
      <Bullet
        icon={bulletIcon}
        size={size}
        variant={disabled ? 'disabled' : variant}
      />
    ) : null}
    {bulletText ? (
      <Bullet
        text={bulletText}
        size={size}
        variant={disabled ? 'disabled' : variant}
      />
    ) : null}
    <StyledDiv size={size}>{children}</StyledDiv>
  </Step>
)

StepTitle.propTypes = {
  bulletIcon: PropTypes.string,
  bulletText: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
}

export default StepTitle
