'use client'

import { DeleteIcon, PlusIcon } from '@ultraviolet/icons'
import { useId } from 'react'
import { hasHelperText } from '../../helpers/hasHelperText'
import { Button } from '../Button'
import { Description } from '../Description'
import { Row } from '../Row'
import { SelectInput } from '../SelectInput'
import { Stack } from '../Stack'
import { TextInput } from '../TextInput'
import type { KeyValueInputProps } from './types'
import { keyValueInputStyle } from './styles.css'

/**
 * KeyValuenput allow user to add key-value pairs
 */
export const KeyValueInput = ({
  style,
  className,
  size = 'large',
  disabled,
  required,
  error,
  onChange,
  onFocus,
  onBlur,
  name,
  'aria-describedby': ariaDescribedBy,
  inputKey,
  inputValue,
  addButton,
  readOnly,
  keyvalues = [],
  maxSize = 100,
  fieldErrors,
}: KeyValueInputProps) => {
  const errorId = useId()

  const handleChange = (index: number, operationType: 'add' | 'change', key?: string, value?: string) => {
    const newKeyValues = [...keyvalues]
    newKeyValues[index] = { key: key ?? newKeyValues[index].key, value: value ?? newKeyValues[index].value }
    onChange?.(newKeyValues, index, operationType)
  }

  const canAdd = (keyvalues && keyvalues.length !== undefined && keyvalues.length < maxSize) || !keyvalues

  const editable = !(disabled || readOnly)

  const maxSizeReachedTooltip = addButton.maxSizeReachedTooltip ?? `Cannot add more than ${maxSize} elements`

  const commonProps = (index: number, type: 'key' | 'value', hasError: boolean) => {
    const input = type === 'key' ? inputKey : inputValue
    const inputError = fieldErrors?.[index]?.[type]

    return {
      label: input.label,
      readOnly: readOnly,
      disabled: disabled,
      required: input.required || required,
      size: size,
      'aria-describedby': hasError
        ? `error-${type}-${index}`
        : ariaDescribedBy || (hasHelperText(undefined, error) ? errorId : undefined),
      error: !!(inputError || error),
      name: `${name}.${index}.${type}`,
      onFocus: () => onFocus?.(keyvalues, index),
      onBlur: () => onBlur?.(keyvalues, index),
      value: keyvalues[index][type],
      placeholder: input.placeholder,
    }
  }

  return (
    <Stack gap={3} style={style} className={className}>
      {keyvalues && keyvalues?.length > 0 ? (
        <Stack gap={3}>
          {keyvalues.map((_, index) => {
            const errorKey = fieldErrors?.[index]?.key
            const errorValue = fieldErrors?.[index]?.value

            return (
              <Row alignItems="flex-end" gap={2} key={index} templateColumns="1fr 1fr auto">
                {inputKey.inputType === 'select' ? (
                  <SelectInput
                    options={inputKey.options}
                    onChange={(key: string) => handleChange(index, 'change', key)} // can't properly infer type of onChange
                    {...commonProps(index, 'key', !!errorKey)}
                  />
                ) : (
                  <TextInput
                    onChangeValue={key => handleChange(index, 'change', key)}
                    {...commonProps(index, 'key', !!errorKey)}
                  />
                )}
                {inputValue.inputType === 'select' ? (
                  <SelectInput
                    options={inputValue.options}
                    onChange={(value: string) => handleChange(index, 'change', undefined, value)}
                    {...commonProps(index, 'value', !!errorValue)}
                  />
                ) : (
                  <TextInput
                    autoComplete="off"
                    type={inputValue.type}
                    onChangeValue={value => handleChange(index, 'change', undefined, value)}
                    {...commonProps(index, 'value', !!errorValue)}
                  />
                )}

                <Button
                  data-testid={`remove-button-${index}`}
                  disabled={!editable}
                  onClick={() => {
                    const newKeyValues = keyvalues.filter((_, i) => index !== i)
                    onChange?.(newKeyValues, index, 'remove')
                  }}
                  sentiment="danger"
                  size={size}
                  variant="outlined"
                >
                  <DeleteIcon disabled={!editable} />
                </Button>
                {errorKey ? (
                  <Description
                    error={errorKey}
                    id={`error-key-${index}`}
                    className={keyValueInputStyle.errorDescription.key}
                  />
                ) : null}
                {errorValue ? (
                  <Description
                    error={errorValue}
                    id={`error-value-${index}`}
                    className={keyValueInputStyle.errorDescription.value}
                  />
                ) : null}
              </Row>
            )
          })}
        </Stack>
      ) : null}
      <Stack direction="row" justifyContent="flex-start">
        <Button
          data-testid="add-button"
          disabled={!(canAdd && editable)}
          fullWidth={addButton.fullWidth}
          onClick={() => {
            const index = keyvalues ? keyvalues.length : 0
            handleChange(index, 'add', '', '')
          }}
          sentiment="primary"
          tooltip={canAdd ? addButton.tooltip : maxSizeReachedTooltip}
          variant="outlined"
          size={size}
        >
          <PlusIcon disabled={!editable} />
          {addButton.name}
        </Button>
      </Stack>
      <Description error={error} id={ariaDescribedBy ?? errorId} />
    </Stack>
  )
}

KeyValueInput.displayName = 'KeyValueInput'
