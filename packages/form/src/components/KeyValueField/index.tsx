import { Button, Row, Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFieldArray } from 'react-hook-form'
import type { Control, FieldArrayPath, FieldValues } from 'react-hook-form'
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
  tooltip: string
  maxSizeReachedTooltip: string
}

export type KeyValue = { key: string; value: string }

type KeyValueFieldProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>,
> = {
  name: TFieldArrayName
  inputKey: InputKeyProps
  inputValue: InputValueProps
  addButton: AddButtonProps
  maxSize?: number
  readonly?: boolean
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
  readonly = false,
  control,
}: KeyValueFieldProps<TFieldValues, TFieldArrayName>) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  const canAdd = fields.length !== undefined && fields.length < maxSize

  return (
    <Stack gap={3}>
      {fields.length ? (
        <Stack gap={2}>
          {fields.map((field, index) => (
            <Row key={field.id} templateColumns="1fr 1fr auto" gap={2}>
              <TextInputField
                readOnly={readonly}
                required={inputKey.required}
                name={`${name}.${index}.key`}
                label={inputKey.label}
                regex={inputKey.regex}
              />
              <TextInputField
                readOnly={readonly}
                required={inputValue.required}
                name={`${name}.${index}.value`}
                label={inputValue.label}
                placeholder={inputValue.placeholder}
                type={inputValue.type}
                autoComplete="off"
                regex={inputValue.regex}
              />

              <Button
                disabled={readonly}
                data-testid={`remove-button-${index}`}
                icon="delete"
                variant="outlined"
                sentiment="danger"
                size="large"
                onClick={() => remove(index)}
              />
            </Row>
          ))}
        </Stack>
      ) : null}
      <Stack direction="row" justifyContent="flex-start">
        <Button
          data-testid="add-button"
          icon="plus"
          variant="filled"
          sentiment="neutral"
          fullWidth={addButton.fullWidth}
          disabled={!canAdd || readonly}
          tooltip={
            !canAdd ? addButton.maxSizeReachedTooltip : addButton.tooltip
          }
          // @ts-expect-error can't infer properly
          onClick={() => append({ key: '', value: '' })}
        >
          {addButton.name}
        </Button>
      </Stack>
    </Stack>
  )
}
