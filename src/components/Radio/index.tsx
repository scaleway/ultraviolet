import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { InputHTMLAttributes, ReactNode } from 'react'
import { Radio as ReakitRadio } from 'reakit'
import Icon from '../Icon'
import Typography from '../Typography'

const StyledIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space['1']};
  margin-top: ${({ theme }) => theme.space['0.25']};
  border-radius: ${({ theme }) => theme.radii.circle};
  fill: ${({ theme }) => theme.colors.neutral.text};
`

const StyledRadio = styled(ReakitRadio, {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})`
  opacity: 0.01;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  cursor: pointer;
`

const StyledRadioContainer = styled(Typography)`
  position: relative;
  display: flex;
  align-items: flex-start;

  &[aria-disabled='false'] {
    cursor: pointer;
  }

  ${StyledRadio}[aria-checked="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledRadio}[aria-invalid="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.textDisabled} !important;
    }
  }

  ${StyledRadio}:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledRadio}[aria-invalid="true"]:focus  + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  :hover[aria-disabled='false'] {
    ${StyledRadio} + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.text};
    }

    ${StyledRadio}[aria-invalid="true"]  + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.danger.background};
      fill: ${({ theme }) => theme.colors.danger.text};
    }
  }
`

type RadioProps = {
  children: ReactNode
  error?: string | ReactNode
  name: string
  size?: number
  value: string | number
} & InputHTMLAttributes<HTMLInputElement>

const Radio = ({
  checked = false,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  name,
  value,
  size = 20,
  children,
  className,
  autoFocus,
}: RadioProps): JSX.Element => (
  <StyledRadioContainer
    as="label"
    aria-disabled={disabled}
    htmlFor={`${name}-${value}`}
    className={className}
  >
    <StyledRadio
      type="radio"
      aria-invalid={!!error}
      aria-checked={checked}
      checked={checked}
      id={`${name}-${value}`}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      name={name}
      autoFocus={autoFocus}
    />
    <StyledIcon
      name={checked ? 'radiobox-marked' : 'radiobox-blank'}
      size={size}
    />
    {children}
  </StyledRadioContainer>
)

Radio.propTypes = {
  checked: PropTypes.bool,
  /**
   * Component near the radio button
   */
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
