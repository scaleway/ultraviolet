import styled from '@emotion/styled'
import {
  ChangeEvent,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitCheckboxProps,
  useCheckboxState,
} from 'reakit/Checkbox'
import { getUUID } from '../../utils'
import Icon from '../Icon'
import Loader from '../Loader'
import Typography from '../Typography'

const StyledError = styled(Typography)`
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

const StyledIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.neutral.text};
`

const StyledReakitCheckbox = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})`
  opacity: 0.01;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  cursor: pointer;
`

const StyledCheckBoxContainer = styled(Typography)`
  position: relative;
  display: inline-flex;
  align-items: center;

  &[aria-disabled='false'] {
    cursor: pointer;
  }

  ${StyledReakitCheckbox}[aria-checked="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledReakitCheckbox}[aria-invalid="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.textDisabled};
    }
  }

  ${StyledReakitCheckbox}:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledReakitCheckbox}[aria-invalid="true"]:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  :hover[aria-disabled='false'] {
    ${StyledReakitCheckbox} + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.text};
    }

    ${StyledReakitCheckbox}[aria-invalid="true"] + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.danger.background};
      fill: ${({ theme }) => theme.colors.danger.text};
    }
  }
`

const StyledActivityContainer = styled('div', {
  shouldForwardProp: prop => !['hasChildren'].includes(prop.toString()),
})<{ hasChildren: boolean }>`
  display: inline;
  vertical-align: middle;
  margin-right: ${({ theme, hasChildren }) =>
    hasChildren ? theme.space[1] : 0};
`

type CheckboxProps = Omit<ReakitCheckboxProps, 'checked'> & {
  children?: ReactNode
  error?: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
} & Required<Pick<ReakitCheckboxProps, 'onChange'>>

const Checkbox = ({
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
}: CheckboxProps) => {
  const hasChildren = !!children
  const checkbox = useCheckboxState({ state: checked })

  const computedName = useMemo(() => {
    if (!name) return getUUID('checkbox')

    return name
  }, [name])

  const icon = useMemo(() => {
    if (checkbox.state === 'indeterminate') return 'minus-box-outline'
    if (checkbox.state) return 'checkbox-marked-outline'

    return 'checkbox-blank-outline'
  }, [checkbox?.state])

  const { setState } = checkbox
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
        as="label"
        className={className}
        aria-disabled={disabled}
      >
        <StyledReakitCheckbox
          aria-invalid={!!error}
          aria-describedby={error ? `${computedName}-hint` : undefined}
          aria-checked={
            checkbox.state === 'indeterminate'
              ? 'mixed'
              : (checkbox.state as boolean)
          }
          checked={
            checkbox.state === 'indeterminate'
              ? false
              : (checkbox.state as boolean)
          }
          size={size}
          onChange={onLocalChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          value={value}
          name={computedName}
          autoFocus={autoFocus}
        />
        {!progress ? (
          <StyledIcon name={icon} size={size} disabled={disabled} />
        ) : null}
        {children}
      </StyledCheckBoxContainer>
      {error ? (
        <StyledError id={`${computedName}-id`} variant="bodyB" color="danger">
          {error}
        </StyledError>
      ) : null}
    </>
  )
}

export default Checkbox
