import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

export const Steps = styled.ul`
  list-style: none;
  padding-left: 16px;
  margin-top: 24px;
  text-align: left;
  font-size: 16px;
`

export const Step = styled('li', {
  shouldForwardProp: prop => !['disabled'].includes(prop.toString()),
})<{ disabled: boolean }>`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral.textWeak : theme.colors.neutral.textStrong};
`

export const Chip = styled('span', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})<{ size: Sizes }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  margin-right: ${({ theme, size }) =>
    size === 'medium' ? theme.space['1'] : theme.space['2']};
  text-align: center;
  font-weight: 600;
`

const StyledDiv = styled.div`
  width: 100%;
`

export type Sizes = 'medium' | 'large'

interface StepTitleProps {
  index: number
  size?: Sizes
  disabled?: boolean
  keyPrefix?: string
  children: ReactNode
}

const StepTitle = ({
  index,
  children,
  keyPrefix,
  size = 'medium',
  disabled = false,
}: StepTitleProps) => (
  <Step
    key={`${keyPrefix ? `${keyPrefix}-` : ''}step-${index}`}
    disabled={disabled}
  >
    <Chip size={size}>{`${index}`}</Chip>
    <StyledDiv>{children}</StyledDiv>
  </Step>
)

StepTitle.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  /**
   * Add a prefix if you have multiple StepTitle in a same page.
   */
  index: PropTypes.number.isRequired,
  keyPrefix: PropTypes.string,
  size: PropTypes.string,
}

export default StepTitle
