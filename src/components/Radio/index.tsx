import styled from '@emotion/styled'
import { InputHTMLAttributes, ReactNode } from 'react'
import { Radio as ReakitRadio, RadioProps as ReakitRadioProps } from 'reakit'
import Typography from '../Typography'

const InnerCircleRing = styled.circle`
  fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`
const RadioboxMarkedIcon = () => (
  <g>
    <circle cx="12" cy="12" r="8" strokeWidth="2" />
    <InnerCircleRing cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="4" />
  </g>
)
const RadioboxBlankIcon = () => (
  <g>
    <circle cx="12" cy="12" r="8" strokeWidth="2" />
    <InnerCircleRing cx="12" cy="12" r="6" />
  </g>
)

const StyledIcon = styled.svg<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  border-radius: ${({ theme }) => theme.radii.circle};
  fill: ${({ theme }) => theme.colors.neutral.textWeak};
  ${InnerCircleRing} {
    fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }
`

const StyledRadio = styled(ReakitRadio)`
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
  gap: ${({ theme }) => theme.space['1']};

  &[aria-disabled='false'] {
    cursor: pointer;
  }

  ${StyledRadio}[aria-checked='true'][aria-disabled='false'][aria-invalid='false']+ ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledRadio}[aria-invalid='true'] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  ${StyledRadio}:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.text};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.primary.background};
    }
  }

  ${StyledRadio}[aria-invalid='true']:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.text};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }

  :hover[aria-disabled='false'] {
    ${StyledRadio} + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.text};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.primary.background};
      }
    }

    ${StyledRadio}[aria-invalid='true']  + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.danger.background};
      fill: ${({ theme }) => theme.colors.danger.text};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.danger.background};
      }
    }
  }
  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.textDisabled};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.backgroundStrong};
      }
    }
  }
`

type RadioProps = {
  children: ReactNode
  error?: string | ReactNode
  checked?: boolean
  name: string
  size?: number
  value: string | number
} & InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<ReakitRadioProps, 'onChange'>>

const Radio = ({
  checked = false,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error,
  name,
  value,
  size = 24,
  children,
  className,
  autoFocus,
  onKeyDown,
}: RadioProps) => (
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
      aria-disabled={disabled}
      checked={checked}
      id={`${name}-${value}`}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      name={name}
      autoFocus={autoFocus}
    />
    <StyledIcon size={size}>
      {checked ? <RadioboxMarkedIcon /> : <RadioboxBlankIcon />}
    </StyledIcon>
    {children}
  </StyledRadioContainer>
)

export default Radio
