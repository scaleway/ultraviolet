import styled from '@emotion/styled'
import type { ForwardedRef, InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const SIZE = 24

const InnerCircleRing = styled.circle``
const RadioMark = styled.circle``

export const RadioStack = styled(Stack)``

const RadioMarkedIcon = () => (
  <g>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <InnerCircleRing cx="12" cy="12" r="8" />
    <RadioMark cx="12" cy="12" r="5" />
  </g>
)

const Ring = styled.svg`
  height: ${SIZE}px;
  width: ${SIZE}px;
  min-width: ${SIZE}px;
  min-height: ${SIZE}px;
  border-radius: ${({ theme }) => theme.radii.circle};
  fill: ${({ theme }) => theme.colors.neutral.border};
  ${InnerCircleRing} {
    fill: ${({ theme }) => theme.colors.neutral.background};
  }
`

const RadioInput = styled.input`
  cursor: pointer;
  position: absolute;
  height: ${SIZE}px;
  width: ${SIZE}px;
  opacity: 0;
  white-space: nowrap;
  border-width: 0;
  & + ${Ring} {
    ${RadioMark} {
      transform-origin: center;
      transition: 200ms transform ease-in-out;
      transform: scale(0);
    }
  }

  &:checked + svg {
    ${RadioMark} {
      transform: scale(1);
    }
  }

  &:checked[aria-disabled='false'][aria-invalid='false'] + ${Ring} {
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
  }

  &:checked[aria-disabled='true'][aria-invalid='false'] + ${Ring} {
    fill: ${({ theme }) => theme.colors.primary.borderDisabled};
  }

  &[aria-invalid='true']:not([aria-disabled='true']) + ${Ring} {
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};
  }

  &[aria-disabled='false']:active + ${Ring} {
    background-color: #5e127e40;
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.primary.background};
    }
  }

  &[aria-disabled='false']:focus-visible + ${Ring} {
    outline: -webkit-focus-ring-color auto 1px;
  }

  &[aria-invalid='true']:focus + ${Ring} {
    background-color: #f91b6c40;
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }
`

const RadioContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space['1']};

  &[aria-disabled='false'],
  &[aria-disabled='false'] > label {
    cursor: pointer;
  }

  :hover[aria-disabled='false'] {
    ${RadioInput} + ${Ring} {
      fill: ${({ theme }) => theme.colors.primary.border};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.primary.backgroundHover};
      }
    }

    ${RadioInput}[aria-invalid='true'] + ${Ring} {
      fill: ${({ theme }) => theme.colors.danger.border};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.danger.backgroundHover};
      }
    }
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    & > label,
    ${RadioInput} {
      cursor: not-allowed;
    }

    ${Ring} {
      fill: ${({ theme }) => theme.colors.neutral.borderDisabled};
      cursor: not-allowed;

      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      }
    }
  }
`

const StyledLabel = styled.label`
  flex: 1;
  cursor: pointer;
`

const StyledTextLabel = styled(Text)`
  flex: 1;
  cursor: pointer;
`

const MargedText = styled(Text)`
  margin-left: ${({ theme }) => theme.space['4']};
`

type RadioProps = {
  error?: ReactNode
  checked?: boolean
  value: string | number
  helper?: ReactNode
  className?: string
  'data-testid'?: string
  tooltip?: string
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    | 'onFocus'
    | 'onBlur'
    | 'disabled'
    | 'autoFocus'
    | 'onKeyDown'
    | 'id'
    | 'name'
    | 'required'
    | 'tabIndex'
  > &
  (
    | {
        'aria-label': string
        label?: never
      }
    | {
        'aria-label'?: never
        label: ReactNode
      }
  )

/**
 * Radio component is used to select a single option from a list of options. It is a type of input component.
 */
export const Radio = forwardRef(
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
      label,
      helper,
      className,
      autoFocus,
      onKeyDown,
      tooltip,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      tabIndex,
    }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()
    const computedName = name ?? id

    return (
      <Tooltip text={tooltip}>
        <RadioStack gap={0.5}>
          <RadioContainer
            aria-disabled={disabled}
            className={className}
            data-checked={checked}
            data-error={error}
            data-testid={dataTestId}
          >
            <RadioInput
              type="radio"
              aria-invalid={!!error}
              aria-disabled={disabled}
              aria-label={ariaLabel}
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
              ref={ref}
              tabIndex={tabIndex}
            />
            <Ring viewBox="0 0 24 24">
              <RadioMarkedIcon />
            </Ring>
            {label ? (
              <>
                {typeof label === 'string' ? (
                  <StyledTextLabel
                    as="label"
                    variant="body"
                    prominence="default"
                    htmlFor={`${computedName}-${value}`}
                  >
                    &nbsp;{label}&nbsp;
                  </StyledTextLabel>
                ) : (
                  <StyledLabel htmlFor={`${computedName}-${value}`}>
                    {label}
                  </StyledLabel>
                )}
              </>
            ) : null}
          </RadioContainer>
          {helper ? (
            <MargedText
              as="span"
              variant="caption"
              prominence="weak"
              sentiment="neutral"
            >
              {helper}
            </MargedText>
          ) : null}
        </RadioStack>
      </Tooltip>
    )
  },
)
