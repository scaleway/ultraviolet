import styled from '@emotion/styled'
import {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  useMemo,
  useRef,
} from 'react'
import Checkbox from '../Checkbox'
import Radio from '../Radio'
import Tooltip from '../Tooltip'

const Container = styled.div<{
  disabled?: boolean
  checked?: boolean
  error?: boolean
}>`
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  transition: border-color 200ms ease, box-shadow 200ms ease;
  cursor: pointer;

  ${({ theme, checked, disabled, error }) => {
    if (error)
      return `
      border: 1px solid ${theme.colors.danger.border};
      color: ${theme.colors.danger.text};
    `

    if (checked)
      return `
      border: 1px solid ${theme.colors.primary.borderWeak};
      color: ${theme.colors.primary.textWeak};
    `

    if (disabled)
      return `
      border: 1px solid ${theme.colors.neutral.borderWeakDisabled};
      color: ${theme.colors.neutral.textDisabled};
      background: ${theme.colors.neutral.backgroundDisabled};
    `

    return `
      border: 1px solid ${theme.colors.neutral.borderWeak};
      color: ${theme.colors.neutral.text};
    `
  }}
  &:hover,
  &:focus-within,
  &:active {
    ${({ theme, disabled, error, checked }) => {
      if (error || disabled) return ``

      return `
        border: 1px solid ${theme.colors.primary.borderWeak};
        box-shadow: ${checked ? 'none' : theme.shadows.hoverPrimary};
      `
    }}
  }
`

const StyledElement = (element: typeof Radio) => styled(element, {
  shouldForwardProp: prop => !['showTick', 'hasLabel'].includes(prop),
})<{ showTick?: boolean; hasLabel?: boolean }>`
  display: inline-flex;
  align-items: start;

  input + svg {
    ${({ showTick }) => (!showTick ? `display: none;` : null)}
  }

  label {
    ${({ showTick, hasLabel }) =>
      !showTick && !hasLabel ? `display: none;` : null}
  }
`

type SelectableCardProps = {
  name?: string
  children?:
    | (({
        disabled,
        checked,
      }: Pick<SelectableCardProps, 'checked' | 'disabled'>) => ReactNode)
    | ReactNode
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  showTick?: boolean
  type?: 'radio' | 'checkbox'
  disabled?: boolean
  checked?: boolean
  className?: string
  isError?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  id?: string
  tooltip?: string
  label?: ReactNode
}

const SelectableCard = ({
  name,
  value,
  onChange,
  showTick = false,
  type = 'radio',
  checked = false,
  disabled = false,
  children,
  className,
  isError,
  onFocus,
  onBlur,
  tooltip,
  id,
  label,
}: SelectableCardProps) => {
  const Element = useMemo(
    () => StyledElement((type === 'radio' ? Radio : Checkbox) as typeof Radio),
    [type],
  )

  const ref = useRef<HTMLInputElement>({} as HTMLInputElement)

  return (
    <Tooltip text={tooltip}>
      <Container
        disabled={disabled}
        error={isError}
        checked={checked}
        onClick={() => {
          ref.current.click()
        }}
        className={className}
      >
        <Element
          name={name}
          value={value}
          onChange={onChange}
          showTick={showTick}
          checked={checked}
          disabled={disabled}
          error={isError}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          hasLabel={!!label}
          id={id}
        >
          {label}
        </Element>
        {typeof children === 'function'
          ? children({ checked, disabled })
          : children}
      </Container>
    </Tooltip>
  )
}

export default SelectableCard
