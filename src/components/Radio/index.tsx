import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import { Radio as ReakitRadio } from 'reakit'
import Box from '../Box'
import Icon from '../Icon'

const StyledIcon = styled(Icon)``

const IconContainer = styled(Box)`
  min-width: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const disabledClass = ({ theme }: { theme: Theme }) => css`
  color: ${theme.colors.gray300};
  cursor: not-allowed;
`

const activeFocusClass = ({ theme }: { theme: Theme }) => css`
  :hover,
  :focus {
    ${IconContainer} {
      background-color: ${transparentize(0.75, theme.colors.gray300)};
      border-radius: 50%;

      > ${StyledIcon} {
        fill: ${theme.colors.primary};
      }
    }
  }
`

const StyledBox = styled(Box)<{ disabled: boolean; htmlFor: string }>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  height: 32px;
  cursor: pointer;

  ${({ disabled }) => (disabled ? disabledClass : activeFocusClass)}
`

const StyledRadio = styled(ReakitRadio)`
  position: absolute;
  opacity: 0.01;
`

type Props = {
  checked?: boolean
  children: React.ReactNode
  disabled?: boolean
  name: string
  onBlur?(...args: unknown[]): unknown
  onChange?(...args: unknown[]): unknown
  onFocus?(...args: unknown[]): unknown
  size?: number
  value: string | number
} & XStyledProps

const Radio: FunctionComponent<Props> = ({
  checked,
  onChange = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
  disabled = false,
  name,
  value,
  size = 24,
  children,
  ...props
}) => (
  <StyledBox
    as="label"
    htmlFor={`${name}-${value}`}
    disabled={disabled ?? false}
    {...props}
  >
    <IconContainer>
      <StyledIcon
        name={checked ? 'radiobox-marked' : 'radiobox-blank'}
        color={checked ? 'primary' : 'gray300'}
        size={size}
      />
    </IconContainer>
    {children}
    <StyledRadio
      type="radio"
      aria-checked={checked}
      id={`${name}-${value}`}
      checked={checked}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      name={name}
    />
  </StyledBox>
)

Radio.propTypes = {
  checked: PropTypes.bool,
  /**
   * Component near the radio button
   */
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  /**
   * Size of the button
   */
  size: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Radio
