'use client'

import { DeleteIcon, PlusIcon } from '@ultraviolet/icons'
import { Button, Row, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { Control, FieldArrayPath, FieldValues } from 'react-hook-form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { TextInputField } from '../TextInputField'

type InputKeyProps = {
  label: ComponentProps<typeof TextInputField>['label']
  required?: ComponentProps<typeof TextInputField>['required']
  regex?: ComponentProps<typeof TextInputField>['regex']
}

type InputValueProps = {
  type?: ComponentProps<typeof TextInputField>['type']
  placeholder?: ComponentProps<typeof TextInputField>['placeholder']
} & InputKeyProps

type AddButtonProps = {
  name: ComponentProps<typeof Button>['children']
  fullWidth?: ComponentProps<typeof Button>['fullWidth']
  tooltip?: string
  maxSizeReachedTooltip?: string
}

type KeyValuePair = {
  key: string
  value: string
}

type KeyValueFieldProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
> = {
  name: TFieldArrayName
  inputKey: InputKeyProps
  inputValue: InputValueProps
  addButton: AddButtonProps
  maxSize?: number
  readOnly?: boolean
  control?: Control<TFieldValues>
  onChange?: (values: KeyValuePair[]) => void
  onBlur?: (values: KeyValuePair[]) => void
}

/**
 * A React component that allows users to manage key-value pairs
 */
export const KeyValueField = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
  name,
  inputKey,
  inputValue,
  addButton,
  maxSize = 100,
  readOnly = false,
  control,
  onChange,
  onBlur,
}: KeyValueFieldProps<TFieldValues, TFieldArrayName>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  const { getValues } = useFormContext()

  const handleFieldChange = () => {
    onChange?.(getValues(name))
  }

  const handleFieldBlur = () => {
    onBlur?.(getValues(name))
  }

  const canAdd = fields.length !== undefined && fields.length < maxSize
  const maxSizeReachedTooltip =
    addButton.maxSizeReachedTooltip ??
    `Cannot add more than ${maxSize} elements`

  return (
    <Stack gap={3}>
      {fields.length > 0 ? (
        <Stack gap={3}>
          {fields.map((field, index) => (
            <Row
              alignItems="flex-end"
              gap={2}
              key={field.id}
              templateColumns="1fr 1fr auto"
            >
              <TextInputField
                label={inputKey.label}
                name={`${name}.${index}.key`}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                readOnly={readOnly}
                regex={inputKey.regex}
                required={inputKey.required}
              />
              <TextInputField
                autoComplete="off"
                label={inputValue.label}
                name={`${name}.${index}.value`}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                placeholder={inputValue.placeholder}
                readOnly={readOnly}
                regex={inputValue.regex}
                required={inputValue.required}
                type={inputValue.type}
              />

              <Button
                data-testid={`remove-button-${index}`}
                disabled={readOnly}
                onClick={() => {
                  remove(index)
                  handleFieldChange()
                }}
                sentiment="danger"
                size="large"
                variant="outlined"
              >
                <DeleteIcon />
              </Button>
            </Row>
          ))}
        </Stack>
      ) : null}
      <Stack direction="row" justifyContent="flex-start">
        <Button
          data-testid="add-button"
          disabled={!canAdd || readOnly}
          fullWidth={addButton.fullWidth}
          onClick={() => {
            // @ts-expect-error can't infer properly
            append({ key: '', value: '' })
            handleFieldChange()
          }}
          sentiment="primary"
          tooltip={!canAdd ? maxSizeReachedTooltip : addButton.tooltip}
          variant="outlined"
        >
          <PlusIcon />
          {addButton.name}
        </Button>
      </Stack>
    </Stack>
  )
}
