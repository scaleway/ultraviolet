'use client'

import { DeleteIcon, PlusIcon } from '@ultraviolet/icons'
import { Button } from '../Button'
import { Row } from '../Row'
import { SelectInput } from '../SelectInput'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { TextInput } from '../TextInput'
import { KeyValueInputProps } from './types'

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
  'data-testid': dataTestid,
  'aria-describedby': ariaDescribedBy,
  inputKey,
  inputValue,
  addButton,
  readOnly,
  keyvalues = [],
  maxSize = 100,
}: KeyValueInputProps) => {
  const handleChange = (index: number, key?: string, value?: string) => {
    const newKeyValues = [...keyvalues]
    newKeyValues[index] = { key: key ?? newKeyValues[index].key, value: value ?? newKeyValues[index].value }
    onChange?.(newKeyValues)
  }

  const canAdd = (keyvalues && keyvalues.length !== undefined && keyvalues.length < maxSize) || !keyvalues

  const editable = !(disabled || readOnly)

  const maxSizeReachedTooltip = addButton.maxSizeReachedTooltip ?? `Cannot add more than ${maxSize} elements`

  return (
    <Stack gap={3} style={style} className={className} data-testid={dataTestid}>
      {keyvalues && keyvalues?.length > 0 ? (
        <Stack gap={3}>
          {keyvalues.map((_, index) => (
            <Row alignItems="flex-end" gap={2} key={index} templateColumns="1fr 1fr auto">
              {inputKey.inputType === 'select' ? (
                <SelectInput
                  options={inputKey.options}
                  label={inputKey.label}
                  name={`${name}.${index}.key`}
                  readOnly={readOnly}
                  required={inputKey.required || required}
                  size={size}
                  onChange={(key: string) => handleChange(index, key)} // can't properly infer type of onChange
                  disabled={disabled}
                  data-testid={`${dataTestid}-${index}.key`}
                  aria-describedby={ariaDescribedBy}
                  onFocus={() => onFocus?.(keyvalues)}
                  onBlur={() => onBlur?.(keyvalues)}
                  value={keyvalues[index].key}
                />
              ) : (
                <TextInput
                  label={inputKey.label}
                  name={`${name}.${index}.key`}
                  readOnly={readOnly}
                  required={inputKey.required || required}
                  size={size}
                  onChangeValue={key => handleChange(index, key)}
                  disabled={disabled}
                  data-testid={`${dataTestid}-${index}.key`}
                  aria-describedby={ariaDescribedBy}
                  onFocus={() => onFocus?.(keyvalues)}
                  onBlur={() => onBlur?.(keyvalues)}
                  value={keyvalues[index].key}
                />
              )}
              {inputValue.inputType === 'select' ? (
                <SelectInput
                  options={inputValue.options}
                  label={inputValue.label}
                  name={`${name}.${index}.value`}
                  placeholder={inputValue.placeholder}
                  readOnly={readOnly}
                  required={inputValue.required || required}
                  size={size}
                  onChange={(value: string) => handleChange(index, undefined, value)}
                  disabled={disabled}
                  data-testid={`${dataTestid}-${index}.value`}
                  aria-describedby={ariaDescribedBy}
                  onBlur={() => onBlur?.(keyvalues)}
                  onFocus={() => onFocus?.(keyvalues)}
                  value={keyvalues[index].value}
                />
              ) : (
                <TextInput
                  autoComplete="off"
                  label={inputValue.label}
                  name={`${name}.${index}.value`}
                  placeholder={inputValue.placeholder}
                  readOnly={readOnly}
                  required={inputValue.required || required}
                  type={inputValue.type}
                  size={size}
                  onChangeValue={value => handleChange(index, undefined, value)}
                  disabled={disabled}
                  data-testid={`${dataTestid}-${index}.value`}
                  aria-describedby={ariaDescribedBy}
                  onBlur={() => onBlur?.(keyvalues)}
                  onFocus={() => onFocus?.(keyvalues)}
                  value={keyvalues[index].value}
                />
              )}

              <Button
                data-testid={`remove-button-${index}`}
                disabled={!editable}
                onClick={() => {
                  const newKeyValues = keyvalues.filter((_, i) => index !== i)
                  onChange?.(newKeyValues)
                }}
                sentiment="danger"
                size={size}
                variant="outlined"
              >
                <DeleteIcon disabled={!editable} />
              </Button>
            </Row>
          ))}
        </Stack>
      ) : null}
      <Stack direction="row" justifyContent="flex-start">
        <Button
          data-testid="add-button"
          disabled={!(canAdd && editable)}
          fullWidth={addButton.fullWidth}
          onClick={() => {
            const index = keyvalues ? keyvalues.length : 0
            handleChange(index, '', '')
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
      {typeof error === 'string' ? (
        <Text as="p" variant="bodySmall" sentiment="danger">
          {error}
        </Text>
      ) : null}
    </Stack>
  )
}

KeyValueInput.displayName = 'KeyValueInput'
