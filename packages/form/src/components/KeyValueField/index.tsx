'use client'

import { DeleteIcon, PlusIcon } from '@ultraviolet/icons'
import { Button, Row, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { Control, FieldArrayPath, FieldValues } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
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
}: KeyValueFieldProps<TFieldValues, TFieldArrayName>) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

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
              key={field.id}
              templateColumns="1fr 1fr auto"
              gap={2}
              alignItems="end"
            >
              <TextInputField
                readOnly={readOnly}
                required={inputKey.required}
                name={`${name}.${index}.key`}
                label={inputKey.label}
                regex={inputKey.regex}
              />
              <TextInputField
                readOnly={readOnly}
                required={inputValue.required}
                name={`${name}.${index}.value`}
                label={inputValue.label}
                placeholder={inputValue.placeholder}
                type={inputValue.type}
                autoComplete="off"
                regex={inputValue.regex}
              />

              <Button
                disabled={readOnly}
                data-testid={`remove-button-${index}`}
                variant="outlined"
                sentiment="danger"
                size="large"
                onClick={() => remove(index)}
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
          variant="outlined"
          sentiment="primary"
          fullWidth={addButton.fullWidth}
          disabled={!canAdd || readOnly}
          tooltip={!canAdd ? maxSizeReachedTooltip : addButton.tooltip}
          // @ts-expect-error can't infer properly
          onClick={() => append({ key: '', value: '' })}
        >
          <PlusIcon />
          {addButton.name}
        </Button>
      </Stack>
    </Stack>
  )
}
