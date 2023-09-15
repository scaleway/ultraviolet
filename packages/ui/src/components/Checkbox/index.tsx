import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react'
import { forwardRef, useCallback, useEffect, useId, useState } from 'react'
import type { XOR } from '../../types'
import { Loader } from '../Loader'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const ErrorText = styled(Text)`
  padding-top: ${({ theme }) => `${theme.space['0.5']}`};
`
const InnerCheckbox = styled.rect`
  fill: ${({ theme }) => theme.colors.neutral.background};
  stroke: ${({ theme }) => theme.colors.neutral.border};
`

const CheckMixedMark = styled.rect``

const CheckboxIconContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()

  return (
    <g>
      <InnerCheckbox
        x="2"
        y="2"
        width="20"
        height="20"
        rx={theme.radii.small}
        strokeWidth="2"
      />
      {children}
    </g>
  )
}

const StyledIcon = styled('svg')<{ size: number }>`
  border-radius: ${({ theme }) => theme.radii.default};
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;

  & path {
    fill: ${({ theme }) => theme.colors.neutral.background};
    transform: translate(2px, 2px);
    transform: scale(0);
  }
`
const StyledLabel = styled('label')``

const CheckboxInput = styled('input', {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  position: absolute;
  white-space: nowrap;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  opacity: 0;
  border-width: 0;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &:checked + ${StyledIcon}, &[aria-checked='mixed'] + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrong};
      }
    }

    &[aria-invalid='true']
      + ${StyledIcon},
      &[aria-invalid='mixed']
      + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.danger.background};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.border};
      }
    }
  }

  &:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.danger.background};
    outline: 2px solid ${({ theme }) => theme.colors.primary.backgroundHover};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.primary.borderHover};
      fill: ${({ theme }) => theme.colors.primary.backgroundHover};
    }
  }

  &[aria-invalid='true']:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.background};
    outline: 2px solid ${({ theme }) => theme.colors.danger.backgroundHover};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.danger.borderHover};
      fill: ${({ theme }) => theme.colors.danger.backgroundHover};
    }
  }
`

const CheckboxContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: start;
  gap: ${({ theme }) => theme.space['1']};

  ${StyledLabel} {
    cursor: pointer;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;

    ${StyledLabel} {
      cursor: not-allowed;
    }

    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.borderDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.neutral.borderStrongDisabled};
        fill: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      }
    }

    ${CheckboxInput}[aria-invalid="true"]:checked + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.danger.backgroundStrongDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderStrongDisabled};
        fill: ${({ theme }) => theme.colors.danger.backgroundStrongDisabled};
      }
    }

    ${CheckboxInput}[aria-invalid="true"] + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.danger.background};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderDisabled};
        fill: ${({ theme }) => theme.colors.danger.background};
      }
    }

    ${CheckboxInput}:checked + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderDisabled};
        fill: ${({ theme }) => theme.colors.primary.borderDisabled};
      }
    }

    ${CheckboxInput}[aria-checked="mixed"] + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrongDisabled};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};
      }
    }
  }

  ${CheckboxInput}:checked + ${StyledIcon} path {
    transform-origin: center;
    transition: 200ms transform ease-in-out;
    transform: scale(1);
    transform: translate(2px, 2px);
  }

  ${CheckboxInput}:checked + ${StyledIcon} ${InnerCheckbox} {
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
    stroke: ${({ theme }) => theme.colors.primary.borderStrong};
  }

  ${CheckboxInput}[aria-invalid="true"]:checked + ${StyledIcon} ${InnerCheckbox} {
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};
    stroke: ${({ theme }) => theme.colors.danger.borderStrong};
  }

  ${CheckboxInput}[aria-checked="mixed"] + ${StyledIcon} {
    ${CheckMixedMark} {
      fill: ${({ theme }) => theme.colors.neutral.iconStronger};
    }

    ${InnerCheckbox} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
      stroke: ${({ theme }) => theme.colors.primary.borderStrong};
    }
  }

  &:hover[aria-disabled='false'] {
    ${CheckboxInput}[aria-invalid='false'] {
      &[aria-checked='false'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderHover};
        fill: ${({ theme }) => theme.colors.primary.backgroundHover};
      }

      &[aria-checked='true'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrongHover};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
      }

      &[aria-checked='mixed'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrongHover};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
      }
    }

    ${CheckboxInput}[aria-invalid='true'] {
      &[aria-checked='false'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderHover};
        fill: ${({ theme }) => theme.colors.danger.backgroundHover};
      }

      &[aria-checked='true'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderStrongHover};
        fill: ${({ theme }) => theme.colors.danger.backgroundStrongHover};
      }
    }
  }

  ${CheckboxInput}[aria-invalid="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.danger.backgroundStrong};
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }
`

const StyledActivityContainer = styled.div`
  display: flex;
`

type CheckboxProps = {
  error?: string | ReactNode
  /**
   * @deprecated Size prop is deprecated and will be removed in next major update.
   */
  size?: number
  /**
   * @deprecated Progress prop is deprecated and will be removed in next major update.
   */
  progress?: boolean
  helper?: ReactNode
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
  ['data-visibility']?: string
  required?: boolean
  'data-testid'?: string
  tooltip?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'onFocus' | 'onBlur' | 'name' | 'value' | 'autoFocus' | 'id' | 'onChange'
> &
  XOR<
    [
      {
        /**
         * **`children` or `aria-label` property is required**
         */
        'aria-label': string
      },
      {
        children: ReactNode
      },
    ]
  >

/**
 * Checkbox is an input component used to select or deselect an option.
 */
export const Checkbox = forwardRef(
  (
    {
      checked = false,
      onChange,
      onFocus,
      onBlur,
      error,
      name,
      helper,
      value,
      size = 24,
      children,
      progress = false,
      disabled = false,
      autoFocus = false,
      className,
      'data-visibility': dataVisibility,
      'aria-label': ariaLabel,
      required,
      'data-testid': dataTestId,
      tooltip,
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [state, setState] = useState<boolean | 'indeterminate'>(checked)
    const id = useId()
    const computedName = name ?? id

    useEffect(() => {
      setState(checked)
    }, [checked])

    const onLocalChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (!progress) onChange?.(event)
        setState(current =>
          current === 'indeterminate' ? false : event.target.checked,
        )
      },
      [onChange, progress, setState],
    )

    const onKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key.charCodeAt(0) === 32) {
        event.preventDefault()
        setState(current => !current)
      }
    }, [])

    return (
      <Tooltip text={tooltip}>
        <CheckboxContainer
          className={className}
          aria-disabled={disabled}
          data-visibility={dataVisibility}
          data-checked={state}
          data-error={!!error}
          data-testid={dataTestId}
        >
          {progress ? (
            <StyledActivityContainer>
              <Loader active size={size} />
            </StyledActivityContainer>
          ) : null}
          <CheckboxInput
            id={computedName}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${computedName}-hint` : undefined}
            aria-checked={state === 'indeterminate' ? 'mixed' : state}
            aria-label={ariaLabel}
            checked={state === 'indeterminate' ? false : state}
            size={size}
            onChange={onLocalChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            value={value}
            name={computedName}
            autoFocus={autoFocus}
            ref={ref}
            required={required}
          />

          {!progress ? (
            <StyledIcon size={size} viewBox="0 0 24 24">
              <CheckboxIconContainer>
                {state !== 'indeterminate' ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    width={14}
                    height={14}
                    d="M15.6678 5.26709C16.0849 5.6463 16.113 6.28907 15.7307 6.70276L9.29172 13.6705C9.10291 13.8748 8.83818 13.9937 8.55884 13.9998C8.2795 14.0058 8.0098 13.8984 7.81223 13.7024L4.30004 10.2185C3.89999 9.82169 3.89999 9.17831 4.30004 8.78149C4.70009 8.38467 5.34869 8.38467 5.74874 8.78149L8.50441 11.5149L14.2205 5.32951C14.6028 4.91583 15.2508 4.88788 15.6678 5.26709Z"
                    fill="white"
                  />
                ) : (
                  <CheckMixedMark x="6" y="11" rx="1" width="12" height="2" />
                )}
              </CheckboxIconContainer>
            </StyledIcon>
          ) : null}

          <Stack gap={0.25}>
            <Row templateColumns="11fr 1fr" alignItems="center">
              {children ? (
                <StyledLabel htmlFor={computedName}>{children}</StyledLabel>
              ) : null}
              {required ? (
                <sup>
                  <Icon name="asterisk" size={10} color="danger" />
                </sup>
              ) : null}
            </Row>

            {helper ? (
              <Text
                variant="bodySmall"
                as="p"
                prominence="weak"
                color="neutral"
              >
                {helper}
              </Text>
            ) : null}

            {error ? (
              <ErrorText variant="bodySmall" as="p" color="danger">
                {error}
              </ErrorText>
            ) : null}
          </Stack>
        </CheckboxContainer>
      </Tooltip>
    )
  },
)
