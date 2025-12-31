import { Checkbox } from '../Checkbox'
import { Radio } from '../Radio'
import { Toggle } from '../Toggle'
import { selectableElementSelectableCard } from './styles.css'
import type { MultiStateProps } from './types'

export const MultiStateInput = ({
  checked,
  disabled,
  id,
  label,
  'aria-label': ariaLabel,
  innerRef,
  isError,
  name,
  onBlur,
  onChange,
  onFocus,
  type,
  value,
}: MultiStateProps) => {
  if (!type) {
    return null
  }

  if (type === 'checkbox') {
    const labelProps = label
      ? { 'aria-label': undefined, children: label }
      : { 'aria-label': ariaLabel! }

    return (
      <Checkbox
        checked={checked}
        className={selectableElementSelectableCard}
        data-error={isError}
        disabled={disabled}
        error={isError}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={innerRef}
        tabIndex={-1}
        value={value}
        {...labelProps}
      />
    )
  }

  if (type === 'radio') {
    const labelProps = label ? { label } : { 'aria-label': ariaLabel! }

    return (
      <Radio
        checked={checked}
        className={selectableElementSelectableCard}
        data-error={isError}
        disabled={disabled}
        error={isError}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={innerRef}
        tabIndex={-1}
        value={value}
        {...labelProps}
      />
    )
  }
  if (type === 'toggle') {
    const labelProps = label ? { label } : { 'aria-label': ariaLabel! }

    return (
      <Toggle
        checked={checked}
        className={selectableElementSelectableCard}
        data-error={isError}
        disabled={disabled}
        error={isError}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={innerRef}
        tabIndex={-1}
        value={value}
        {...labelProps}
      />
    )
  }

  return null
}
