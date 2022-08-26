import styled from '@emotion/styled'
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react'
import { Radio as ReakitRadio, RadioProps as ReakitRadioProps } from 'reakit'
import { getUUID } from '../../utils'

const InnerCircleRing = styled.circle`
  fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`

const RadioMark = styled.circle``

const RadioMarkedIcon = () => (
  <g>
    <circle cx="12" cy="12" r="8" strokeWidth="2" />
    <InnerCircleRing cx="12" cy="12" r="6" />
    <RadioMark cx="12" cy="12" r="4" />
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
  & + ${StyledIcon} {
    ${RadioMark} {
      transform-origin: center;
      transition: 200ms transform ease-in-out;
      transform: scale(0);
    }
  }

  &[aria-checked='true'] + svg {
    ${RadioMark} {
      transform: scale(1);
    }
  }

  &[aria-checked='true'][aria-disabled='false'][aria-invalid='false']
    + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  &[aria-invalid='true'] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  &:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.text};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.primary.background};
    }
  }

  &[aria-invalid='true']:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.text};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }
`

const StyledRadioContainer = styled.label`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space['1']};

  &[aria-disabled='false'] {
    cursor: pointer;
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
  name?: string
  size?: number
  value: string | number
} & InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<ReakitRadioProps, 'onChange'>>

const Radio = forwardRef(
  (
    {
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
    }: RadioProps,
    ref: ForwardedRef<HTMLLabelElement>,
  ) => {
    const computedName = useMemo(() => {
      if (!name) return getUUID('radio')

      return name
    }, [name])

    return (
      <StyledRadioContainer
        as="label"
        aria-disabled={disabled}
        htmlFor={`${computedName}-${value}`}
        className={className}
        ref={ref}
      >
        <StyledRadio
          type="radio"
          aria-invalid={!!error}
          aria-checked={checked}
          aria-disabled={disabled}
          checked={checked}
          id={`${computedName}-${value}`}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          name={computedName}
          autoFocus={autoFocus}
        />
        <StyledIcon size={size} viewBox="0 0 24 24">
          <RadioMarkedIcon />
        </StyledIcon>
        {children}
      </StyledRadioContainer>
    )
  },
)

export default Radio
