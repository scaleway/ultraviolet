import styled from '@emotion/styled'
import {
  ChangeEvent,
  ForwardedRef,
  KeyboardEventHandler,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
} from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitCheckboxProps,
  useCheckboxState,
} from 'reakit/Checkbox'
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

const StyledReakitCheckbox = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['size'].includes(prop),
})`
  opacity: 0.01;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  cursor: pointer;
  & + ${StyledIcon} {
    ${CheckMark} {
      transform-origin: center;
      transition: 200ms transform ease-in-out;
      transform: scale(0);
    }
  }

  &[aria-checked='true'] + svg {
    ${CheckMark} {
      transform: scale(1);
    }
  }

  &[aria-checked='true']
    + ${StyledIcon},
    &[aria-checked='mixed']
    + ${StyledIcon} {
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

const StyledCheckBoxContainer = styled.label`
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
    ${StyledReakitCheckbox} + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.backgroundStrong};
        fill: ${({ theme }) => theme.colors.primary.background};
      }
    }

    ${StyledReakitCheckbox}[aria-invalid="true"] + ${StyledIcon} {
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

type CheckboxProps = Pick<
  ReakitCheckboxProps,
  'name' | 'onFocus' | 'onBlur' | 'value' | 'autoFocus'
> & {
  children?: ReactNode
  error?: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
  ['data-visibility']?: string
} & Required<Pick<ReakitCheckboxProps, 'onChange'>>

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
    const { state, setState } = useCheckboxState({ state: checked })
    const id = useId()
    const computedName = name ?? id

    const icon = useMemo(() => {
      if (state === 'indeterminate') return 'minus-box-outline'
      if (state) return 'checkbox-marked-outline'

      return 'checkbox-blank-outline'
    }, [state])

    useEffect(() => {
      setState(checked)
    }, [checked, setState])

    const onLocalChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (!progress) onChange(event)
        setState(event.target.checked)
      },
      [onChange, progress, setState],
    )

    const onKeyDown: KeyboardEventHandler = useCallback(
      event => {
        if (event.key.charCodeAt(0) === 32) {
          onChange(event)
        }
      },
      [onChange],
    )

    return (
      <>
        {progress ? (
          <StyledActivityContainer hasChildren={hasChildren}>
            <Loader active size={size} />
          </StyledActivityContainer>
        ) : null}
        <StyledCheckBoxContainer
          className={className}
          aria-disabled={disabled}
          data-visibility={dataVisibility}
          data-checked={checked}
          data-error={!!error}
        >
          <StyledReakitCheckbox
            aria-invalid={!!error}
            aria-describedby={error ? `${computedName}-hint` : undefined}
            aria-checked={
              state === 'indeterminate' ? 'mixed' : (state as boolean)
            }
            checked={state === 'indeterminate' ? false : (state as boolean)}
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
        </StyledCheckBoxContainer>
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
