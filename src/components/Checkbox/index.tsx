import styled from '@emotion/styled'
import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react'
import Loader from '../Loader'
import Text from '../Text'

const InnerCheckbox = styled.rect`
  fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  stroke: ${({ theme }) => theme.colors.neutral.textWeak};
`

const CheckMark = styled.rect``

const CheckboxIcon = () => (
  <g>
    <InnerCheckbox x="5" y="5" width="14" height="14" rx="1" strokeWidth="2" />
    <CheckMark x="8" y="8" rx="1" width="8" height="8" />
  </g>
)

const CheckboxMixedIcon = () => (
  <g>
    <InnerCheckbox x="5" y="5" width="14" height="14" rx="1" strokeWidth="2" />
    <rect x="8" y="11" rx="1" width="8" height="2" />
  </g>
)

const PaddedText = styled(Text)`
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

const StyledIcon = styled.svg<{ size: number }>`
  margin-right: ${({ theme }) => theme.space['1']};
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

  & + ${StyledIcon} {
    ${CheckMark} {
      transform-origin: center;
      transition: 200ms transform ease-in-out;
      transform: scale(0);
    }
  }

  &:checked + svg {
    ${CheckMark} {
      transform: scale(1);
    }
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

const StyledActivityContainer = styled('div', {
  shouldForwardProp: prop => !['hasChildren'].includes(prop),
})<{ hasChildren: boolean }>`
  display: inline;
  vertical-align: middle;
  margin-right: ${({ theme, hasChildren }) =>
    hasChildren ? theme.space[1] : 0};
`

type CheckboxProps = {
  children?: ReactNode
  error?: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
  ['data-visibility']?: string
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'onFocus' | 'onBlur' | 'name' | 'value' | 'autoFocus' | 'id'
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
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const hasChildren = !!children
    const [state, setState] = useState<boolean | 'indeterminate'>(checked)
    const id = useId()
    const computedName = name ?? id

    const icon = useMemo(() => {
      if (state === 'indeterminate') return 'minus-box-outline'
      if (state) return 'checkbox-marked-outline'

      return 'checkbox-blank-outline'
    }, [state])

    const onLocalChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (!progress) onChange(event)
        setState(event.target.checked)
      },
      [onChange, progress, setState],
    )

    const onKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key.charCodeAt(0) === 32) {
          event.preventDefault()
          setState(!state)
        }
      },
      [state],
    )

    return (
      <>
        {progress ? (
          <StyledActivityContainer hasChildren={hasChildren}>
            <Loader active size={size} />
          </StyledActivityContainer>
        ) : null}
        <CheckboxContainer
          className={className}
          aria-disabled={disabled}
          data-visibility={dataVisibility}
          data-checked={checked}
          data-error={!!error}
        >
          <CheckboxInput
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${computedName}-hint` : undefined}
            aria-checked={state === 'indeterminate' ? 'mixed' : undefined}
            checked={state === 'indeterminate' ? false : state}
            size={size}
            onChange={onLocalChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            disabled={disabled}
            value={value}
            name={computedName}
            autoFocus={autoFocus}
            ref={ref}
          />
          {!progress ? (
            <StyledIcon name={icon} size={size} viewBox="0 0 24 24">
              {state === 'indeterminate' ? (
                <CheckboxMixedIcon />
              ) : (
                <CheckboxIcon />
              )}
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
