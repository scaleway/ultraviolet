import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'
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

export type Sizes = 'small' | 'medium' | undefined

interface StepTitleProps {
  bulletText: string
  size?: Sizes
  disabled?: boolean
  keyPrefix?: string
  children: ReactNode
}

const StepTitle = ({
  bulletText,
  children,
  keyPrefix,
  size = 'medium',
  disabled = false,
}: StepTitleProps) => (
  <Step
    key={`${keyPrefix ? `${keyPrefix}-` : ''}step-${bulletText}`}
    disabled={disabled}
  >
    <Bullet
      text={bulletText}
      size={size}
      variant={disabled ? 'disabled' : 'default'}
    />
    <StyledDiv size={size}>{children}</StyledDiv>
  </Step>
)

StepTitle.propTypes = {
  bulletText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  /**
   * Add a prefix if you have multiple StepTitle in a same page.
   */
  keyPrefix: PropTypes.string,
  size: PropTypes.string,
}

export default StepTitle
