import styled from '@emotion/styled'
import type {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react'
import { forwardRef, useCallback, useEffect, useId, useState } from 'react'
import type { XOR } from '../../types'
import Loader from '../Loader'
import Text from '../Text'

const InnerCheckbox = styled.rect`
  fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  stroke: ${({ theme }) => theme.colors.neutral.textWeak};
`

const CheckMark = styled.rect``
const CheckMixedMark = styled.rect``

const CheckboxIconContainer = ({ children }: { children: ReactNode }) => (
  <g>
    <InnerCheckbox x="5" y="5" width="14" height="14" rx="1" strokeWidth="2" />
    {children}
  </g>
)

const PaddedText = styled(Text)`
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

const StyledIcon = styled('svg')<{ size: number }>`
  border-radius: ${({ theme }) => theme.radii.default};
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
`

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

  &:checked + ${StyledIcon}, &[aria-checked='mixed'] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.primary.backgroundStrong};
    }
  }

  &[aria-invalid='true']
    + ${StyledIcon},
    &[aria-invalid='mixed']
    + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.danger.backgroundStrong};
    }
  }

  &:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.primary.backgroundStrong};
      fill: ${({ theme }) => theme.colors.primary.background};
    }
  }

  &[aria-invalid='true']:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.danger.backgroundStrong};
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }
`

const CheckboxContainer = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};

  &[aria-disabled='false'] {
    cursor: pointer;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.textDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.neutral.textDisabled};
        fill: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      }
    }
  }

  ${CheckMark}, ${CheckMixedMark} {
    transform-origin: center;
    transition: 200ms transform ease-in-out;
    transform: scale(0);
  }

  ${CheckboxInput}:checked + ${StyledIcon} ${CheckMark} {
    transform: scale(1);
  }

  ${CheckboxInput}[aria-checked="mixed"] + ${StyledIcon} ${CheckMixedMark} {
    transform: scale(1);
  }

  &:hover[aria-disabled='false'] {
    ${CheckboxInput} + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.backgroundStrong};
        fill: ${({ theme }) => theme.colors.primary.background};
      }
    }

    ${CheckboxInput}[aria-invalid="true"] + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.danger.background};
      fill: ${({ theme }) => theme.colors.danger.backgroundStrong};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.backgroundStrong};
        fill: ${({ theme }) => theme.colors.danger.background};
      }
    }
  }
`

const StyledActivityContainer = styled.div`
  display: flex;
`

type CheckboxProps = {
  error?: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
  ['data-visibility']?: string
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

const Checkbox = forwardRef(
  (
    {
      checked = false,
      onChange,
      onFocus,
      onBlur,
      error,
      name,
      value,
      size = 24,
      children,
      progress = false,
      disabled = false,
      autoFocus = false,
      className,
      'data-visibility': dataVisibility,
      'aria-label': ariaLabel,
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
      <>
        <CheckboxContainer
          className={className}
          aria-disabled={disabled}
          data-visibility={dataVisibility}
          data-checked={state}
          data-error={!!error}
        >
          {progress ? (
            <StyledActivityContainer>
              <Loader active size={size} />
            </StyledActivityContainer>
          ) : null}
          <CheckboxInput
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${computedName}-hint` : undefined}
            aria-checked={state === 'indeterminate' ? 'mixed' : undefined}
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
          />
          {!progress ? (
            <StyledIcon size={size} viewBox="0 0 24 24">
              <CheckboxIconContainer>
                <CheckMixedMark x="8" y="11" rx="1" width="8" height="2" />
                <CheckMark x="8" y="8" rx="1" width="8" height="8" />
              </CheckboxIconContainer>
            </StyledIcon>
          ) : null}
          {children}
        </CheckboxContainer>
        {error ? (
          <PaddedText variant="bodySmall" as="p" color="danger">
            {error}
          </PaddedText>
        ) : null}
      </>
    )
  },
)

export default Checkbox
