import styled from '@emotion/styled'
import {
  InputHTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
} from 'react'
import { Radio as ReakitRadio, RadioProps as ReakitRadioProps } from 'reakit'
import Icon from '../Icon'
import Typography from '../Typography'

const StyledIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.circle};
  fill: ${({ theme }) => theme.colors.neutral.textWeak};
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

  &[aria-disabled='false'] {
    cursor: pointer;
  }

  ${StyledRadio}[aria-checked="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledRadio}[aria-invalid="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  ${StyledRadio}:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledRadio}[aria-invalid="true"]:focus + ${StyledIcon} {
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
  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.textDisabled};
      .icon-background {
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
}: RadioProps) => {
  const onKeyDown: KeyboardEventHandler = useCallback(
    event => {
      if (event.key.charCodeAt(0) === 32) {
        onChange(event)
      }
    },
    [onChange],
  )

  return (
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
        onKeyDown={onKeyDown}
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
}

export default Radio
